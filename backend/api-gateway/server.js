import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import connectDB from "../config/db.js";


dotenv.config({path:"../.env"});
connectDB();

const app=express();
const PORT=process.env.PORT || 3000;


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
app.use(express.urlencoded({extended:true}));



//importing the routes


//connection with the database




app.listen(PORT, ()=>
    console.log(`API Gateway listening on port ${PORT}`)
);