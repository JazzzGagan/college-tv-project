import axios from "axios";
import React, { useState, useEffect } from "react";

const ImageManager = () => {
  // Use backend keys for state keys: leftTop, leftBottom, rightTop, rightBottom
  const [images, setImages] = useState({
    leftTop: null,
    leftBottom: null,
    rightTop: null,
    rightBottom: null,
  });

  // Fetch current images from backend on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/images"); // Adjust endpoint if needed
        const data = res.data;

        setImages({
          leftTop: data.leftTop || null,
          leftBottom: data.leftBottom || null,
          rightTop: data.rightTop || null,
          rightBottom: data.rightBottom || null,
        });
      } catch (err) {
        console.error("Failed to load images", err);
      }
    };

    fetchImages();
  }, []);

  // Handle file input changes
  const handleFileChange = (key, file) => {
    setImages((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  // Save all images to backend
  const handleSave = async () => {
    const formData = new FormData();

    Object.entries(images).forEach(([key, file]) => {
      // Only append if file is a File object (not a string URL)
      if (file && typeof file !== "string") {
        console.log("Appending field:", key, file);
        formData.append(key, file);
      }
    });

    try {
      await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Images uploaded successfully!");

      // Optional: refresh images from backend after upload
      const res = await axios.post("http://localhost:3000/api/upload");
      const data = res.data;
      setImages({
        leftTop: data.leftTop || null,
        leftBottom: data.leftBottom || null,
        rightTop: data.rightTop || null,
        rightBottom: data.rightBottom || null,
      });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload images.");
    }
  };

  // Render a single image box with preview, upload, and delete buttons
  const renderImageBox = (label, key) => {
    const file = images[key];

    // Preview URL: If string, assume URL from backend; else createObjectURL for File object
    const preview =
      file && typeof file === "string"
        ? file
        : file
        ? URL.createObjectURL(file)
        : null;

    return (
      <div className="border-2 border-gray-300 rounded-xl p-6 text-center w-full bg-white shadow-md hover:shadow-lg transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">{label}</h3>

        <div className="w-full h-56 sm:h-64 md:h-72 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          {preview ? (
            <img
              src={preview}
              alt={label}
              className="w-full h-full object-cover rounded-lg"
              onLoad={() => {
                // Revoke object URL after image loads to free memory
                if (typeof file !== "string") URL.revokeObjectURL(preview);
              }}
            />
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                alt="placeholder"
                className="w-12 opacity-40 mb-2"
              />
              <p className="mt-1 text-sm text-gray-500">No image uploaded</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium">
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  handleFileChange(key, e.target.files[0]);
                }
              }}
            />
          </label>

          {preview && (
            <button
              onClick={() => handleFileChange(key, null)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="tab-content">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-1">
            Image Management
          </h2>
          <p className="text-sm text-gray-500">
            Upload and manage left and right side images (Top & Bottom)
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
        >
          💾 Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {renderImageBox("Left Top Image", "leftTop")}
        {renderImageBox("Left Bottom Image", "leftBottom")}
        {renderImageBox("Right Top Image", "rightTop")}
        {renderImageBox("Right Bottom Image", "rightBottom")}
      </div>
    </section>
  );
};

export default ImageManager;
