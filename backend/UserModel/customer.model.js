import mongoose from "mongoose";

const { Schema ,model} = mongoose;

const customerSchema = new Schema({
    name:{
        type:String,
        requied:true
    },
    email:{
        type:String,
        required:true,
        unique:true
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
        street:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        }
    },
    cart:[
        {
            type:Schema.Types.ObjectId,
            ref:"Cart"
        }
    ],
    transactions:[
        {
            type:Schema.Types.ObjectId,
            ref:"Transaction"
        }
    ],
    deliveries:[
        {
            type:Schema.Types.ObjectId,
            ref:"Delivery"
        }
    ],
    orders:[
        {
            type:Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

const Customer = mongoose.model("Customer",customerSchema);
export default Customer;