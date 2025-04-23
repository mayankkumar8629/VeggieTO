import Customer from "../../../UserModel/customer.model.js";
import Cart from "../../../UserModel/cart.model.js";
import Item from "../../../UserModel/items.model.js";
import mongoose from "mongoose";

//adding new item to the cart-strictly just add item in the cart
export const addCartItem = async(req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();

    try{
        const {itemId}=req.body;
        const userId=req.user.id;
        

        if(!mongoose.Types.ObjectId.isValid(itemId)){
            return res.status(400).json({message:"Invalid item id"});
        }

        const item=await Item.findById(itemId).session(session);
        console.log(item);
        if(!item || item.quantity<1){
            return res.status(404).json({message:"Item out of stock"});
        }
        console.log("itemhere");
        let cart = await Cart.findOne({user:userId}).session(session);
        if(cart?.items.some(i => i.itemId.equals(itemId))){
            return res.status(400).json({message:"Item already in cart"});
        }
        console.log(cart);
        if(!cart){
            //create new cart if cart does not exist
            cart = new Cart({
                user:userId,
                items:[{itemId:itemId,quantity:1}]
            });
            await cart.save({session});
            

            //adding the cartId to the customer
            await Customer.findByIdAndUpdate(
                userId,
                {cart:cart._id},
                {new:true,session}
            );
        }else{
            //adding the item to the existing cart
            cart.items.push({itemId,quantity:1});
            await cart.save({session});
        }
        console.log(cart);

        await session.commitTransaction();
        res.status(201).json({
            success: true,
            cart: await Cart.findById(cart._id).populate('items.itemId', 'name price')
        });

        
        
    }catch(error){
        await session.abortTransaction();
        res.status(500).json({message:"Error in adding item to cart"});
    }finally{
        session.endSession();
    }
}

//updating the item in the cart-strictly just update the item in the cart
export const updateCartItem = async(req,res)=>{

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {itemId}=req.body;
        const {action }=req.query;
        const userId=req.user.id;
        if(!mongoose.Types.ObjectId.isValid(itemId)){
            return res.status(400).json({message:"Invalid item id"});
        }
        if(!action || (!["increment","decrement"].included(action))){
            return res.status(400).json({message:"Invalid action"});
        }
        
        const cart=await Cart.findOne({user:userId}).session(session);
        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }
        const itemIndex=cart.items.findIndex(i => i.itemId.equals(itemId));
        if(itemIndex===-1){
            return res.status(404).json({message:"Item not found in cart"});
        }
        const currentQuantity=cart.items[itemIndex].quantity;
        let newQuantity=0;
        if(action === "increment"){
            newQuantity=currentQuantity+1;
        }else if(action==="decrement"){
            newQuantity=currentQuantity-1;
        }   

        const item =await Item.findById(itemId).session(session);
        if(action==="increment" && item.quantity<newQuantity){
            return res.status(400).json({message:"Item out of stock"});
        }
        if(newQuantity<=0){
            cart.items.splice(itemIndex,1);
        }else{
            cart.items[itemIndex].quantity=newQuantity;
        }

        await cart.save({session});
        await session.commitTransaction();
        const updatedCart=await Cart.findById(cart._id).populate('items.itemId', 'name price');
        res.status(200).json({
            success:true,
            cart:updatedCart
        });
    }catch(error){
        await session.abortTransaction();
        res.status(500).json({message:"Error in updating item in cart"});
    }finally{
        session.endSession();
    }
};

//removing the item from the cart
export const removeCartItem = async(req,res)=>{
    
}