
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const hotelRoutes = require("./routes/hotelRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Hotel Booking System API!",
        status: "Backend is running successfully"
    });
});

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Hotel Booking API is working!"
    });
});

// Hotel API routes
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });
