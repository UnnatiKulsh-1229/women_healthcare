
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
// Routes
require("dotenv").config();
// Database Connection
require("./config/db");
// Middleware
app.use(cors());
const authRoutes = require("./routes/auth_route");
const healthRoutes = require("./routes/healthRoute");
const waterRoutes = require("./routes/water_route");
const cycleRoutes = require("./routes/cycle_route");
const moodRoutes=require("./routes/Mood_route");
const aiRoutes=new require("./routes/ai_route");
app.use("/api/auth", authRoutes);
app.use("/api/cycle", cycleRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/mood",moodRoutes);
app.use("/api/ai",aiRoutes);
// Home Route
app.get("/", (req, res) => {
    res.send("Server Running");
});
// Test Route
app.get("/test", (req, res) => {
    res.json({
        message: "Database Connected Successfully"
    });
});
const PORT = process.env.PORT || 5000;
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
