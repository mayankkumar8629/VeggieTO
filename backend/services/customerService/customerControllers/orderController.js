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


import mongoose from "mongoose";

export const placeOrder = async(req,res)=>{
    try{
        const {cartId}=req.params;
        const userId=req.user.id;

        const result = await runTransaction(async(session)=>{
            
            const cart=await Cart.findById(cartId)
            .populate({
                path:"items.itemId",
                select:"name price stock"
            })
            .session(session);
            if(!cart){
                return res.status(404).json({message:"Cart not found"});
            }
            const outOfStockItem = cart.items.filter(
                item => item.itemId.stock < item.quantity
            );
            if(outOfStockItem.length > 0){
                return res.status(400).json({message:"some items are out of stock"})
            }

            const totalPrice = cart.items.reduce((sum,item)=>
                sum + (item.itemId.price * item.quantity),0
            );

            const razorpayOrder = await razorpayClient.orders.create({
                amount : totalPrice * 100,
                currency: "INR",
                receipt: `order_rcpt_${Date.now()}`,
            });
            console.log(razorpayOrder);
            //deducting the stock
            await Item.bulkWrite(
                cart.items.map(item=>({
                    updateOne:{
                        filter:{_id:item.itemId._id},
                        update:{ $inc :{stock: -item.quantity}}
                    }
                })),
                {session}
            );

            const order = new Order({
                user:userId,
                items:cart.items.map(item=>({
                    itemId:item.itemId._id,
                    quantity:item.quantity
                })),
                totalPrice,
                razorpayOrderId:razorpayOrder.id,
                status:"pending"
            });
            await order.save({session});

            await Customer.findByIdAndUpdate(
                userId,
                { $push: {orders: order._id}},
                {session}
            );

            await orderQueue.add(
                {orderId:order._id},
                {
                    delay: 10 * 60 * 1000,
                    removeOnComplete:true
                }
            );
            return {order,razorpayOrder};
        
        });
        res.status(201).json({
            message:"Order placed successfully",
            order:{
                id:result.order._id,
                razorpayOrderId:result.razorpayOrder.id,
                totalPrice:result.order.totalPrice,
                items:result.order.items
            }
        });
        
    }catch(error){
        console.error("Error in placing order",error);
        return res.status(500).json({message:"Error in placing the order",error});
    }
}

// export const verifyPayment = (req,res)=>{
//     try{
//         const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;

//         const key_secret=process.env.RAZORPAY_KEY_SECRET;

//         const generated_signature = crypto
//         .createHmac('sha256',key_secret)
//         .update(razorpay_order_id + "|" + razorpay_payment_id)
//         .digest('hex');
//         if(generated_signature===razorpay_signature){
//             return res.status(200).json({success:true,message:"Payment verified"});
//         }else{
//             return res.status(400).json({success:false,message:"Payment failed"});
//         }
//     }catch(error){
//         console.error("error in verifing payment",error);
//         return res.status(500).json({message:"Error in payment verification",error});
//     }
// }

export const verifyPayment = async(req,res)=>{
    try {
        const { razorpay_payment_id, razorpay_order_id } = req.body;
    
        if (!razorpay_payment_id || !razorpay_order_id) {
          return res.status(400).json({ success: false, error: "Missing payment/order ID" });
        }
    
        // Fetch payment from Razorpay API
        const payment = await razorpayClient.payments.fetch(razorpay_payment_id);
    
        // Check if payment is successful
        if (payment.status === 'captured') {
          return res.json({ 
            success: true,
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            amount: payment.amount,
            currency: payment.currency
          });
        } else {
          return res.json({ 
            success: false,
            status: payment.status,
            error: "Payment not captured"
          });
        }
    
      } catch (error) {
        console.error("Payment verification failed:", error);
        res.status(500).json({ 
          success: false,
          error: error.message || "Payment verification failed"
        });
      }
}