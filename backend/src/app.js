import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";



const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(express.json({limit:"40kb"}));  
app.use(express.urlencoded({ limit:"40kb", extended: true }));


app.use("/api/v1/users", userRoutes);

const start = async () => {
  app.set("mongo_user");
  try {
    const connectionDb = await mongoose.connect(
      "mongodb://RahulDora:Rahuldora123@ac-jdtfvyb-shard-00-00.n5ztnbj.mongodb.net:27017,ac-jdtfvyb-shard-00-01.n5ztnbj.mongodb.net:27017,ac-jdtfvyb-shard-00-02.n5ztnbj.mongodb.net:27017/?replicaSet=atlas-w8sd2h-shard-0&ssl=true&authSource=admin",
    );
    console.log(`MongoDB connected: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log("Server is running on port " + app.get("port"));
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
