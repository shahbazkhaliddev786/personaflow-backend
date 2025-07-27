import dotenv from "dotenv";
dotenv.config(); //
import mongoose from "mongoose";
console.log("Connecting to MongoDB...", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Connection Failed ❌", err);
    process.exit(1);
  }
};

export default connectDB;
