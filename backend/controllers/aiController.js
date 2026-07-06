const askGroq = require("../services/aiService");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await askGroq(message);

    res.json({
      success: true,
      reply,
    });

  } catch (err) {
  console.error("Groq Error:", err);

  res.status(500).json({
    success: false,
    message: err.message,
  });
}
};

module.exports = {
  chatWithAI,
};