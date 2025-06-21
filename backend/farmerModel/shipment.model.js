import mongoose from "mongoose";
const {Schema,model}=mongoose;

const shipmentSchema = new Schema({
    farmer:{
        type:Schema.Types.ObjectId,
        ref:"Farmer",
        required:true
    },
    listing:{
        type:Schema.Types.ObjectId,
        ref:"ProductListing",
        required:true
    },
    deliveryPartner:{
        type:Schema.Types.ObjectId,
        ref:"DeliveryPartner",
        required:true
    },
    status:{
        type:String,
        enum:["pending","confirmed","in-transit","delivered","failed"],
        default:"pending"
    },
    failureReason:{
        type:String
    },
    pickupDate:{
        type:Date,
        required:true
    },
    pickupLocation:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Shipment = model("Shipment",shipmentSchema);
export default Shipment;