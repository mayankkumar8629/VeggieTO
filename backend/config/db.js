// import mongoose from "mongoose";
// import dotenv from "dotenv";

// // Load environment variables from the .env file at the root
// dotenv.config({ path: "../.env" });


// console.log(process.env.MONGO_URI);
// const connectDB= async()=>{
//   try{
//     const mongoURI=process.env.MONGO_URI;

//     await mongoose.connect(mongoURI,{
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   }catch(error){
//     console.error('Error connecting to MONGODB:',error);
//     process.exit(1);
//   }
// };
// export default connectDB;
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../.env" });

// Connection settings
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,  // 30 seconds connection timeout
  socketTimeoutMS: 45000,   // 45 seconds socket timeout
  maxPoolSize: 10,          // Maximum number of connections
  retryWrites: true,
  w: 'majority'
};

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, connectionOptions);
    isConnected = true;
    console.log('MongoDB connected successfully');
    
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
      isConnected = false;
    });
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

// Utility function for transactions
export const runTransaction = async (transactionFn) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const result = await transactionFn(session);
    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export default connectDB;