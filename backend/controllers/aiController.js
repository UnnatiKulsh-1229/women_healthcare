const db = require("../config/db");
const askGroq = require("../services/aiService");

// ================= CHAT WITH AI =================
const chatWithAI = async (req, res) => {
  try {
    const { message, user_email } = req.body;

    // Save user message
    db.query(
      "INSERT INTO chat_history (user_email, role, message) VALUES (?, ?, ?)",
      [user_email, "user", message],
      (err) => {
        if (err) {
          console.log("Error saving user message:", err);
        }
      }
    );

    // Fetch latest cycle info
    db.query(
      "SELECT * FROM cycle_records WHERE user_email=? ORDER BY created_at DESC LIMIT 1",
      [user_email],
      async (err, result) => {
        if (err) {
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

        // Fetch last 10 chat messages
        db.query(
          `SELECT role, message
           FROM chat_history
           WHERE user_email=?
           ORDER BY created_at DESC
           LIMIT 10`,
          [user_email],
          async (err, history) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message,
              });
            }

            const chatHistory = history
              .reverse()
              .map((chat) => ({
                role: chat.role,
                content: chat.message,
              }));

            const reply = await askGroq(
              message,
              userProfile,
              chatHistory
            );

            // Save AI reply
            db.query(
              "INSERT INTO chat_history(user_email, role, message) VALUES (?, ?, ?)",
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

// ================= GET CHAT HISTORY =================
const getChatHistory = (req, res) => {
  const { user_email } = req.params;

  db.query(
    `SELECT role, message
     FROM chat_history
     WHERE user_email=?
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