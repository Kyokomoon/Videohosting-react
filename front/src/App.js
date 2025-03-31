import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import VideoList from "./components/VideoList";
import VideoPlayer from "./components/VideoPlayer";
import VideoUpload from "./components/VideoUpload";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("authToken") !== null;
  });

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="app">
      <Router>
        <header className="header">
          <div className="logo">
            <svg
              width="97"
              height="70"
              viewBox="0 0 97 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.8812 19.7437L29.2847 34.6222H46.4777L37.8812 19.7437Z"
                fill="white"
              />
              <path
                d="M22.247 0L11.0999 19.3185V34.6222H28.6235V19.224L39.7234 0H22.247Z"
                fill="white"
              />
              <path
                d="M47.1391 69.9526H66.741L47.1391 35.9917V69.9526Z"
                fill="white"
              />
              <path
                d="M28.6707 35.3304H11.0999V69.9526H28.6707V35.3304Z"
                fill="white"
              />
              <path
                d="M79.5411 35.3304C69.9999 35.3304 62.2064 43.124 62.2064 52.6651C62.2064 62.2063 69.9999 69.9998 79.5411 69.9998C89.0823 69.9998 96.8758 62.2063 96.8758 52.6651C96.8758 43.0767 89.1295 35.3304 79.5411 35.3304Z"
                fill="white"
              />
              <path
                d="M29.3322 35.3304V69.9526C38.8733 69.9526 46.6668 62.1591 46.6668 52.6179C46.6668 43.0767 38.8733 35.3304 29.3322 35.3304Z"
                fill="white"
              />
              <path
                d="M47.2808 34.6222H69.0082L49.1702 0.236206L38.3065 19.0824L47.2808 34.6222Z"
                fill="white"
              />
              <path
                d="M47.5642 35.3304L57.1999 52.0511C60.7896 50.9647 63.2458 47.6584 63.2458 43.8797C63.2458 39.1564 59.4198 35.3304 54.6965 35.3304H47.5642Z"
                fill="white"
              />
              <path d="M0 0L10.722 18.61L21.444 0H0Z" fill="white" />
            </svg>
          </div>
          <div className="header-nav">
            <HeaderButton path="/upload" text="Загрузить видео" />
            <HeaderButton path="/videos" text="Список видео" />
          </div>
          <div className="user-info">
            {isAuthenticated ? (
              <>
                <span className="username">User</span>
                <span className="logout-icon" onClick={handleLogout}>
                  Logout
                </span>
              </>
            ) : (
              <NavigateButton />
            )}
          </div>
        </header>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/videos" element={<VideoList />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/upload" element={<VideoUpload />} />
          {isAuthenticated && (
            <Route path="/upload" element={<VideoUpload />} />
          )}
          {isAuthenticated ? (
            <Route path="*" element={<Navigate to="/videos" />} />
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </div>
  );
};

const NavigateButton = () => {
  const navigate = useNavigate();
  return (
    <button className="register-btn" onClick={() => navigate("/register")}>
      Register
    </button>
  );
};

const HeaderButton = ({ path, text }) => {
  const navigate = useNavigate();
  return (
    <button className="header-btn" onClick={() => navigate(path)}>
      {text}
    </button>
  );
};

export default App;
