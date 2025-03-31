import React, { useState } from "react";
import axios from "axios";
import "../VideoUpload.css";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video_file", videoFile);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      setUploadStatus({
        success: true,
        message: "Video uploaded successfully!",
      });
      console.log("Video uploaded successfully", response.data);

      // Reset form after successful upload
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setUploadProgress(0);
    } catch (error) {
      setUploadStatus({
        success: false,
        message: "Upload failed. Please try again.",
      });
      console.error("Video upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Загрузите ваше видео</h2>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">Название видео</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Напишите название вашего видео"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Расскажите зрителям о вашем видео"
              required
              className="form-textarea"
              rows="4"
            ></textarea>
          </div>

          <div className="form-group file-upload-group">
            <label htmlFor="video-upload" className="file-upload-label">
              {videoFile ? (
                <>
                  <span className="file-name">{videoFile.name}</span>
                  <span className="file-change">Изменить файл</span>
                </>
              ) : (
                <>
                  <svg className="upload-icon" viewBox="0 0 24 24">
                    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                  </svg>
                  <span>Выберите видео файл</span>
                </>
              )}
            </label>
            <input
              id="video-upload"
              type="file"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
              accept="video/*"
              className="file-input"
            />
          </div>

          {isUploading && (
            <div className="progress-container">
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <span className="progress-text">{uploadProgress}%</span>
            </div>
          )}

          {uploadStatus && (
            <div
              className={`status-message ${
                uploadStatus.success ? "success" : "error"
              }`}
            >
              {uploadStatus.message}
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isUploading}
          >
            {isUploading ? "Загрузка..." : "Загрузить видео"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;
