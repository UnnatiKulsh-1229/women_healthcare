const express = require("express");
const router = express.Router();

const {
  chatWithAI,
  getChatHistory,
} = require("../controllers/aiController");

router.post("/chat", chatWithAI);

router.get("/history/:user_email", getChatHistory);

module.exports = router;