import express from "express";
import {createListing,getAllListings} from "../farmerControllers/listingController.js";

const router = express.Router();

router.get("/getListing",getAllListings);
router.post("/createListing",createListing);

export default router;
