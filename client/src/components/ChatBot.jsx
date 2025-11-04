import { useState } from "react";
import axios from "axios";

const PORT = import.meta.env.VITE_PORT;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || `http://localhost:${PORT}`;

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, sender: "user" }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const response = await axios.post(BACKEND_URL+"/chat", { message: input });
            setMessages([...newMessages, { text: response.data.reply, sender: "bot" }]);
        } catch (error) {
            console.error("Error:", error);
            setMessages([...newMessages, { text: "Error connecting to the chatbot.", sender: "bot" }]);
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center bg-blue-100">
      <div className="w-full h-[400px] max-w-lg bg-white rounded-lg shadow-lg flex flex-col">
        {/* Chat Header */}
        <div className="bg-blue-600 text-white text-lg font-bold py-3 px-4 rounded-t-lg">
          Edly Assistant
        </div>

        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 h-96">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-900 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="bg-gray-200 text-gray-900 p-3 rounded-lg self-start">Thinking...</div>}
        </div>

        {/* Chat Input */}
        <div className="flex p-3 border-t border-gray-300">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-600 w-28 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
    );
};

export default ChatBot;