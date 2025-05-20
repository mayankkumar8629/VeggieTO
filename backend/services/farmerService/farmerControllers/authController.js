import Farmer from "../../../farmerModel/farmer.model.js";
import bcrypt from "bcrypt";

export const signup = async(req,res)=>{
    try{
        const {name,email,contactNumber,password}=req.body;
        if(!name || !email || !contactNumber || !address){
            return res.status(400).json({message:"Input fields cannot be left blank"});
        }
        const existingUser = await Farmer.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newFarmer=new Farmer({
            name,
            email,
            contactNumber,
            password:hashedPassword,
            role:"farmer"
        });
        await newFarmer.save();
        return res.status(201).json({
            message:"New account created",
            farmer:{
                id:newFarmer._id,
                name:newFarmer.name,
                email:newFarmer.email,
                role:newFarmer.role,
                createdAt:newFarmer.createdAt

            }
        });
    }catch(error){
        console.error("Error creating new account",error);
        return res.status(500).json({message:"Error creating new account"});
    }
}