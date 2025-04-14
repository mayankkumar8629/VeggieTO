import express from "express";
import { signup } from "../farmerControllers/authController.js";

const router=express.Router();

router.post("/signup",signup);

export default router;