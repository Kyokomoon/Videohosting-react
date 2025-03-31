import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";
import "../VideoPlayer.css";
// Список смайликов
const emojis = ["😀", "😂", "😍", "😎", "👍", "❤️", "🔥", "🎉", "🤔", "👏"];

const VideoPlayer = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef(null);
  const authorResponses = [
    "Спасибо за ваш комментарий!",
    "Интересное замечание!",
    "Я учту это в следующих видео",
    "Спасибо за просмотр!",
    "Вы правы, это действительно важно",
    "Отличное наблюдение!",
    "Приятно слышать ваше мнение",
    "Спасибо за обратную связь!",
    "Рад, что вам понравилось!",
    "Буду рад новым предложениям"
  ];
  const insertEmoji = (emoji) => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const currentText = newMessage;
    
    setNewMessage(
      currentText.substring(0, startPos) + 
      emoji + 
      currentText.substring(endPos)
    );
    
    // Фокусируем обратно на textarea и устанавливаем позицию курсора
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = startPos + emoji.length;
      textarea.selectionEnd = startPos + emoji.length;
    }, 0);
  };
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
    // Сброс высоты textarea после отправки
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    // Имитация ответа
    setTimeout(() => {
      const randomResponse = authorResponses[Math.floor(Math.random() * authorResponses.length)];
      setMessages((prev) => [
        ...prev,
        { author: "Сергей", text: randomResponse },
      ]);
    }, 1000);
  };

  const handleTextareaChange = (e) => {
    setNewMessage(e.target.value);
    // Автоматическое увеличение высоты textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
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
          <div className="textarea-container">
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={handleTextareaChange}
              placeholder="Напишите сообщение..."
              className="chat-textarea"
              rows={1}
            />
            <button 
              type="button" 
              className="emoji-button"
              onClick={() => setShowEmojis(!showEmojis)}
            >
              🙂
            </button>
            
            {showEmojis && (
              <div className="emoji-picker">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    type="button"
                    className="emoji-option"
                    onClick={() => {
                      insertEmoji(emoji);
                      setShowEmojis(false);
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button type="submit" className="send-button">
            Отправить сообщение
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoPlayer;