import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import redis from "./utils/redis.js";
import authRoutes from "./customerRoutes/authRoute.js";
import itemsRoutes from "./customerRoutes/itemsRoute.js";


dotenv.config({path:"../../.env"});
import connectDB from "../../config/db.js";

connectDB();
redis.client.ping()
  .then(() => console.log('✅ Redis connected successfully'))
  .catch(err => console.error('❌ Redis connection failed:', err));

const app=express();
const PORT = 5001;
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


app.use("/customer",authRoutes);
app.use("/api/items",itemsRoutes);

app.listen(PORT,()=>{
    console.log(`CUSTOMER SERIVCE IS RUNNING ON PORT ${PORT}`);
})