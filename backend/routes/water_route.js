const express = require("express");
const router = express.Router();
const waterController = require("../controllers/WaterController");
router.post("/save", waterController.saveWater);
router.get("/today/:email/:date", waterController.getToday);
module.exports = router;