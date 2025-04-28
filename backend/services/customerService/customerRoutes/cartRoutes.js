import express from 'express';
import { addCartItem,updateCartItem ,removeCartItem,getCart,testSession} from '../customerControllers/cartController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getCart",authenticateToken,getCart);
router.post("/addNewItem",authenticateToken,addCartItem);
router.patch("/updateItem",authenticateToken,updateCartItem);
router.delete("/deleteItem",authenticateToken,removeCartItem);
router.get("/test",authenticateToken,testSession)

export default router;