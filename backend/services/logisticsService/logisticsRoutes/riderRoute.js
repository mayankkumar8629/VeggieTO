import express from 'express';
import { riderSignup, riderLogin,getOngoingDeliveries,getAllCompletedDeliveries, riderDeliveryAccept, riderDeliveryPickup, riderDeliveryComplete } from '../logisticsControllers/riderController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/riderSignup",riderSignup);
router.post("/riderLogin",riderLogin);
router.get("/ongoingDeliveries",authenticateToken,getOngoingDeliveries);
router.get("/completedDeliveries",authenticateToken,getAllCompletedDeliveries);
router.post("/acceptDelivery",authenticateToken,riderDeliveryAccept);
router.post("/pickupDelivery",authenticateToken,riderDeliveryPickup);
router.post("/completeDelivery",authenticateToken,riderDeliveryComplete);

export default router;