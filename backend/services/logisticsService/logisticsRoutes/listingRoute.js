import express from "express";
import { actionOnProductListing } from "../logisticsControllers/listingControllers";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/action",authenticateToken,actionOnProductListing);

export default router;