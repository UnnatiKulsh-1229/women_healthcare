const express = require("express");
const router = express.Router();
const {
    addCycleRecord,
    getLatestCycleRecord
} = require("../controllers/cycleControllers");
router.post("/add", addCycleRecord);
router.get("/latest/:email", getLatestCycleRecord);
module.exports = router;