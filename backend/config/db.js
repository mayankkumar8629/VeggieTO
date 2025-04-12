import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from the .env file at the root
dotenv.config({ path: "../.env" });



const connectDB= async()=>{
  try{
    const mongoURI=process.env.MONGO_URI;

    await mongoose.connect(mongoURI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  }catch(error){
    console.error('Error connecting to MONGODB:',error);
    process.exit(1);
  }
};
export default connectDB;