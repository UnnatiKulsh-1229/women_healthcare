const db = require("../config/db");
const askGroq = require("../services/aiService");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const Tesseract = require("tesseract.js");
const today = new Date().toDateString();
//  CHAT WITH AI 
const chatWithAI = async (req, res) => {
  
  try {
    const { message, user_email } = req.body;
     let extractedText = "";

if (req.file) {
  const filePath = req.file.path;

  if (req.file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    extractedText = pdfData.text;
  }

  console.log("Extracted Text:");
  console.log(extractedText);
}
    console.log("Message:", message);
    console.log("User:", user_email);
    if (req.file) {
      console.log("Uploaded File:");
      console.log(req.file);
    } else {
      console.log("No file uploaded.");
    }

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
              const finalPrompt = `
              today's date is ${today}.
User Cycle Information:
${userProfile}

Uploaded Medical Report:
${extractedText || "No report uploaded"}

User Question:
${message}

Instructions:
- Today's date is ${today}. Use it for all date-related reasoning.
- Explain in simple language.
- Use the uploaded report if available.
- Never diagnose diseases.
- Recommend consulting a doctor when appropriate.
`;

console.log("FINAL PROMPT:");
console.log(finalPrompt);
console.log("==========");
  const reply = await askGroq(
    finalPrompt,
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

//  GET CHAT HISTORY 
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