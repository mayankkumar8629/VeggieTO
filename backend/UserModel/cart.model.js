import mongoose from "mongoose";
const {Schema,model}=mongoose;

const cartSchema=new Schema({
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
                type:Number,
                required:true,
                min:1,
                default:1
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
        
});
const Cart=mongoose.model("Cart",cartSchema);
export default Cart;