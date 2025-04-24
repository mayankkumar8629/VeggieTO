import mongoose from "mongoose";
const {Schema,model}=mongoose;

const orderSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },
    items:[
        {
            itemId:{
                type:Schema.Types.ObjectId,
                ref:"Item",
                required:true
            },
            quantity:{
                type:Nunber,
                required:true,
                min:1,
                default:1
            }
        }
    ],
    totalPrice:{
        type:Number,
        min:0,
        required:true
    },
    status:{
        type:String,
        enum:["pending","confirmed","cancelled","refunded","delivered"],
        default:"pending"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Order=mongoose.model("Order",orderSchema);
export default Order;