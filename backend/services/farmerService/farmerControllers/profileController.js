import Farmer from "../../../farmerModel/farmer.model.js";

export const getProfile = async (req,res)=>{
    try{
        const farmerId = req.user.id;
        const farmer = await Farmer.findById(farmerId);
        if(!farmer){
            return res.status(404).json({
                message:"Farmer not found"
            })
        }
        return res.status(200).json({
            message:"Farmer profile fetched successfully",
            farmer
        })
    }catch(error){
        console.error("Error fetching farmer profile",error);
        return res.status(500).json({
            message:"Internal server error while fetching farmer profile",
            error:error.message
        })
    }
}
//upading the farmer profile

export const updateProfile = async (req,res)=>{
    const {name,email,contactNumber,address,bankDetails}=req.body;
    try{
        const farmerId=req.user.id;
        const updatedFarmer = await Farmer.findByIdAndUpdate(
            farmerId,
            {
                name,
                email,
                contactNumber,
                address,
                bankDetails
            },
            {new:true, runValidators:true}
        )
        if(!updatedFarmer){
            return res.status(404).json({
                message:"Farmer not found"
            })
        }
        return res.status(200).json({
            message:"Farmer profile updated successfully",
            updatedFarmer
        })
    }catch(error){
        console.error("Error updating farmer profile",error);
        return res.status(500).json({
            message:"Internal server error while updating farmer profile",
            error:error.message
        })
    }
}