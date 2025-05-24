import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({path:"../../.env"})
// dotenv.config({path:"../../../.env"});

export const authenticateToken =async (req, res, next) => {
    // Extract token from the Authorization header (format: "Bearer <token>")
   
    const authHeader = await req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
  
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      // Attach the decoded token (user info) to req.user
      req.user = user;
      console.log("successfull");
      next();
    });
};