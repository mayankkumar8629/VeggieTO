import mongoose, { SchemaType } from "mongoose";
const {Schema,model}=mongoose;

const productListingSchema = new Schema({
    farmer:{
        type:Schema.Types.ObjectId,
        ref:"Farmer",
        required:true
    },
    items:[
        {
            itemName:{
                type:String,
                required:true
            },
            category:{
                type:String,
                enum:["fruits","vegetables","groceries","dairy","eggs-meat","beverages"],
                required:true
            },
            quantity:{
                type:String,
                enum:["kg","litre","pcs"],
                required:true
            },
            price:{
                type:Number,
                required:true,
                min:0
            }
        }
    ],
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        required:true,
    },
    rejectedReason:{
        type:String
    },
    deliveryPartner:{
        type:Schema.Types.ObjectId,
        ref:"DeliveryPartner"
    },
    pickupDate:{
        type:Date
    },
    pickupLocation:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});
const ProductListing = model("ProductListing", productListingSchema);
export default ProductListing;