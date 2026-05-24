import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

const start = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/zoom";
    if (!process.env.MONGODB_URI) {
      console.warn("MONGODB_URI not set, using local default mongodb://127.0.0.1:27017/zoom");
    }

    const connectionDb = await mongoose.connect(mongoUri);
    console.log(`MONGO connected host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () => {
      console.log(`Listening on port ${app.get("port")}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

start();
