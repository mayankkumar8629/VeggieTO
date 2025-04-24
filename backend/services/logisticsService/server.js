import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./logisticsRoutes/authRoute.js";
import riderRoute from "./logisticsRoutes/riderRoute.js";

dotenv.config({path:"../../.env"});
import connectDB from "../../config/db.js";
connectDB();



const app=express();
const PORT = 5003;

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


app.use("/logistics",authRoute);
app.use("/api/rider",riderRoute);

app.listen(PORT,()=>{
    console.log(`LOGISTIC SERVICE IS RUNNING ON PORT ${PORT}`);
})