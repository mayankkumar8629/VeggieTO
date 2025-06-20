import express from "express";
import {createListing,getAllListings} from "../farmerControllers/listingController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getListing",getAllListings);
router.post("/createListing",authenticateToken,createListing);

export default router;
