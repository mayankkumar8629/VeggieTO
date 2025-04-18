import expess from "express";
import { getItemByCategory,getItemById,searchItems } from "../customerControllers/productController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";


const router = expess.Router();

router.get("/getItemsByCategory",authenticateToken, getItemByCategory);
router.get("/getItemsByCategory/:id", authenticateToken,getItemById);
router.get("/search",authenticateToken,searchItems);

export default router;