import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

const MAX_NEWS = 5;

const EventsNewsManager = () => {
  const [newsList, setNewsList] = useState([
    { title: "", description: "", image: null },
  ]);

  const handleAddNews = () => {
    if (newsList.length >= MAX_NEWS) {
      return alert("Maximum 5 news items allowed!");
    }
    setNewsList([...newsList, { title: "", description: "", image: null }]);
  };

  const handleRemoveNews = (index) => {
    const updated = [...newsList];
    updated.splice(index, 1);
    setNewsList(updated);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...newsList];
    updated[index][field] = value;
    setNewsList(updated);
  };

  const handleSave = async () => {
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
    }
  };

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
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-700">
            News {index + 1}
          </h3>
          {newsList.length > 1 && (
            <button
              onClick={() => handleRemoveNews(index)}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>

        {/* Image Preview */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center bg-gray-50">
          {preview ? (
            <img
              src={preview}
              className="w-full h-full object-cover rounded-lg"
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

        {/* Upload */}
        <label className="block mt-3 cursor-pointer text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center">
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
    <section className="tab-content">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <div>
          <h2 className="text-3xl font-bold text-red-600">
            Events & News Manager
          </h2>
          <p className="text-gray-500 text-sm">
            Upload images • Add news • Max 5 news items
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow"
        >
          💾 Save All
        </button>
      </div>

      {/* Add button */}
      <button
        onClick={handleAddNews}
        className="mb-5 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        <FaPlus /> Add News
      </button>

      {/* News List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsList.map((item, index) => renderNewsBox(item, index))}
      </div>
    </section>
  );
};

export default EventsNewsManager;
