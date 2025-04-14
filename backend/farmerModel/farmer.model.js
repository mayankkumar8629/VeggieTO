import mongoose from "mongoose";
const {Schema,model}=mongoose;

const farmerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reqired:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        village:{
            type:String
        },
        district:{
            type:String
        },
        state:{
            type:String
        },
        pincode:{
            type:Number
        }
    },
    role:{
        type:String,
        required:true,
        enum:["customer","farmer","admin"],
        default:"farmer"
    },
    bankDetails:{
        accountNumber:{
            type:String
        },
        IFSC:{
            type:String
        },
        UPI:{
            type:String
        }
    },
    order:{
        type:Schema.Types.ObjectId,
        ref:"FarmerOrder"
    },
    pickup:{
        type:Schema.Types.ObjectId,
        ref:"Pickup"
    },
    payment:{
        type:Schema.Types.ObjectId,
        ref:"Payment"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});
const Farmer=mongoose.model("Farmer",farmerSchema);
export default Farmer;