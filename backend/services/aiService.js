const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askGroq = async (prompt, chatHistory) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a helpful women's healthcare assistant."
      },

      ...chatHistory,

      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content;
};
module.exports = askGroq;