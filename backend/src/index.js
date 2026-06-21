import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// ---------------- MIDDLEWARE ----------------

// CORS FIX (IMPORTANT FOR PRODUCTION)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chat-app-frontend-k5z4.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Preflight requests fix
app.options("*", cors());

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// ---------------- ROUTES ----------------

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ---------------- SERVER ----------------

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});