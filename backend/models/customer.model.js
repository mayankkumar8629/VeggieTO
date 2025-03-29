import mongoose from "../config/db.js";

const { Schema } = mongoose;

const customerSchema = new Schema({
    name:{
        type:String,
        requied:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requird:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    role: {
        type: String,
        required: true,
        enum: ["customer", "farmer", "admin"],
        default: "customer"
    },
    address:{
        type:String,
        requird:true
    },
    city:{
        type:String,
        required:true

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

const Customer = mongoose.model("customerSchema",Customer);
export default Customer;