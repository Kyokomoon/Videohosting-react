import React from "react";
import "../ChatMessage.css";

const ChatMessage = ({ author, text }) => {
  return (
    <div
      className={`chat-message ${
        author === "Вы" ? "own-message" : "other-message"
      }`}
    >
      <strong>{author}: </strong>
      <span>{text}</span>
    </div>
  );
};

export default ChatMessage;
