import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import "../VideoPlayer.css";

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/videos/${id}/`
        );
        setVideo(response.data);
      } catch (error) {
        console.error("Failed to fetch video", error);
      }
    };

    fetchVideo();

    // Имитация получения сообщений чата
    const demoMessages = [
      { author: "Леха Куст", text: "Привет я твой единственный зритель" },
      { author: "Витя Трактор", text: "Ну и зачем ты это выложил?" },
      { author: "Анатолий Жмяков", text: "Удаляй!" },
      { author: "Dima_2015", text: "Лайк!" },
      { author: "Ndsdd", text: "KEKW" },
      { author: "Андрей Виралес", text: "КТО" },
      { author: "Аноним", text: "Ахахахахах" },
      { author: "Анна", text: "42 42 42 42 42" },
      { author: "Okkkew", text: "LOL!!!" },
      { author: "qwertty123", text: "Тут кто то есть ?" },
    ];
    setMessages(demoMessages);
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      author: "Вы",
      text: newMessage,
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Имитация ответа
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { author: "Женя", text: "Спасибо за сообщение!" },
      ]);
    }, 1000);
  };

  if (!video) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="video-page-container">
      <div className="video-container">
        <h2 className="video-title">{video.title}</h2>
        <div className="video-wrapper">
          <video controls className="video-player">
            <source src={video.video_file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <p className="video-description">{video.description}</p>
      </div>

      <div className="chat-container">
        <div className="chat-header">Чат</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} author={msg.author} text={msg.text} />
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Напишите сообщение..."
            className="chat-input"
          />
          <button type="submit" className="send-button">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoPlayer;
