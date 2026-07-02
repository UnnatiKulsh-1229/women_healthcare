const express = require("express");

const router = express.Router();

const { addCycleRecord } = require("../controllers/cycleControllers");

router.post("/add", addCycleRecord);

module.exports = router;