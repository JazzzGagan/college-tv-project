import axios from "axios";
import React, { useState, useEffect } from "react";

const VideoManager = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // message state as { type, text }
  const [message, setMessage] = useState({ type: "", text: "" });

  // showMessage accepts type and text
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/video");
        if (res.data?.videoUrl) {
          setPreviewUrl(res.data.videoUrl);
        }
      } catch (err) {
        console.error("Failed to fetch video", err);
        showMessage("error", "Failed to load video");
      }
    };
    fetchVideo();
  }, []);

  const handleUpload = async () => {
    if (!selectedVideo) {
      showMessage("error", " No video selected");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedVideo);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/upload-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percent);
          },
        }
      );

      setPreviewUrl(res.data.videoUrl);
      setSelectedVideo(null);
      setUploadProgress(0);

      showMessage("success", "✅ Video uploaded successfully!");
    } catch (err) {
      console.error(err);
      showMessage("error", "Upload failed!");
      setUploadProgress(0);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:3000/api/video");

      setPreviewUrl("");
      setSelectedVideo(null);

      showMessage("success", " Video deleted successfully!");
    } catch (err) {
      console.error(err);
      showMessage("error", "Failed to delete video");
    }
  };

  return (
    <section className="tab-content">
      {/* Global message bar with dynamic bg */}
      {message.text && (
        <div
          className={`mb-4 p-2 rounded-lg text-white text-center ${
            message.type === "error" ? "bg-red-500" : "bg-green-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-1">
            Video Management
          </h2>
          <p className="text-sm text-gray-500">Upload and manage video content</p>
        </div>

        <div className="flex items-center gap-4">
          {uploadProgress > 0 && (
            <div className="flex flex-col items-end">
              <div className="w-64 bg-gray-200 rounded-full h-2.5 shadow-inner">
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="text-xs mt-1 text-gray-600 font-medium">
                {uploadProgress}% uploaded
              </span>
            </div>
          )}

          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
          >
            💾 Save Changes
          </button>
        </div>
      </div>

      {/* Choose file */}
      <div className="mb-6">
        <input
          type="file"
          accept="video/*"
          id="videoUpload"
          className="hidden"
          onChange={(e) => setSelectedVideo(e.target.files[0])}
        />

        <label
          htmlFor="videoUpload"
          className="inline-block bg-gray-500 text-white px-5 py-2.5 rounded-lg cursor-pointer hover:bg-gray-600 shadow-md hover:shadow-lg font-medium"
        >
          📁 Choose Video
        </label>
      </div>

      {/* Preview Section */}
      {(selectedVideo || previewUrl) && (
        <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
          <video
            src={selectedVideo ? URL.createObjectURL(selectedVideo) : previewUrl}
            controls
            className="w-full max-w-4xl h-auto border-2 border-gray-300 rounded-lg shadow-sm"
          />

          {/* Remove selected video */}
          {selectedVideo && (
            <button
              onClick={() => setSelectedVideo(null)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-sm hover:shadow-md font-medium self-start"
            >
              Remove Selected Video
            </button>
          )}

          {/* Delete backend video */}
          {previewUrl && !selectedVideo && (
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-sm hover:shadow-md font-medium self-start"
            >
              Delete Video
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default VideoManager;
