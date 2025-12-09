import axios from "axios";
import React, { useState, useEffect } from "react";

const ImageManager = () => {
  const [images, setImages] = useState({
    leftTop: null,
    leftBottom: null,
    rightTop: null,
    rightBottom: null,
  });

  // Message state for success/error messages
  const [message, setMessage] = useState({ type: "", text: "" });

  // Show message with type (success or error)
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  // Fetch current images from backend on component mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/all-images");
        const data = res.data;

        console.log("Fetched images:", data);

        const imgs = data.images;
        if (
          !imgs.leftTop?.length ||
          !imgs.leftBottom?.length ||
          !imgs.rightTop?.length ||
          !imgs.rightBottom?.length
        ) {
          showMessage("error", "Failed to load images.");
        }

        setImages({
          leftTop: data.images.leftTop[data.images.leftTop.length - 1] || null,
          leftBottom:
            data.images.leftBottom[data.images.leftBottom.length - 1] || null,
          rightTop:
            data.images.rightTop[data.images.rightTop.length - 1] || null,
          rightBottom:
            data.images.rightBottom[data.images.rightBottom.length - 1] || null,
        });
      } catch (err) {
        showMessage("error", "Failed to load images");
        console.error(err);
      }
    };

    fetchImages();
  }, []);

  // Handle file input change
  const handleFileChange = (key, file) => {
    setImages((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  // Save updated images to backend
  const handleSave = async () => {
    const anyMissing = Object.values(images).some((img) => !img);

    if (anyMissing) {
      showMessage("error", "Please upload all images before saving.");
      return; // prevent uploading
    }
    const formData = new FormData();

    Object.entries(images).forEach(([key, file]) => {
      if (file && typeof file !== "string") {
        formData.append(key, file);
      }
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      showMessage("success", " Images uploaded successfully!");
      const data = res.data;

      // Update images state with latest returned images
      setImages({
        leftTop: data.images.leftTop[data.images.leftTop.length - 1] || null,
        leftBottom:
          data.images.leftBottom[data.images.leftBottom.length - 1] || null,
        rightTop: data.images.rightTop[data.images.rightTop.length - 1] || null,
        rightBottom:
          data.images.rightBottom[data.images.rightBottom.length - 1] || null,
      });
    } catch (err) {
      showMessage("error", "Upload failed");
      console.error(err);
    }
  };

  // Delete an image by key
  const handleDelete = async (key) => {
    try {
      const url = images[key];
      await axios.post("http://localhost:3000/api/delete-image", {
        key,
        url,
      });

      setImages((prev) => ({
        ...prev,
        [key]: null,
      }));

      showMessage("success", "Image deleted successfully!");
    } catch (err) {
      showMessage("error", "Failed to delete image");
      console.error(err);
    }
  };

  // Render single image upload/delete box
  const renderImageBox = (label, key) => {
    const file = images[key];

    const preview =
      file && typeof file === "string"
        ? file
        : file
        ? URL.createObjectURL(file)
        : null;

    return (
      <div className="border-2 border-gray-300 rounded-xl p-6 text-center w-full bg-white shadow-md hover:shadow-lg transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">{label}</h3>

        <div className="w-full h-56 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          {preview ? (
            <img
              src={preview}
              alt={label}
              className="w-full h-full object-cover rounded-lg"
              onLoad={() => {
                if (typeof file !== "string") URL.revokeObjectURL(preview);
              }}
            />
          ) : (
            <p className="text-gray-500">No image uploaded</p>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-2">
          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg">
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
              onClick={() => handleDelete(key)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
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
      {/* Global message */}
      {message.text && (
        <div
          className={`mb-4 p-2 rounded-lg text-white text-center font-semibold ${
            message.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-1">
            Image Management
          </h2>
          <p className="text-sm text-gray-500">
            Upload and manage left and right side images
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition"
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
