const express = require("express");
const cors = require("cors");
//importing route of cyclecontroller
const cycleRoutes = require("./routes/cycle_route");
const path = require("path");

require("dotenv").config();
const app = express();
// Database Connection
require("./config/db");
// Middleware
app.use(cors());
app.use(express.json());
// Routes
const authRoutes = require("./routes/auth_route");
const healthRoutes = require("./routes/healthRoute");
app.use("/api/auth", authRoutes);
app.use("/api/cycle", cycleRoutes);
app.use("/api/health", healthRoutes);
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
