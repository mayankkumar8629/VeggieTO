import express from 'express';
import { riderSignup } from '../logisticsControllers/riderController.js';

const router=express.Router();

router.post("/riderSignup",riderSignup);

export default router;