import razorpayClient from "../config/razorpay.config.js";
import Order from "../../../UserModel/order.model.js";
import Cart from "../../../UserModel/cart.model.js";
import Customer from "../../../UserModel/customer.model.js";
import Item from "../../../UserModel/items.model.js";
import orderQueue from "../utils/orderQueue.js";
import { runTransaction } from "../../../config/db.js";
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
dotenv.config({ path: '../../../.env' });
import crypto from "crypto";
import { publisher } from "../../../config/redisPubSub.js";
import Transaction from "../../../UserModel/transaction.model.js";

import mongoose from "mongoose";

//get all order
export const getAllOrders = async (req, res) => {
    try {
        const customerId = req.user.id;
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const orders = await Order.find({ user: customerId });
        if (orders === undefined) {
            return res.status(404).json({ message: "No orders found" });
        }
        if (orders.length === 0) {
            return res.status(200).json({ message: "Your have zero orders" });
        }
        return res.status(200).json({
            message: "Order retrieved successfully",
            orders
        })
    } catch (error) {
        console.error("Error in getAllOrders:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
}

export const placeOrder = async (req, res) => {
    try {
        const { cartId } = req.params;
        const userId = req.user.id;

        const result = await runTransaction(async (session) => {

            const cart = await Cart.findById(cartId)
                .populate({
                    path: "items.itemId",
                    select: "name price stock"
                })
                .session(session);
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            const outOfStockItem = cart.items.filter(
                item => item.itemId.stock < item.quantity
            );
            console.log(outOfStockItem);
            if (outOfStockItem.length > 0) {
                return res.status(400).json({ message: "some items are out of stock" })
            }

            const totalPrice = cart.items.reduce((sum, item) =>
                sum + (item.itemId.price * item.quantity), 0
            );

            const razorpayOrder = await razorpayClient.orders.create({
                amount: totalPrice * 100,
                currency: "INR",
                receipt: `order_rcpt_${Date.now()}`,
            });
            console.log(razorpayOrder);
            //deducting the stock
            await Item.bulkWrite(
                cart.items.map(item => ({
                    updateOne: {
                        filter: { _id: item.itemId._id },
                        update: { $inc: { stock: -item.quantity } }
                    }
                })),
                { session }
            );

            const order = new Order({
                user: userId,
                items: cart.items.map(item => ({
                    itemId: item.itemId._id,
                    quantity: item.quantity
                })),
                totalPrice,
                razorpayOrderId: razorpayOrder.id,
                status: "pending"
            });
            await order.save({ session });

            await Customer.findByIdAndUpdate(
                userId,
                { $push: { orders: order._id } },
                { session }
            );

            await orderQueue.add(
                { orderId: order._id },
                {
                    delay: 10 * 60 * 1000,
                    removeOnComplete: true
                }
            );
            return { order, razorpayOrder };

        });
        res.status(201).json({
            message: "Order placed successfully",
            order: {
                id: result.order._id,
                razorpayOrderId: result.razorpayOrder.id,
                totalPrice: result.order.totalPrice,
                items: result.order.items
            }
        });

    } catch (error) {
        console.error("Error in placing order", error);
        return res.status(500).json({ message: "Error in placing the order", error });
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid request" });
        }

        const generated_signature = crypto
            .createHmac('sha256', key_secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        //signature mismatch
        if (generated_signature !== razorpay_signature) {
            await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "failed" }
            );
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }
        console.log("signature matched");
        //signature macthes
        const updatedOrder = await Order.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                status: "confirmed"
            },
            { new: true }
        );
        //clearing the cart after successful payment
        const user=updatedOrder.user;
        await Cart.deleteMany({user});
        await Customer.findByIdAndUpdate(user,{cart:null});
        //////////
        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
        //creating a transaction document after successful payment
        const newTransaction = new Transaction({
            user: updatedOrder.user._id,
            order: updatedOrder._id,
            amount: updatedOrder.totalPrice,
            status: "success"
        })
        await newTransaction.save();

        //publishing the event 
        const eventPayLoad = {
            eventId: 'evt_${Date.now()}_${razorpay_order_id}',
            orderId: updatedOrder._id,
            userId: updatedOrder.user,
            items: updatedOrder.items,

        };
        publisher.publish('order_confirmed', JSON.stringify(eventPayLoad));

        //returning success resposnse
        return res.status(200).json({
            success: true,
            eventPayLoad,
            message: "Payment verified successfully",
            order: updatedOrder
        });


    } catch (error) {
        console.error("error in verifing payment", error);
        return res.status(500).json({ message: "Error in payment verification", error });
    }
}