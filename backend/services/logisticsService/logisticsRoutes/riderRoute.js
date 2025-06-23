import express from 'express';
import { riderSignup, riderLogin, riderDeliveryAccept, riderDeliveryPickup, riderDeliveryComplete } from '../logisticsControllers/riderController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/riderSignup",riderSignup);
router.post("/riderLogin",riderLogin);
router.post("/acceptDelivery",authenticateToken,riderDeliveryAccept);
router.post("/pickupDelivery",authenticateToken,riderDeliveryPickup);
router.post("/completeDelivery",authenticateToken,riderDeliveryComplete);

export default router;