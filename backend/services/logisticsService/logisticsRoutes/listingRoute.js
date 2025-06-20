import express from "express";
import { actionOnProductListing } from "../logisticsControllers/listingControllers";

const router = express.Router();

router.post("/action",actionOnProductListing);

export default router;