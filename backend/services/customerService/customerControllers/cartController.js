import Customer from "../../../UserModel/customer.model.js";
import Cart from "../../../UserModel/cart.model.js";
import Item from "../../../UserModel/items.model.js";
import mongoose from "mongoose";

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