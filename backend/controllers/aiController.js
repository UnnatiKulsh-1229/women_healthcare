const db = require("../config/db");
const askGroq = require("../services/aiService");

const chatWithAI = async (req, res) => {
  try {
    const { message, user_email } = req.body;
    db.query(
  "INSERT INTO chat_history (user_email, role, message) VALUES (?, ?, ?)",
  [user_email, "user", message],
  (err) => {
    if (err) {
      console.log("Error saving user message:", err);
    }
  }
);

    db.query(
      "SELECT * FROM cycle_records WHERE user_email = ? ORDER BY created_at DESC LIMIT 1",
      [user_email],
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        let userProfile = "No cycle information available.";

        if (result.length > 0) {
          const cycle = result[0];

          userProfile = `
User Cycle Information

Last Period: ${cycle.last_period}
Cycle Length: ${cycle.cycle_length} days
Next Period: ${cycle.next_period}
Ovulation Day: ${cycle.ovulation_day}
Fertile Window: ${cycle.fertile_start} to ${cycle.fertile_end}
Current Cycle Status: ${cycle.cycle_status}
`;
        }

        const reply = await askGroq(message, userProfile);
        db.query(
  "INSERT INTO chat_history (user_email, role, message) VALUES (?, ?, ?)",
  [user_email, "assistant", reply],
  (err) => {
    if (err) {
      console.log("Error saving AI reply:", err);
    }
  }
);

        res.json({
          success: true,
          reply,
        });
      }
    );
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getChatHistory = (req, res) => {
  const { user_email } = req.params;

  db.query(
    `SELECT role, message
     FROM chat_history
     WHERE user_email = ?
     ORDER BY created_at ASC`,
    [user_email],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.json({
        success: true,
        history: result,
      });
    }
  );
};

module.exports = {
  chatWithAI,
  getChatHistory,
};