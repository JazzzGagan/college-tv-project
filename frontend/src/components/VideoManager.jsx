import axios from "axios";
import React, { useState, useEffect } from "react";

const VideoManager = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");

  console.log("test", selectedVideo);

  const handleUpload = async () => {
    if (!selectedVideo) {
      alert("No video selected");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedVideo);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload-video",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
          },
        }
      );
      console.log(response.data);

      setPreviewUrl(response.data.videoUrl);

      setUploadProgress(0);
      alert("Video uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
      setUploadProgress(0);
    }
  };
  return (
    <section className="tab-content">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-1">Video Management</h2>
          <p className="text-sm text-gray-500">Upload and manage video content</p>
        </div>

        <div className="flex items-center gap-4">
          {uploadProgress > 0 && (
            <div className="flex flex-col items-end">
              <div className="w-64 bg-gray-200 rounded-full h-2.5 shadow-inner">
                <div
                  className="bg-green-600 h-2.5 rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className="text-xs text-gray-600 mt-1 font-medium">{uploadProgress}% uploaded</span>
            </div>
          )}
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
          >
            💾 Save Changes
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="file"
          accept="video/*"
          multiple
          id="videoUpload"
          className="hidden"
          onChange={(e) => setSelectedVideo(e.target.files[0])}
        />

        <label
          htmlFor="videoUpload"
          className="inline-block bg-gray-500 text-white px-5 py-2.5 rounded-lg cursor-pointer hover:bg-gray-600 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          📁 Choose Video
        </label>
      </div>
      {selectedVideo && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200">
            <video
              src={URL.createObjectURL(selectedVideo)}
              controls
              className="w-full max-w-4xl h-auto border-2 border-gray-300 rounded-lg shadow-sm"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium self-start"
            >
              🗑️ Remove Video
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoManager;
