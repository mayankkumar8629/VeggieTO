import mongoose from "mongoose";
const {Schema,model}=mongoose;

const deliveryPartnerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    vehicleType:{
        type:String,
        enum:["mini-van","van","truck"],
        required:true
    },
    vehicleNumber:{
        type:String,
        required:true
    },
    shipment:[{
        type:Schema.Types.ObjectId,
        ref:"Shipment"
    }],
    isAvailable:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:"delivery-partner"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const DeliveryPartner = model("DeliveryPartner",deliveryPartnerSchema);
export default DeliveryPartner;