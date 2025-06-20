import express from "express";
import { getProfile,updateProfile } from "../farmerControllers/profileController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js";

const router= express.Router();

router.get("/getProfile",authenticateToken,getProfile);
router.put("/updateProfile",updateProfile);

export default router;