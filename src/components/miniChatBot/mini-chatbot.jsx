import React, { useState } from "react";
import "./style.css";
import { openaiCall } from "./openIA-API";

export const MiniChatBot = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("Hola, que tal...");
  const [resMessage, setResMessage] = useState("Hola soy Tu Chat Bot...");

  const handleMessage = async () => {
    if (!inputMessage.trim()) return;

    const messageUser = { role: "user", content: inputMessage };
    setMessages((prevMessages) => [...prevMessages, messageUser]);
    setUserMessage(inputMessage);
    setInputMessage("");
    try {
      // 👇 Espera la promesa
      const res = await openaiCall([...messages, messageUser]);

      const messageBot = { role: "assistant", content: res };
      setResMessage(res);
      setMessages((prevMessages) => [...prevMessages, messageBot]);
    } catch (error) {
      console.error("Error con OpenAI:", error);
    }
  };

  return (
    <div className="gadget-chat">
      <p className="title-gadget">Chat</p>
      <div className="messages-box">
        <div className="message-box user-chat-box">
          <div className="user-message">
            <p>{userMessage}</p>
          </div>
        </div>
        <div className="message-box bot-chat-box">
          <div className="chatbot-message">
            <p>{resMessage}</p>
          </div>
        </div>
      </div>
      <form className="form-chat" action={handleMessage}>
        <input
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          type="text"
          name=""
          value={inputMessage}
          id=""
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
