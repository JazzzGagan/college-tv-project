import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaSave, FaTrash } from "react-icons/fa";

const MAX_NEWS = 5;

const EventsNewsManager = () => {
  const [newsList, setNewsList] = useState([
    { title: "", description: "", image: null },
  ]);

  // Clean up object URLs (avoid memory leak)
  useEffect(() => {
    return () => {
      newsList.forEach((item) => {
        if (item.image && typeof item.image !== "string") {
          URL.revokeObjectURL(item.image);
        }
      });
    };
  }, [newsList]);

  // Add new news box
  const handleAddNews = () => {
    if (newsList.length >= MAX_NEWS) {
      return alert("Maximum 5 news items allowed!");
    }
    setNewsList([...newsList, { title: "", description: "", image: null }]);
  };

  // Remove a news item
  const handleRemoveNews = (index) => {
    const updated = [...newsList];
    updated.splice(index, 1);
    setNewsList(updated);
  };

  // Handle input changes
  const handleInputChange = (index, field, value) => {
    const updated = [...newsList];
    updated[index][field] = value;
    setNewsList(updated);
  };

  // Save all news items
  const handleSave = async () => {
    // Validation
    for (let item of newsList) {
      if (!item.title.trim() || !item.description.trim()) {
        return alert("Please fill all title and description fields!");
      }
    }

    const formData = new FormData();

    newsList.forEach((item, index) => {
      formData.append(`news[${index}][title]`, item.title);
      formData.append(`news[${index}][description]`, item.description);

      if (item.image && typeof item.image !== "string") {
        formData.append(`news[${index}][image]`, item.image);
      }
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/news/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Saved:", res.data);
      alert("News saved successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save news.");
    }
  };

  // Render each news block
  const renderNewsBox = (item, index) => {
    const preview =
      item.image && typeof item.image === "string"
        ? item.image
        : item.image
        ? URL.createObjectURL(item.image)
        : null;

    return (
      <div
        key={index}
        className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition"
      >
        {/* Header with delete button */}
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            News {index + 1}
          </h3>

          {newsList.length > 1 && (
            <button
              onClick={() => handleRemoveNews(index)}
              className="px-3 py-1 bg-red-600 flex items-center gap-2 text-white rounded hover:bg-red-700"
            >
              <FaTrash size={14} /> Delete
            </button>
          )}
        </div>

        {/* Image Preview */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center bg-gray-50">
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover rounded-lg"
              alt="preview"
            />
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                className="w-12 opacity-40 mb-2"
                alt="placeholder"
              />
              <p className="mt-1 text-sm text-gray-500">No image uploaded</p>
            </div>
          )}
        </div>

        {/* Upload + Delete Image Buttons */}
        <div className="flex gap-3 mt-3">
          <label className="cursor-pointer text-sm bg-blue-600 flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full text-center">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleInputChange(index, "image", e.target.files[0])
              }
            />
          </label>

          {preview && (
            <button
              onClick={() => handleInputChange(index, "image", null)}
              className="bg-red-600 flex items-center justify-center gap-2 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 w-full"
            >
              Remove
            </button>
          )}
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="News Title"
          className="w-full mt-3 p-2 border rounded"
          value={item.title}
          onChange={(e) => handleInputChange(index, "title", e.target.value)}
        />

        {/* Description */}
        <textarea
          placeholder="News Description"
          className="w-full mt-2 p-2 border rounded"
          rows={3}
          value={item.description}
          onChange={(e) =>
            handleInputChange(index, "description", e.target.value)
          }
        />
      </div>
    );
  };

  return (
    <section className="p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h2 className="text-3xl font-bold text-red-600">Events & News</h2>

        <div className="flex gap-3">
          {newsList.length < MAX_NEWS && (
            <button
              onClick={handleAddNews}
              className="bg-green-600 text-white flex items-center gap-2 px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Add News
            </button>
          )}

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            💾 Save All
          </button>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {newsList.map((item, index) => renderNewsBox(item, index))}
      </div>
    </section>
  );
};

export default EventsNewsManager;
