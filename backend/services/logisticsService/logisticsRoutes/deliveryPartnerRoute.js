import express from "express";
import {signup,login,acceptShipment,shipmentOnTheWay,orderDelivered} from "../logisticsControllers/deliveryPartner.controller.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("accept-shipment",acceptShipment);
router.post("/shipment-on-the-way",shipmentOnTheWay);
router.post("/order-delivered",orderDelivered);

export default router;