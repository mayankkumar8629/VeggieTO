import mongoose from "mongoose";
const {Schema,model}=mongoose;

const transactionSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },
    order:{
        type:Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
});
const Transaction=mongoose.model("Transaction",transactionSchema);
export default Transaction;