import Customer from "../../../UserModel/customer.model.js";

///get profile
export const getProfile = async(req,res)=>{
    try{
        const customerId=req.user.id;
        const customer = await Customer.findById(customerId);
        if(!customer){
            return res.status(404).json({message:"Customer not found"});
        }
        return res.status(200).json({
            message:"Customer profile retrieved successfully",
            customer:{
                name:customer.name,
                email:customer.email,
                contactNumber:customer.contactNumber,
                address:customer.address
            }
        })
    }catch(error){
        console.error("Error in getProfile:",error);
        return res.status(500).json({message:"Internal server error"});
    }
}

//update profile
export const updateProfile = async(req,res)=>{
    try{
        console.log(req.body);
        const {name,email,contactNumber,address}=req.body;
        console.log(name,email,contactNumber,address);
        if(!name || !email || !contactNumber || !address){
            return res.status(400).json({message:"All fields are required"});
        }
        console.log("HI");
        const customerId=req.user.id;
        const  updateCustomer = await Customer.findByIdAndUpdate(
            customerId,
            {
                name,
                email,
                contactNumber,
                address
            },
            {
                new:true
            }
        );
        if(!updateCustomer){
            return res.status(404).json({message:"Customer not found"});
        }
        return res.status(200).json({
            message:"Customer profile updated successfully",
            customer:{
                name:updateCustomer.name,
                email:updateCustomer.email,
                contactNumber:updateCustomer.contactNumber,
                address:updateCustomer.address
            }
        });
    }catch(error){
        console.error("Error in updateProfile:",error); 
        return res.status(500).json({message:"Internal server error"});
    }
}