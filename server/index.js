import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from"./routes/courseProgress.route.js";
dotenv.config(); // Load environment variables

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set
const CLIENT_URL = "http://localhost:5173"; // Frontend URL

// Middleware
app.use(cors({
    origin: CLIENT_URL,
    credentials: true, // Allow credentials (cookies, auth headers)
}));
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase",purchaseRoute)
app.use("/api/v1/progress",courseProgressRoute)

// Test Route
app.get("/home", (_, res) => {
    res.status(200).json({
        success: true,
        message: "Hello, I am coming from the backend!",
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
