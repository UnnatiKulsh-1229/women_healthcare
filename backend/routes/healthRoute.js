const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  uploadRecord,
  getHealthRecords,
  deleteRecord,
} = require("../controllers/health_Controller");
// Upload Health Record
router.post("/upload", upload.single("file"), uploadRecord);

// Get all health records of a user
router.get("/all/:email", getHealthRecords);
// Delete Health Record
router.delete("/delete/:id", deleteRecord);

module.exports = router;