import Rider from "../../../adminModel/rider.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({path:"../../../.env"});
import jwt from "jsonwebtoken";

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
            address
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
            {riderId:rider._id,email:rider.email},
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