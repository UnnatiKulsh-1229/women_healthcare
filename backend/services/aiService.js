const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askGroq = async (message, userProfile) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
  role: "system",
  content: `You are an AI Women's Healthcare Assistant.

The following is the user's menstrual cycle information.

${userProfile}

Instructions:
- Personalize your answers using this information whenever relevant.
- If the question is unrelated to the cycle, answer normally.
- Never claim to diagnose diseases.
- Recommend seeing a doctor if symptoms are severe, persistent, or concerning.
- Be supportive, clear, and easy to understand.`
},
{
  role: "user",
  content: message
}
      ]
    });

    return completion.choices[0].message.content;

  } catch (error) {
    console.error("Groq SDK Error:", error);
    throw error;
  }
};

module.exports = askGroq;