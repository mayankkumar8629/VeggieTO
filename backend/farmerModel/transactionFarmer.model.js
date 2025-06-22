import mongoose from "mongoose";
const {Schema,model}=mongoose;

const farmerTransactionSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"Customer",
        required:true
    },
    listing:{
        type:Schema.Types.ObjectId,
        ref:"ProductListing",
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
const FarmerTransaction=mongoose.model("farmerTransaction",farmerTransactionSchema);
export default FarmerTransaction;