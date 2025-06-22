import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { initSocket } from "./config/websocket.js";
import {setupOrderListeners} from "./logisticsControllers/deliveryController.js";
import { activeConnections } from "./config/websocket.js";

import authRoute from "./logisticsRoutes/authRoute.js";
import riderRoute from "./logisticsRoutes/riderRoute.js";
import deliveryPartnerRoute from "./logisticsRoutes/deliveryPartnerRoute.js";

dotenv.config({path:"../../.env"});
import connectDB from "../../config/db.js";
connectDB();



const app=express();
const PORT = 5003;
const server = http.createServer(app);
initSocket(server);
setupOrderListeners();


app.use(
    cors({
      origin: [
        "http://localhost:5173"
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/active",(req,res)=>{
  console.log(activeConnections.riders);
  console.log(activeConnections.customers);
  return res.status(200).json({
    message:"Active riders",
    activeConnections
  })            
  
})
app.use("/logistics",authRoute);
app.use("/api/rider",riderRoute);
app.use("/api/delivery-partner",deliveryPartnerRoute);

server.listen(PORT,()=>{
    console.log(`LOGISTIC SERVICE IS RUNNING ON PORT ${PORT} HTTP + WEBSOCKET`);
})