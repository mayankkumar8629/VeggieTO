import express from "express";
import { placeOrder, verifyPayment,getAllOrders } from "../customerControllers/orderController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/getAllOrders", authenticateToken, getAllOrders);
router.post("/placeOrder/:cartId", authenticateToken, placeOrder);
router.post("/verifyPayment", authenticateToken, verifyPayment);

export default router;