const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askGroq = async (message, userProfile,chatHistory) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
  {
    role: "system",
    content: `You are a helpful women's healthcare assistant.

${userProfile}

Use the user's cycle information whenever relevant.
`
  },

  ...chatHistory,

  {
    role: "user",
    content: message,
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