import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import userRoutes from "./routes/user.route.js";
import taskRoutes from "./routes/task.route.js";
import cookieParser from "cookie-parser";

dotenv.config(); // Make sure environment variables are loaded

const app = express();

// Middlewares 

app.use(cors({
    origin: "http://localhost:3001", 
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);

// Database connection + server start
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit if DB connection fails
  });