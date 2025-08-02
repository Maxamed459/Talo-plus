import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connection successfully");
  } catch (error) {
    console.log("Error at connection: ", error);
  }
};

export default connectDB;
