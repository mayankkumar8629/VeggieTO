import express from 'express';
import { addCartItem } from '../customerControllers/cartController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addNewItem",authenticateToken,addCartItem);

export default router;