const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysisController");
router.get("/mood/:email", analysisController.getMoodAnalysis);
router.get("/cycle/:email", analysisController.getCycleAnalysis);
router.get("/healthrecords/:email",analysisController.getHealthRecordAnalysis);
router.get("/insights/:email", analysisController.getAIInsights);
module.exports = router;