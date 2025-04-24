import razorpayClient from "../config/razorpay.config.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";

export const placeOrder = async(req,res)=>{
    try{
        const {cartId}=req.params;

        const cart=await Cart.findById(cartId)
        .populate({
            path:"items.itemId",
            select:"name price stock"
        });

        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }

        const outOfStockItems=[];
        for(const item of cart.items){
            if(item.ItemId.stock<item.quantity){
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


    }catch(error){
        console.error("Error in placing order",error);
        return res.status(500).json({message:"Internal server error"});
    }
}