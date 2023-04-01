import mongoose from "mongoose";
import { app } from "./app";
import * as dotenv from "dotenv";

dotenv.config();
const start = async () => {
  console.log("Starting Up...");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.AUTH_SRV_PORT) {
    throw new Error("AUTH_SRV_PORT must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");
  } catch (err) {
    console.log(err);
  }

  app.listen(process.env.AUTH_SRV_PORT, () => {
    console.log("Auth Service Listening on PORT:", process.env.AUTH_SRV_PORT);
  });
};
start();
