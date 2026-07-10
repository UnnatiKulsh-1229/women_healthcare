const express = require("express");
const router = express.Router();

const {
    getMoodAnalysis
} = require("../controllers/analysisController");

router.get("/mood/:email", getMoodAnalysis);

module.exports = router;