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
//getting all the pending deliveries for the rider
export const getPendingDeliveries = async(req,res)=>{
    try{
        const riderId=req.user.id;
        const rider=await Rider.findById(riderId);
        if(!rider){
            return res.status(404).json({message:"Rider not found"});
        }
        // const deliveries = await Delivery.find({
        //     status:"pending"
        // });
        const deliveries = await Delivery.find({status:"pending"})
        .populate({
            path:'user',
            select:'name contactNumber address'
        })
        .populate({
            path:'order',
            populate:{
                path:'items.itemId',
                select:'name'
            }
        });
    
        if(deliveries === undefined || deliveries.length === 0){
            return res.status(404).json({message:"No pending deliveries found"});
        }
        return res.status(200).json({
            message:"Pending deliveries fetched successfully",
            deliveries
        });

    }catch(error){
        console.error("Error in getPendingDeliveries:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
//get rider profile
export const getRiderProfile = async(req,res)=>{
    try{
        const riderId=req.user.id;
        const rider = await Rider.findById(riderId);
        if(!rider){
            return res.status(404).json({message:"Rider not found"});
        }
        return res.status(200).json({
            message:"Rider profile fetched successfully",
            rider:{
                name:rider.name,
                email:rider.email,
                contactNumber:rider.contactNumber,
                address:rider.address
            }
        })

    }catch(error){
        console.error("Error in getRiderProfile:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
//update rider profile
export const updateRiderProfile = async(req,res)=>{
    try{
        const riderId=req.user.id;
        const {name,email,contactNumber,address}=req.body;
        if(!name || !email || !contactNumber || !address){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const rider = await Rider.findByIdAndUpdate(
            riderId,
            {
                name,
                email,
                contactNumber,
                address
            },
            {new:true}
        );
        await rider.save();
        return res.status(200).json({
            message:"Rider profile updated successfully",
            rider:{
                name:rider.name,
                email:rider.email,
                contactNumber:rider.contactNumber,
                address:rider.address
            }
        });
    }catch(error){
        console.error("Error in updateRiderProfile:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
//getting all the ongoing deliveries for the rider
export const getOngoingDeliveries = async(req,res)=>{
    try{
        const riderId=req.user.id;
        const rider=await Rider.findById(riderId);
        if(!rider){
            return res.status(404).json({message:"Rider not found"});
        }


        const deliveries = await Delivery.find({
            rider:riderId,
            status: { $in: ["assigned", "picked-up"] }
        })
        .populate({
            path:'user',
            select:'name contactNumber address'
        })
        .populate({
            path:'order',
            populate:{
                path:'items.itemId',
                select:'name'
            }
        });

        if(deliveries === undefined || deliveries.length === 0){
            return res.status(404).json({message:"No ongoing deliveries found"});
        }
        return res.status(200).json({
            message:"Ongoing deliveries fetched successfully",
            deliveries
        });
    }catch(error){
        console.error("Error in getOngoingDeliveries:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}

//getting all the completed deliveries for the rider
export const getAllCompletedDeliveries = async(req,res)=>{
    try{
        const riderId=req.user.id;
        const rider=await Rider.findById(riderId);
        if(!rider){
            return res.status(404).json({message:"Rider not found"});
        }
        const deliveries = await Delivery.find({
            rider:riderId,
            status: "delivered"
        })
        .populate({
            path:'user',
            select:'name contactNumber address'
        })
        .populate({
            path:'order',
            populate:{
                path:'items.itemId',
                select:'name'
            }
        })
        console.log(deliveries);
        if(deliveries === undefined || deliveries.length === 0){
            return res.status(404).json({message:"No completed deliveries found"});
        }
        return res.status(200).json({
            message:"Completed deliveries fetched successfully",
            deliveries
        });
    }catch(error){
        console.error("Error in getAllCompletedDeliveries:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}




//rider accepting the delivery
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