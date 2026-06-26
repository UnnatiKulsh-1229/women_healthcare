const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Server Running");
});

// Test Route (Step 11)
app.get("/test", (req, res) => {
    res.json({
        message: "Database Connected"
    });
});

app.listen(5000, () => {
    console.log("Server Started");
});