import mongoose from "mongoose";
import { configDotenv } from "dotenv";

// Load environment variables from the .env file at the root
configDotenv({ path: "../.env" });

const MONGO_URI = process.env.MONGO_URI;

console.log(MONGO_URI);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
  .then(() => console.log(`✅ MongoDB Connected`))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

export default mongoose;
