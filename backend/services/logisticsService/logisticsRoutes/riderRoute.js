import express from 'express';
import { riderSignup ,riderLogin} from '../logisticsControllers/riderController.js';

const router=express.Router();

router.post("/riderSignup",riderSignup);
router.post("/riderLogin",riderLogin);

export default router;