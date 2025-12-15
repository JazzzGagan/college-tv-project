import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPlus } from "react-icons/fa";

const MAX_EVENTS = 10;

const emptyEvent = {
  _id: null,
  title: "",
  description: "",
  category: "",
  date: "",
  time: "",
  location: "",
  image: null,
};

const EventsNewsManager = () => {
  //console.log("EventsNeews manager component moundted");

  const [events, setEvents] = useState([emptyEvent]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text) => {
    // console.log(`showMessage called with: ${type} - ${text}`);
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  useEffect(() => {
    //console.log("UseEffect: Fetched triggered");

    const fetchEvents = async () => {
      //console.log("fetchedEvents started");

      try {
        const res = await axios.get(
          "http://localhost:3000/api/event/get-all-event"
        );
        console.log("test", res.data);

        if (Array.isArray(res.data) && res.data.length > 0) {
          setEvents(
            res.data.slice(0, MAX_EVENTS).map((ev) => ({
              ...ev,
              image: ev.image || null,
            }))
          );
          showMessage("success", "Events loaded successfully");
        } else {
          setEvents([emptyEvent]);
          console.log("No events found");
          showMessage("error", "No events found");
        }
      } catch (err) {
        console.error(err);
        setEvents([emptyEvent]);
        showMessage("error", "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /* HANDLERS */
  const handleAddEvent = () => {
    if (events.length >= MAX_EVENTS) {
      return showMessage("error", "Maximum 10 events allowed");
    }
    setEvents([...events, { ...emptyEvent }]);
  };

  const handleRemoveEvent = (index) => {
    if (events.length === 1) return;
    setEvents(events.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
  };

  /* SAVE EVENTS */
  const handleSave = async () => {
    for (let ev of events) {
      if (
        !ev.title.trim() ||
        !ev.description.trim() ||
        !ev.category ||
        !ev.date ||
        !ev.time ||
        !ev.location.trim()
      ) {
        return showMessage("error", "Please fill all required fields");
      }
    }

    const formData = new FormData();

    events.forEach((ev, index) => {
      formData.append(`events[${index}][id]`, index);
      formData.append(`events[${index}][title]`, ev.title);
      formData.append(`events[${index}][description]`, ev.description);
      formData.append(`events[${index}][category]`, ev.category);
      formData.append(`events[${index}][date]`, ev.date);
      formData.append(`events[${index}][time]`, ev.time);
      formData.append(`events[${index}][location]`, ev.location);

      if (ev.image instanceof File) {
        formData.append(`events[${index}][image]`, ev.image);
      }
    });

    try {
      setSaving(true);
      const response = await axios.post(
        "http://localhost:3000/api/event/create-event",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Events saved successfully:", response.data);
      showMessage("success", "Events saved successfully");
    } catch (err) {
      console.error("Error saving events:", err);
      const errorMessage = err.response?.data?.error || err.message || "Failed to save events";
      showMessage("error", `Failed to save events: ${errorMessage}`);
    } finally {
      setSaving(false);
    }
  };

  /* RENDER EVENT */
  const renderEvent = (ev, index) => {
    const preview =
      typeof ev.image === "string"
        ? ev.image
        : ev.image instanceof File
        ? URL.createObjectURL(ev.image)
        : null;

    return (
      <div
        key={index}
        className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg text-gray-700">
            Event {index + 1}
          </h3>
          {events.length > 1 && (
            <button
              onClick={() => handleRemoveEvent(index)}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <FaTrash /> Delete
            </button>
          )}
        </div>

        {/* Image */}
        <div className="h-48 border-2 rounded flex items-center justify-center bg-gray-50">
          {preview ? (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover rounded"
              onLoad={() => {
                if (ev.image instanceof File) URL.revokeObjectURL(preview);
              }}
            />
          ) : (
            <span className="text-gray-400 text-sm">No image</span>
          )}
        </div>

        {/* Image buttons */}
        <div className="flex gap-3 mt-3 flex-wrap">
          <label className="flex-1 bg-blue-600 text-white py-2 rounded text-center cursor-pointer">
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
              onClick={() => handleInputChange(index, "image", null)}
              className="flex-1 bg-red-600 text-white py-2 rounded"
            >
              Remove
            </button>
          )}
        </div>

        {/* Inputs */}
        <input
          type="text"
          placeholder="Title"
          className="w-full mt-3 p-2 border rounded"
          value={ev.title}
          onChange={(e) => handleInputChange(index, "title", e.target.value)}
        />

        <textarea
          rows={3}
          placeholder="Description"
          className="w-full mt-2 p-2 border rounded"
          value={ev.description}
          onChange={(e) =>
            handleInputChange(index, "description", e.target.value)
          }
        />

        <select
          className="w-full mt-2 p-2 border rounded"
          value={ev.category}
          onChange={(e) => handleInputChange(index, "category", e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Academic">Academic</option>
          <option value="Cultural">Cultural</option>
          <option value="Workshop">Workshop</option>
          <option value="Sports">Sports</option>
        </select>

        <div className="flex gap-3 mt-2 flex-col sm:flex-row">
          <input
            type="date"
            className="flex-1 p-2 border rounded"
            value={ev.date}
            onChange={(e) => handleInputChange(index, "date", e.target.value)}
          />
          <input
            type="time"
            className="flex-1 p-2 border rounded"
            value={ev.time}
            onChange={(e) => handleInputChange(index, "time", e.target.value)}
          />
        </div>

        <input
          type="text"
          placeholder="Location"
          className="w-full mt-2 p-2 border rounded"
          value={ev.location}
          onChange={(e) => handleInputChange(index, "location", e.target.value)}
        />
      </div>
    );
  };

  return (
    <section className="p-5 max-w-[1200px] mx-auto">
      {/* MESSAGE BAR */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-lg text-white text-center font-semibold ${
            message.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
          style={{ border: "2px solid yellow" }}
        >
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-blue-700">Manage Events</h2>

        <div className="flex gap-3 flex-wrap">
          {events.length < MAX_EVENTS && (
            <button
              onClick={handleAddEvent}
              className="bg-green-600 text-white px-5 py-2 rounded flex items-center gap-2"
            >
              <FaPlus /> Add Event
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      {/* Grid of events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(renderEvent)}
      </div>

      {/* Loading text */}
      {loading && (
        <p className="text-center text-gray-400 mt-4">
          Loading events from server...
        </p>
      )}
    </section>
  );
};

export default EventsNewsManager;
