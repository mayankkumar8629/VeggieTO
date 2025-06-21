import Rider from "../../../adminModel/rider.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({path:"../../../.env"});
import jwt from "jsonwebtoken";
import { notifyCustomer } from "../config/websocket.js";
import Delivery from "../../../UserModel/delivery.model.js";


export const riderSignup = async(req,res)=>{
    try{
        const {name,email,password,contactNumber,address}=req.body;
        if(!name || !email || !password || !contactNumber || !address){
            return res.status(400).json({message:"Please fill all the fields"});

        }
        const existingRider = await Rider.findOne({email});
        if(existingRider){
            return res.status(400).json({message:"Rider already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newRider = new Rider({
            name,
            email,
            password:hashedPassword,
            contactNumber,
            address,
            role:"rider"
        });
        await newRider.save();
        return res.status(201).json({
            message:"Rider created successfully",
            rider:newRider
        })
    }catch(error){
        console.error("Error in riderSignup:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

//rider login
export const riderLogin = async(req,res)=>{
    const {email,password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const rider = await Rider.findOne({email});
        if(!rider){
            return res.status(400).json({message:"Rider not found"});
        }
        const hashedPassword = rider.password;
        const isMatch = await bcrypt.compare(password,hashedPassword);
        if(!isMatch){
            return res.status(400).json({message:"Password does not match"});
        }
        const token = jwt.sign(
            {id:rider._id,email:rider.email,role:rider.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        return res.status(200).json({
            message:"Logged in successfully",
            token,
            rider:{
                name:rider.name,
                email:rider.email
            }
        });

    }catch(error){
        console.error("Error in riderLogin:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}
export const riderDeliveryAccept = async(req,res)=>{
    const {deliveryId}=req.body;
    const riderId = req.user.id;
    try{
        if(!deliveryId){
            return res.status(400).json({message:"Please provide deliveryId"});
        }
        const rider = await Rider.findById(riderId);
        if(!rider){
            return res.status(400).json({message:"Rider not found"});
        }
        const delivery = await Delivery.findOneAndUpdate(
            {_id:deliveryId,
                status:"pending"
            },
            {
                status:"assigned",
                rider:riderId
            },
            {new :true}
        ).populate("user","name address contactNumber");
        if(!delivery){
            return res.status(400).json({message:"Delivery not found or already assigned"});
        }
        //notifying the customer through websockt
        notifyCustomer(delivery.user._id,"delivery_assigned",{
            deliveryId,
            message:"Your delivery has been assigned to a rider",
            riderName:rider.name,
            status:delivery.status,
            address:delivery.user.address
        })
        return res.status(200).json({
            message:"Delivey assigned successfully",
            delivery
        })
    }catch(error){
        console.error("Error in riderDeliveryAccept:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}
///when rider picks up the order 
export const riderDeliveryPickup = async(req,res)=>{
    const {deliveryId}=req.body;
    const riderId = req.user.id;
    try{
        const delivery = await Delivery.findOneAndUpdate(
            {
                _id:deliveryId,
                rider:riderId,
                status:"assigned"
            },
            {
                status:"picked-up"
            },
            {new:true}
        ).populate("user","name address contactNumber");
        if(!delivery){
            return res.status(400).json({message:"Delivery not found or already picked up"});
        }

        //notifying the customer
        notifyCustomer(delivery.user._id,"delivery_picked_up",{
            deliveryId,
            messsage:"Your delivery has been picked up by the rider",
            riderName:delivery.rider.name
        })
        return res.status(200).json({
            message:"Delivery picked up successfully",
            delivery
        });
    }catch(error){
        console.error("Error in riderDeliveryPickup:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}
//delievery completed
export const riderDeliveryComplete = async(req,res)=>{
    const {deliveryId}=req.body;
    const riderId = req.user.id;
    try{
        const delivery = await Delivery.findOneAndUpdate(
            {
                _id:deliveryId,
                rider:riderId,
                status:"picked-up"
            },
            {
                status:"delivered"
            },
            {
                new:true
            }
        ).populate("user","name address contactNumber");
        if(!delivery){
            return res.status(400).json({message:"Delivery not found or already delivered"});
        }
        //notifying the customer
        notifyCustomer(delivery.user._id,"delivery_delivered",{
            deliveryId,
            message:"Your delivery has been delivered",
            riderName:delivery.rider.name
        })
        return res.status(200).json({
            message:"Delivery completed successfully",
            delivery
        });
    }catch(error){
        console.error("Error in riderDeliveryComplete:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}