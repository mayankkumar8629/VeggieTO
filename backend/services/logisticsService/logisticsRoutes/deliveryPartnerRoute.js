import express from "express";
import {signup,login,acceptShipment,shipmentOnTheWay,orderDelivered} from "../logisticsControllers/deliveryPartner.controller.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("accept-shipment",authenticateToken,acceptShipment);
router.post("/shipment-on-the-way",authenticateToken,shipmentOnTheWay);
router.post("/order-delivered",authenticateToken,orderDelivered);

export default router;