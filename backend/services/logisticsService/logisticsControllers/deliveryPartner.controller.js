import { JsonWebTokenError } from "jsonwebtoken";
import DeliveryPartner from "../../../adminModel/deliveryPartner.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({path:"../../../.env"});
import jwt from "jsonwebtoken";
import Shipment from "../../../farmerModel/shipment.model.js";
import { notifyFarmers } from "../config/websocket.js";

//delivery partner signup
export const  signup = async(req,res)=>{
    try{
        const {name,email,password,contactNumber,address,vehicleType,vehicleNumber} = req.body;
        if(!name || !email || !password || !contactNumber || !address || !vehicleType || !vehicleNumber){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const existingUser= await DeliveryPartner.fin({email:email});
        if(existingUser){
            return res.status(400).json({message:"Delivery partner already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newDeliveryPartner = new DeliveryPartner({
            name,
            email,
            password:hashedPassword,
            contactNumber,
            address,
            vehicleType,
            vehicleNumber
        });
        await newDeliveryPartner.save();
        return res.status(201).json({
            message:"Delivery partner created successfully",
            deliveryPartner:{
                name:newDeliveryPartner.name,
                email:newDeliveryPartner.email,
                contactNumber:newDeliveryPartner.contactNumber,
                address:newDeliveryPartner.address,
                vehicleType:newDeliveryPartner.vehicleType,
                vehicleNumber:newDeliveryPartner.vehicleNumber
            }
        });
    }catch(error){
        console.error("Error in delivery partner signup:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}
//delivery partner login
export const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields"});
        }
        const user = await DeliveryPartner.findOne({emaail:email});
        if(!user){
            return res.status(400).json({message:"Delivery partner not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Password does not match"});
        }
        const token = jwt.sign(
            {id:user._id,email:user.email,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
        return res.status(200).json({
            success:true,
            message:"Logged in successfully",
            token,
            deliveryPartner:{
                name:user.name,
                email:user.email
            }
        });
    }catch(error){
        console.error("Error in login ",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

//delivery partner accept shipment
export const acceptShipment = async(req,res)=>{
    try{
        const {shipmentId}= req.body;
    const deliveryPartnerId=req.user.id;
    
    const deliveryPartner = await DeliveryPartner.findById(deliveryPartnerId);
    if(!deliveryPartner){
        return res.status(404).json({message:"Delivery partner not found"});
    }
    const shipment = await Shipment.findById(shipmentId)
    if(!shipment){
        return res.status(404).json({message:"Shipment not found"});
    }
    if(shipment.status !== 'pending'){
        return res.status(400).json({message:"Shipment alreaedy assigned or completed"});
    }
    const updatedShipment = await Shipment.findByIdAndUpdate(
        shipmentId,
        {
            status:"confirmed",
            deliveryPartner:deliveryPartnerId
        },
        {
            new:true
        }
    );
    if(!updatedShipment){
        return res.status(500).json({message:"Failed to update shipment status"});
    }
    const payload  = {
        shipmentId,
        message:"Shipment accepted successfully",
        deliveryPartnerDetail:{
            name:deliveryPartner.name,
            contactNumber:deliveryPartner.contactNumber,
            vehicleType:deliveryPartner.vehicleType,
            vehicleNumber:deliveryPartner.vehicleNumber
        }
    }
    notifyFarmers(shipment.farmer._id,'shipment_accepted',payload);



    return res.status(200).json({message:"Shipment accepted successfully",shipment:updatedShipment});

    }catch(error){
        console.error("Error in acceptShipment:",error);
        return res.status(500).json({message:"Internal server error", error:error.message});
    }


}
