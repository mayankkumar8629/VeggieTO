import express from "express";
import { customer,farmer,logistics } from "../controllers/proxyController.js";

const router=express.Router();

router.use("/customer",customer);
router.use("/farmer",farmer);
router.use("/logistics",logistics);