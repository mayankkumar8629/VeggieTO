import mongoose from "mongoose";
const { Schema ,model} = mongoose;

const adminSchema = new Schema({
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
        default: "admin"
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
    createdAt:{
        type:Date,
        default:Date.now
    }
});
const Admin=mongoose.model("Admin",adminSchema);
export default Admin;