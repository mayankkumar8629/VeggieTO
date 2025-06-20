import DeliveryPartner from "../../../adminModel/deliveryPartner.model.js";
import bcrypt from "bcrypt";


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
