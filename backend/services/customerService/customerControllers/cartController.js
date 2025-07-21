import Customer from "../../../UserModel/customer.model.js";
import Cart from "../../../UserModel/cart.model.js";
import Item from "../../../UserModel/items.model.js";
import mongoose, { mongo } from "mongoose";
import { runTransaction } from "../../../config/db.js";


//get cart
export const testSession = async (req, res) => {
    // 1. First verify connection state
    try {
        // Manually connect if disconnected
        if (mongoose.connection.readyState === 0) {
            await mongoose.disconnect(); // Clean up any stale connection
            await mongoose.connect(process.env.MONGO_URI, {
              connectTimeoutMS: 30000,
              socketTimeoutMS: 45000
            });
          }
    
        const session = await mongoose.startSession();
        console.log('✅ Success! Session ID:', session.id);
        session.endSession();
        res.json({ status: 'Connected', sessionId: session.id });
    
      } catch (err) {
        console.error('Fatal connection error:', err);
        res.status(500).json({ 
          error: err.message,
          advice: 'Check: 1) Connection string 2) Internet 3) Atlas IP whitelist'
        });
      }
  };
  
export const getCart = async(req,res)=>{
    
    try{
        const userId=req.user.id;
        const cart = await Cart.findOne({user:userId})
        .populate({
            path:'items.itemId',
            select:'name price stock category',
        })
        .lean();
        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }
        let message;
        if(cart.items.length===0){
            message="cart is empty"
        }else{
            message=`items in the cart = ${cart.items.length}`;
        }
        const totalPrice = cart.items.reduce((sum,item)=>(
            sum + (item.itemId.price * item.quantity)
        ),0);
        return res.json({
            message,
            cart:{
                ...cart,
                totalPrice,
                itemCount:cart.items.length
            }
        });
    }catch(error){
        console.error("error fetching cart",error);
        return res.status(500).json({message:"Failed to fetch the cart"});
    }

}
//adding new item to the cart-strictly just add item in the cart
export const addCartItem = async (req, res) => {
    try {
      const result = await runTransaction(async (session) => {
        const { itemId } = req.body;
        const userId = req.user.id;
  
        // Validate item ID
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
          throw { status: 400, message: "Invalid item id" };
        }
  
        // Check item availability
        const item = await Item.findById(itemId).session(session);
        if (!item || item.stock < 1) {
          throw { status: 404, message: "Item out of stock" };
        }
  
        // Check cart existence
        const cart = await Cart.findOne({ user: userId }).session(session);
        
        // Check if item already in cart
        if (cart?.items.some(i => i.itemId.equals(itemId))) {
          throw { status: 409, message: "Item already in cart" };
        }
  
        if (!cart) {
          // Create new cart
          const newCart = await Cart.create([{
            user: userId,
            items: [{ itemId, quantity: 1 }]
          }], { session });
  
          // Update customer's cart reference
          await Customer.findByIdAndUpdate(
            userId,
            { cart: newCart[0]._id },
            { new: true, session }
          );
  
          return newCart[0];
        } else {
          // Add to existing cart
          cart.items.push({ itemId, quantity: 1 });
          await cart.save({ session });
          return cart;
        }
      });
  
      res.status(200).json({ 
        success: true,
        cart: result
      });
  
    } catch (error) {
      console.error('Transaction error:', error);
      
      return res.status(500).json({
        message: error.message || "Error adding item to cart",
        error: error.error || null
      });
    }
  };
//updating the item in the cart-strictly just update the item in the cart
export const updateCartItem = async (req, res) => {
    try {
      await runTransaction(async (session) => {
        const { itemId } = req.body;
        const { action } = req.body;
        const userId = req.user.id;
        console.log(itemId);
        console.log(req.query);
        console.log(action)
        // Validate inputs
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
          throw { status: 400, message: "Invalid item id" };
        }
        if (!action || !["increment", "decrement"].includes(action)) {
          throw { status: 400, message: "Invalid action" };
        }
  
        // Find cart and validate
        const cart = await Cart.findOne({ user: userId }).session(session);
        if (!cart) {
          throw { status: 404, message: "Cart not found" };
        }
  
        // Find item in cart
        const itemIndex = cart.items.findIndex(i => i.itemId.equals(itemId));
        if (itemIndex === -1) {
          throw { status: 404, message: "Item not found in cart" };
        }
  
        // Calculate new quantity
        const currentQuantity = cart.items[itemIndex].quantity;
        let newQuantity = action === "increment" 
          ? currentQuantity + 1 
          : currentQuantity - 1;
  
        // Check stock if incrementing
        if (action === "increment") {
          const item = await Item.findById(itemId).session(session);
          if (item.quantity < newQuantity) {
            throw { status: 400, message: "Item out of stock" };
          }
        }
  
        // Update or remove item
        if (newQuantity <= 0) {
          cart.items.splice(itemIndex, 1);
        } else {
          cart.items[itemIndex].quantity = newQuantity;
        }
  
        await cart.save({ session });
        
      });
  
      const updatedCart=await Cart.findOne({user:req.user.id}).populate('items.itemId', 'name price');
      res.status(200).json({
            success:true,
            cart:updatedCart
        });
    } catch (error) {
      console.error('Transaction error:', error);
      
      const statusCode = error.status || 500;
      const errorMessage = error.message || "Error in updating item in cart";
      
      return res.status(statusCode).json({
        message: errorMessage,
        error: error.error || null
      });
    }
  };



export const removeCartItem = async(req,res)=>{
  try{
    await runTransaction(async (session) => {
      const {itemId}=req.body;
      const userId=req.user.id;
      
      if(!mongoose.Types.ObjectId.isValid(itemId)){
        return res.status(500).json({message:"Invaid item id"});
      }
      const cart = await Cart.findOne({user:userId}).session(session);
      if(!cart){
        return res.status(404).json({message:"Cart not found"});
      }
      const initialLength=cart.items.length;
      cart.items=cart.items.filter(item=>!item.itemId.equals(itemId));
      if(cart.items.length===initialLength){
        return res.status(404).json({message:"Item not in the cart"});
      }
      if(cart.items.length===0){
        await Cart.deleteOne({_id:cart._id}).session(session);
        await Customer.findByIdAndUpdate(userId,{cart:null},{session});
      }else{
        await cart.save({session});
      }
    });
    const updatedCart=await Cart.findOne({user:req.user.id}).populate('items.itemId','name price');
    return res.status(200).json({
      success:true,
      cart:updatedCart
    });
  }catch(error){
    console.error("Error deleting items from the cart");
    return res.status(500).json({message:"Error deleting item from the cart",error});
  }

}

///clear all the items in the cart
export const clearCart = async(req,res)=>{
  try{
    const cartId=req.params.cartId;
    const userId=req.user.id;
    if(!mongoose.Types.ObjectId.isValid(cartId)){
      return res.status(400).json({message:"Invalid cart id"});
    }
    const cart= await Cart.findById(cartId);
    if(!cart){
      return res.status(404).json({message:"Cart not found"});
    }
    await Cart.deleteOne({_id:cartId});
    await Customer.findByIdAndUpdate(
      {userId},
      {cart:null},
      {new:true}
    )
  }catch(error){
    console.error("Error clearing cart:", error);
    return res.status(500).json({message:"Error clearing cart",error});
  }
}