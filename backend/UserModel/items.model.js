import mongoose from "mongoose";
const {Schema,model}=mongoose;

const itemSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        maxlength:500
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        required:true,
        enum:[
            "fruits",
            "vegetables",
            "groceries",
            "dairy",
            "eggs-meat",
            "beverages"
        ]
    },
    brand:{
        type:String,
        index:true
    },
    stock:{
        type:Number,
        default:0,
        min:0
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    images:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const Item=mongoose.model("Item",itemSchema);
export default Item;