import { useState,useEffect } from "react";
import "../style/Chatbot.css";
import axios from "axios";
function Chatbot() {
  const userEmail = localStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I'm your AI Women's Health Assistant. How can I help you today?",
    },
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
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
  //setInput("");
  //setSelectedFile(null);
  setLoading(true);
  try {
    const formData = new FormData();

formData.append("message", userMessage);
formData.append("user_email", userEmail);

if (selectedFile) {
  formData.append("file", selectedFile);
}
console.log(selectedFile);

for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
const response = await axios.post(
  "http://localhost:5000/api/ai/chat",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);
setInput("");
setSelectedFile(null);
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
const fetchHistory = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/ai/history/${userEmail}`
    );

    if (response.data.success) {
      const history = response.data.history.map((chat) => ({
        sender: chat.role === "user" ? "user" : "bot",
        text: chat.message,
      }));

      if (history.length > 0) {
        setMessages(history);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchHistory();
}, []);
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
<input
  type="file"
  accept=".pdf,.docx,.jpg,.jpeg,.png"
  onChange={(e) => setSelectedFile(e.target.files[0])}
/>
{selectedFile && (
  <p>📎 {selectedFile.name}</p>
)}
      </div>

    </div>
    
  );
}

export default Chatbot;