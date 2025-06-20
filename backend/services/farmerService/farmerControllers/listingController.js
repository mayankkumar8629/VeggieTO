import ProductListing from "../../../farmerModel/productListing.model.js";
import Farmer from "../../../farmerModel/farmer.model.js";

//creating a new product listing by the vendor
export const createListing = async(req,res)=>{
    try{
        const {items}=req.body;
        if(items.length===0 || !items){
            return res.status(400).json({message:"Items cannot be empty"});
        }
        const farmerId=req.user.id;
        const farmer = await Farmer.findById(farmerId);
        if(!farmer){
            return res.status(404).json({message:"Farmer not found"});
        }
        const invalidItems=items.filter(item => (
            !item.itemName ||
            !item.category ||
            !item.quantityUnit ||
            !item.quantityValue ||
            item.quantityValue <= 0 ||
            item.price === undefined
        ))
        if(invalidItems.length > 0){
            return res.status(400).json({message:"Invalid items in the listing", invalidItems});
        }
        const newListing = new ProductListing({
            farmer:farmerId,
            items:items,
            status:"pending"
        });
        await newListing.save();
        return res.status(201).json({message:"Listing created successfully", listing:newListing});
    }catch(error){
        console.error("Error creating listing:",error);
        return res.status(500).json({message})
    }
}

//getting all listings for the vendor
export const getAllListings = async(req,res)=>{
    try{
        const farmerId=req.user.id;
        const farmer = await Farmer.findById(farmerId);
        if(!farmer){
            return res.status(404).json({message:"Farmer not found"});
        }
        const listing =await ProductListing.find({farmer:farmerId});
        if(listing.length === 0){
            return res.status(404).json({message:"No listings found for this farmer"});
        }
        return res.status(200).json({message:"Listings retrieved successfully", listings:listing});
    }catch(error){
        console.error("Error retrieving listings:", error);
        return res.status(500).json({message:"Internal server error"});
    }
}