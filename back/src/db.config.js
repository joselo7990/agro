import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error al conectar a MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
