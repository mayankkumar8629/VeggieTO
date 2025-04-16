import bcrypt from "bcrypt";
import Admin from "../../../adminModel/admin.model.js";

export const signup = async(req,res)=>{
    try{
        const {name,email,password,contactNumber,passcode,address}=req.body;
        if(!name || !email || !contactNumber){
            return res.status(400).json({message:"Fields connot be empty"});
        }
        const existingUser=await Admin.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        if(passcode!="Mayank"){
            return res.status(400).json({message:"Passcode is wrong"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newAdmin=new Admin({
            name,
            email,
            password:hashedPassword,
            contactNumber,
            role:"admin",
            address
        });
        await newAdmin.save();
        return res.status(201).json({
            message:"Account created successfully",
            admin:{
                id:newAdmin._id,
                name:newAdmin.name,
                email:newAdmin.email,
                createdAt:newAdmin.createdAt
            }
        })
    }catch(error){
        console.error("Error creating new account",error);
        return res.status(500).json({message:"Error creating new account"});
    }
}