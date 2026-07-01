const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Database Connection
require("./config/db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth_route");

app.use("/api/auth", authRoutes);

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

app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});
