import Customer from "../../../UserModel/customer.model.js"
import bcrypt from "bcrypt";

export const signup = async(req,res)=>{

    try{
        const {
            name,
            email,
            password,
            contactNumber,
            address
        }=req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"Empty field detected"});
        }
        const existingCustomer = await Customer.findOne({email:email});
        if(existingCustomer){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newCustomer = new Customer({
            name,
            email,
            password:hashedPassword,
            contactNumber,
            address,
            role:"customer"
        });
        await newCustomer.save();
        res.status(201).json({
            message:"New user created successfully",
            customer:{
                id:newCustomer._id,
                name:newCustomer.name,
                email:newCustomer.email,
                contactNumber:newCustomer.contactNumber,
                address:newCustomer.address,
                role:newCustomer.role,
                createdAt:newCustomer.createdAt
            }
        });
    }catch(error){
        console.error("Error in creating new customer",error);
        res.status(500).json({message:"Error in creating new customer"});
    }
}