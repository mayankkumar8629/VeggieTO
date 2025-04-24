import mongoose from "mongoose";
const {Schema,model}=mongoose;

const riderSchema = new Schema({
    
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
    deliveries:[
        {
            type:Schema.Types.ObjectId,
            ref:"Delivery"
        }
    ],
    isAvailable:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


});

const Rider = mongoose.model("Rider",riderSchema);
export default Rider;