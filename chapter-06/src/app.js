import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import musicRoutes from "./routes/music.route.js";

// initializing express app
const app = express();

// configuring middleware
app.use(express.json());
app.use(cookieParser());

// configuring routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/artist", musicRoutes);

export default app;
