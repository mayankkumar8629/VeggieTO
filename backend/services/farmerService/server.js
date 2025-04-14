import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({path:"../../.env"});
import connectDB from "../../config/db.js";
connectDB();

const app=express();
const PORT = 5002;

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

app.listen(PORT,()=>{
    console.log(`FARMER SERVICE IS RUNNING ON PORT ${PORT}`);
})