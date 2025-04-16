import express from "express";
import { signup } from "../logisticsControllers/authController.js";

const router=express.Router();

router.post("/signup",signup);

export default router;