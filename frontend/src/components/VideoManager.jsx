import React, { useState, useEffect } from "react";

const VideoManager = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/uploads/videos");
        const data = await res.json();
        const savedVideos = data.map((v) => ({ file: null, preview: v.url }));
        setVideos(savedVideos);
      } catch (err) {
        console.error("Failed to load videos", err);
      }
    };
    fetchVideos();
  }, []);

  // Handle new file uploads
  const handleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newVideos = uploadedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setVideos((prev) => [...prev, ...newVideos]);
  };

  // Delete video from state
  const handleDelete = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  // Save new videos to backend
  const handleSave = async () => {
    const newFiles = videos.filter((v) => v.file !== null);

    if (newFiles.length === 0) {
      alert("No new videos selected.");
      return;
    }

    try {
      for (const videoObj of newFiles) {
        const formData = new FormData();
        formData.append("file", videoObj.file);
        formData.append("title", "Main Video");

        const res = await fetch("http://localhost:3000/uploads", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log("Uploaded:", data);

        videoObj.preview = data.url;
        videoObj.file = null;
      }

      setVideos([...videos]);
      alert("Videos uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload videos.");
    }
  };

  return (
    <section className="tab-content">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-orange-600">Video Management</h2>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      <div className="mb-4">
        <input
          type="file"
          accept="video/*"
          multiple
          id="videoUpload"
          className="hidden"
          onChange={handleUpload}
        />

        <label
          htmlFor="videoUpload"
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
        >
          Choose Videos
        </label>
      </div>

      <div className="flex flex-col gap-4">
        {videos.map((vid, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 bg-gray-100 p-3 rounded shadow"
          >
            <video
              src={vid.preview}
              controls6
              className="w-[950px] h-[450px] border rounded"
            />
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoManager;
