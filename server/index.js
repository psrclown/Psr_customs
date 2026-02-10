/**
 * PSR Customs - Backend Server
 * Main entry point for the Express API
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import routes
const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");
const serviceRoutes = require("./routes/services");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging (development)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "PSR Customs API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`🚗 PSR Customs API running on port ${PORT}`);
});
