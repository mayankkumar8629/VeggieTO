import Rider from "../../../adminModel/rider.model.js";
import bcrypt from "bcrypt";

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