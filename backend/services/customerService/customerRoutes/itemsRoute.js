import expess from "express";
import { getItemByCategory } from "../customerControllers/productController.js";


const router = expess.Router();

router.get("/getItemsByCategory", getItemByCategory);

export default router;