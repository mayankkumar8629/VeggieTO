import express from "express";
import {getProfile, updateProfile} from "../customerControllers/profileController.js";
import {authenticateToken} from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/getProfile",authenticateToken, getProfile);
router.put("/updateProfile",authenticateToken, updateProfile);

export default router;