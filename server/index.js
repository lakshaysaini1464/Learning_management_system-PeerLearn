import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";
import courseProgressRoute from "./routes/courseProgress.route.js";
import path from "path";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// ====== ✅ CORS Setup for Interview Demos ======
app.use(cors({
    origin: "*",            // Allow all origins for demo/interview
    credentials: true       // Allow sending cookies (optional)
}));

// Middleware
app.use(express.json());       // To parse JSON
app.use(cookieParser());       // To parse cookies

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

// ====== ✅ Serve Frontend (React Vite build) ======
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Test route
app.get("/home", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Hello, I am coming from the backend!",
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
