import mongoose from "mongoose";
const {Schema,model}=mongoose;

const deliverySchema = new Schema({
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
    rider:{
        type:Schema.Types.ObjectId,
        ref:"Rider"
    },
    status:{
        type:String,
        enum:[
            'pending',
            'assigned',
            'picked-up',
            'delivered',
            'failed'
        ],
        default:'pending'
    },
    contact:{
        type:Number
    },
    failureReason:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Delivery=mongoose.model("Delivery",deliverySchema);
export default Delivery;