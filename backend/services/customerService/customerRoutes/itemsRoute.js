import expess from "express";
import { getItemByCategory,getItemById } from "../customerControllers/productController.js";


const router = expess.Router();

router.get("/getItemsByCategory", getItemByCategory);
router.get("/:id", getItemById);

export default router;