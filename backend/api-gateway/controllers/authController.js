import Customer from "../../UserModel/customer.model.js";
import Farmer from "../../farmerModel/farmer.model.js";
import Admin from "../../adminModel/admin.model.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
config.dotenv({path:"../../.env"});


export const login = async(req,res)=>{

    try{
        const {email,password,role}=req.body;
        let user=null;
        
        if(role==="customer"){
            user=await Customer.findOne({email});
        }else if(role==="farmer"){
            user=await Farmer.findOne({email});
        }else if(role=="admin"){
            user=await Admin.findOne({email:email});
        }
       
        if(!user){
            return res.status(400).json({message:"User does not exists"});
        }
        const hashedPassword=user.password;
        const isMatch=await bcrypt.compare(password,hashedPassword);
        if(!isMatch){
            return res.status(400).json({message:"Password does not match"});
        }
        const token=jwt.sign(
            {id:user._id,email:user.email,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.json({
            message:"Logged in Successfully",
            token,
            user:{
                userId:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        });

    }catch(error){
        console.error("login error",error);
        res.status(500).json({message:"Error in login",error});
    }
}

export const signup = async(req,res)=>{
    try{
        const {role}=req.body;
        let serviceUrl;
        let endpoint="/customer/signup";
        if(role==="customer"){
            serviceUrl=process.env.CUSTOMER_SERVICE_URL;
            endpoint="/customer/signup";
        }else if(role==="farmer"){
            serviceUrl=process.env.FARMER_SERVICE_URL;
            endpoint="/farmer/signup";
        }else if(role==="admin"){
            serviceUrl=process.env.LOGISTIC_SERVICE_URL;
            endpoint="/logistics/signup";
        }else{
            return res.status(400).json({message:"Invalid role provided"});
        }

        const response= await axios.post(`${serviceUrl}${endpoint}`,req.body);
        res.status(response.status).json(response.data);
    }catch(error){
        console.error("Signup Error",error.message);
        res.status(error.response?error.response.status:500)
            .json({message:error.message});
    }
}
