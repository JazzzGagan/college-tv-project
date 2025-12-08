import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const MAX_EVENTS = 5;

const EventsNewsManager = () => {
  const [events, setEvents] = useState([
    {
      title: "",
      description: "",
      category: "",
      date: "",
      time: "",
      location: "",
      image: null,
    },
  ]);

  useEffect(() => {
    return () => {
      events.forEach((item) => {
        if (item.image && typeof item.image !== "string") {
          URL.revokeObjectURL(item.image);
        }
      });
    };
  }, [events]);

  const handleAddEvent = () => {
    if (events.length >= MAX_EVENTS) {
      return alert("Maximum 5 events allowed!");
    }
    setEvents([
      ...events,
      {
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        location: "",
        image: null,
      },
    ]);
  };

  const handleRemoveEvent = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
  };

  const handleSave = async () => {
    for (let ev of events) {
      if (
        !ev.title.trim() ||
        !ev.description.trim() ||
        !ev.category.trim() ||
        !ev.date.trim() ||
        !ev.time.trim() ||
        !ev.location.trim()
      ) {
        return alert("Please fill all required fields!");
      }
    }

    const formData = new FormData();

    events.forEach((item, index) => {
      formData.append(`events[${index}][title]`, item.title);
      formData.append(`events[${index}][description]`, item.description);
      formData.append(`events[${index}][category]`, item.category);
      formData.append(`events[${index}][date]`, item.date);
      formData.append(`events[${index}][time]`, item.time);
      formData.append(`events[${index}][location]`, item.location);

      if (item.image && typeof item.image !== "string") {
        formData.append(`events[${index}][image]`, item.image);
      }
    });

    try {
      await axios.post("http://localhost:3000/api/events/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Events saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save events.");
    }
  };

  const renderEventBox = (item, index) => {
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
            Event {index + 1}
          </h3>
          {events.length > 1 && (
            <button
              onClick={() => handleRemoveEvent(index)}
              className="px-3 py-1 bg-red-600 flex items-center gap-2 text-white rounded hover:bg-red-700"
            >
              <FaTrash size={14} /> Delete
            </button>
          )}
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center bg-gray-50">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/685/685655.png"
                className="w-12 opacity-40 mb-2"
                alt="placeholder"
              />
              <p className="text-sm text-gray-500">No image uploaded</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-3 flex-wrap">
          <label className="flex-1 cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700 min-w-[120px]">
            Upload Image
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                handleInputChange(index, "image", e.target.files[0])
              }
            />
          </label>

          {preview && (
            <button
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 min-w-[120px]"
              onClick={() => handleInputChange(index, "image", null)}
            >
              Remove
            </button>
          )}
        </div>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Event Title"
          className="w-full mt-3 p-2 border rounded"
          value={item.title}
          onChange={(e) => handleInputChange(index, "title", e.target.value)}
        />

        <textarea
          rows={3}
          placeholder="Event Description"
          className="w-full mt-2 p-2 border rounded"
          value={item.description}
          onChange={(e) =>
            handleInputChange(index, "description", e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category (Academic / Cultural / Workshop)"
          className="w-full mt-2 p-2 border rounded"
          value={item.category}
          onChange={(e) => handleInputChange(index, "category", e.target.value)}
        />

        {/* Date & Time: stack vertically on small screens */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <input
            type="date"
            className="flex-1 p-2 border rounded"
            value={item.date}
            onChange={(e) => handleInputChange(index, "date", e.target.value)}
          />
          <input
            type="time"
            className="flex-1 p-2 border rounded"
            value={item.time}
            onChange={(e) => handleInputChange(index, "time", e.target.value)}
          />
        </div>

        <input
          type="text"
          placeholder="Location"
          className="w-full mt-2 p-2 border rounded"
          value={item.location}
          onChange={(e) => handleInputChange(index, "location", e.target.value)}
        />
      </div>
    );
  };

  return (
    <section className="p-5 max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b gap-4">
        <h2 className="text-3xl font-bold text-blue-700">Manage Events</h2>

        <div className="flex flex-wrap gap-3">
          {events.length < MAX_EVENTS && (
            <button
              onClick={handleAddEvent}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Add Event
            </button>
          )}

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save All
          </button>
        </div>
      </div>

      {/* Grid: 1 column mobile, 2 columns md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((item, index) => renderEventBox(item, index))}
      </div>
    </section>
  );
};

export default EventsNewsManager;
