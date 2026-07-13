const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  chatWithAI,
  getChatHistory,
} = require("../controllers/aiController");
router.post("/chat", upload.single("file"), chatWithAI);
router.get("/history/:user_email", getChatHistory);

module.exports = router;