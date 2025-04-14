import express from "express";
import { signup } from "../customerControllers/authController.js";

const router=express.Router();

router.post("/signup",signup);

export default router;