import express from "express";
import { placeOrder } from "../customerControllers/orderController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router=express.Router();

router.post("/placeOrder/:cartId",authenticateToken,placeOrder);

export default router;