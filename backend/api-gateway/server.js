import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import connectDB from "../config/db.js";

//importing all the routes
import authRoutes from "./routes/authRoutes.js";
import proxyRoutes from "./routes/proxyRoute.js";


dotenv.config({ path: "../.env" });
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/api", authRoutes);
app.use("/api", proxyRoutes);




app.listen(PORT, () =>
  console.log(`API Gateway listening on port ${PORT}`)
);