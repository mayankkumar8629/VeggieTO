import ProductListing from "../../../farmerModel/productListing.model.js";
import DeliveryPartner from "../../../adminModel/deliveryPartner.model.js";
import Shipment from "../../../farmerModel/shipment.model.js";

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
        if(action === 'approve'){
            if(!date || !pickupLocation){
                 return res.status(400).json({message:"Date and pickup location are required for approval"});
            }

            //creating a promise
            const [updatedListing,shipment]= await Promise.all([
                ProductListing.findByIdAndUpdate(
                    listingId,
                    {
                        status:'approved',
                        pickupDate:new Date(date),
                        pickupLocation:pickupLocation
                    },
                    {new:true}

                ),

                Shipment.create({
                    farmer:listing.farmer,
                    listing:listingId,
                    status:'pending',
                    pickupDate:new Date(date),
                    pickupLocation:pickupLocation,

                })
            ]);
            
            //validating the promise
            if(!updatedListing || !shipment){
                if(updatedListing){
                    ProductListing.findByIdAndUpdate(
                        listingId,
                        {status:'pending'},
                        {new:true}
                    )
                }
                throw new Error("Failed to update listing or create shipment");
            }

            return res.status(200).json({
                message:"listing approved successfully and shipment created",
                listing:updatedListing,
                shipment:shipment
            });

               
        }

    }catch(error){
        console.error("Error in actionOnProductListing:", error);
        return res.status(500).json({message:"Internal server error", error:error.message});
    }
}