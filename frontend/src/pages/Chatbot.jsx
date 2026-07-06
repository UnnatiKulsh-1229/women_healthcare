import { useState } from "react";
import "../style/Chatbot.css";
import axios from "axios";
function Chatbot() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I'm your AI Women's Health Assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
  if (!input.trim() || loading) return;
  const userMessage = input;
  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userMessage,
    },
  ]);
  setInput("");
  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:5000/api/ai/chat",
      {
        message: userMessage,
      }
    );
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: response.data.reply,
      },
    ]);
  } catch (error) {
    console.error(error);
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "⚠️ Sorry, something went wrong. Please try again.",
      },
    ]);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="chat-page">

      <div className="chat-header">
        🤖 AI Women's Health Assistant
      </div>

      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "message user"
                : "message bot"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>
        {loading && (
  <div className="message bot">
    🤖 Thinking...
  </div>
)}
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage} disabled={loading}>
  {loading ? "Sending..." : "Send"}
</button>
      </div>

    </div>
  );
}

export default Chatbot;