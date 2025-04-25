import razorpayClient from "../config/razorpay.config.js";
import Order from "../../../UserModel/order.model.js";
import Cart from "../../../UserModel/cart.model.js";
import Customer from "../../../UserModel/customer.model.js";
import Item from "../../../UserModel/items.model.js";
import orderQueue from "../utils/orderQueue.js";

import mongoose from "mongoose";
export const order = async(req,res)=>{
    try{
        const {cartId}=req.params;
        const cart = await Cart.findById(cartId)
        .populate({
            path:"items.itemId",
            select:"name price stock"
        })
        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }
        const outOfStockItems=[];
        for(const item of cart.items){
            if(item.itemId.stock<item.quantity){
                outOfStockItems.push({
                    name:item.itemId.name
                })
            }
        }
        if(outOfStockItems.length>0){
            return res.status(400).json({
                message:"Some items are out of stock",
                outOfStockItems
            });
        }
        const totalPrice =cart.items.reduce((sum,item)=>{
            return sum + (item.itemId.price * item.quantity);
        },0);
        const razorpayOrder = await razorpayClient.orders.create({
            amount:totalPrice*100,
            currency:"INR",
            receipt:`order_rcpt_${Date.now()}`,

        });
        await orderQueue.add(
            { orderId:  razorpayOrder.id },
            { 
              delay: 10 * 60 * 1000, // 10 minutes in ms
              removeOnComplete: true // Auto-remove completed jobs
            }
        );
        return res.status(200).json(razorpayOrder);
        //

    }catch(error){
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const placeOrder = async(req,res)=>{
   
    // console.log("Hi");
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try{
        console.log(req.params);
        const {cartId}=req.params;
        const userId=req.user.id;

        const cart=await Cart.findById(cartId)
        .populate({
            path:"items.itemId",
            select:"name price stock"
        });
        

        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }
        console.log(cart);

        const outOfStockItems=[];
        for(const item of cart.items){
            if(item.itemId.stock<item.quantity){
                outOfStockItems.push({
                    name:item.itemId.name
                })
            }
        }
        if(outOfStockItems.length>0){
            return res.status(400).json({
                message:"Some items are out of stock",
                outOfStockItems
            });
        }
        //deducting stock
        const stockUpdates = cart.items.map(item=>({
            updateOne:{
                filter:{_id:item.itemId._id},
                update:{ $inc : {stock : -item.quantity}}
            }
        }));
        console.log(stockUpdates);
        await Item.bulkWrite(stockUpdates);
        //calculating total price
        const totalPrice =cart.items.reduce((sum,item)=>{
            return sum + (item.itemId.price * item.quantity);
        },0);

        //creatig the razorpay order
        const razorpayOrder = await razorpayClient.orders.create({
            amount:totalPrice*100,
            currency:"INR",
            receipt:`order_rcpt_${Date.now()}`,

        });
        const order = new Order.create([{
            
                user:userId,
                items:cart.items.map(item=>({
                    itemId:item.itemId._id,
                    quantity:item.quantity
                })),
                totalPrice,
                razorpayOrderId:razorpayOrder.id,
                status:"pending"
    
        }]);

        await Customer.findByIdAndUpdate(
            userId,
            {$push:{orders:order[0]._id}},
            // {session}
        );
        await orderQueue.add(
            { orderId: order[0]._id },
            { 
              delay: 10 * 60 * 1000, // 10 minutes in ms
              removeOnComplete: true // Auto-remove completed jobs
            }
        );
        // await session.commitTransaction();
        res.status(201).json({
            message:"Order placed successfully",
            order:{
                id:order[0]._id,
                razorpayOrderId:razorpayOrder.id,
                totalPrice,
                items:cart.items.map(item=>({
                    itemId:item.itemId._id,
                    quantity:item.quantity
                }))
            }
        });
        res.status(201).json(razorpayOrder)




    }catch(error){
        // await session.abortTransaction();
        return res.status(500).json({message:"Internal server error"});
    }
};