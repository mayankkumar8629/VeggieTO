import express from 'express';
import { addCartItem,updateCartItem } from '../customerControllers/cartController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addNewItem",authenticateToken,addCartItem);
router.patch("/updateItem",authenticateToken,updateCartItem);

export default router;