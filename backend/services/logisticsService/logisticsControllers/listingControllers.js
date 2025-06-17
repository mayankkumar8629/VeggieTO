import ProductListing from "../../../farmerModel/productListing.model";
import DeliveryPartner from "../../../logisticsModel/deliveryPartner.model";

//action on the listing by the vendor
export const actionOnProductListing = async(req,res)=>{
    try{
        const {action,date,pickupLocation,reason} = req.body;
        const listingId=req.params.id;

        //validation
        if(!['approve', 'reject'].includes(action)){
            return res.status(400).json({message:"Invalid action"});
        }
        const listing = await ProductListing.findById(listingId);
        if(!listing){
            return res.status(404).json({message:"Listing not found"});
        }
        if(listing.status !== 'pending'){
            return res.status(400).json({message:"Listing is not in pending state"});
        }
        //action is rejected
        if(action==='reject'){
            if(!reason){
                return res.status(400).json({message:"Reason is required for rejection"});
            }
            const updatedListing = await ProductListing.findByIdAndUpdate(
                listingId,
                {
                    status:'rejected',
                    rejectedReason:reason
                },
                {new:true}
            );
            return res.status(200).json({message:"Listing rejected successfully", listing:updatedListing});
        }
        //action is approved

    }
}