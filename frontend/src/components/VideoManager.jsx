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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-red-600">Video Management</h2>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
        {uploadProgress > 0 && (
          <div
            style={{ marginTop: "10px", width: "300px", background: "#eee" }}
          >
            <div
              style={{
                width: `${uploadProgress}%`,
                height: "10px",
                background: "green",
              }}
            />
            <span>{uploadProgress}%</span>
          </div>
        )}
      </div>

      <div className="mb-4">
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
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
        >
          Choose Videos
        </label>
      </div>
      {selectedVideo && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 bg-gray-100 p-3 rounded shadow">
            <video
              src={URL.createObjectURL(selectedVideo)}
              controls
            
              className="w-[950px] h-[450px] border rounded"
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoManager;
