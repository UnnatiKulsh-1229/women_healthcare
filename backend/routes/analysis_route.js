const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysisController");
router.get("/mood/:email", analysisController.getMoodAnalysis);

module.exports = router;