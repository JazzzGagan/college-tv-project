import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaPlus } from "react-icons/fa";

const MAX_EVENTS = 10;

const createEmptyEvent = () => ({
  _id: null,
  title: "",
  description: "",
  category: "",
  date: "",
  time: "",
  location: "",
  image: null,
  isNew: true,
});

const EventsNewsManager = () => {
  const [events, setEvents] = useState([createEmptyEvent()]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [validationErrors, setValidationErrors] = useState(new Set());

  console.log("test", events);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/event/get-all-event"
        );
        const events = res.data.event;
        console.log(events);

        if (Array.isArray(events) && events.length > 0) {
          setEvents(
            events.slice(0, MAX_EVENTS).map((ev) => ({
              ...ev,
              image: ev.imageUrl || null,
            }))
          );
        } else {
          setEvents([createEmptyEvent()]);
        }
      } catch (err) {
        console.error(err);
        setEvents([createEmptyEvent()]);
        showMessage("error", "Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = () => {
    if (events.length >= MAX_EVENTS) {
      return showMessage("error", "Maximum 10 events allowed");
    }
    setEvents((prev) => [...prev, createEmptyEvent()]);
    setEditingIndex(events.length);
  };

  const hasNewEvents = events.some((ev) => ev.isNew);

  const handleDeleteEvent = async (index) => {
    const ev = events[index];
    if (!ev._id) {
      setEvents(events.filter((_, i) => i !== index));
      setValidationErrors((prev) => {
        const newErrors = new Set([...prev].filter((i) => i !== index));
        return newErrors;
      });
      showMessage("success", "Event deleted locally");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/event/delete-event/${ev._id}`
      );
      setEvents(events.filter((_, i) => i !== index));
      setValidationErrors((prev) => {
        const newErrors = new Set([...prev].filter((i) => i !== index));
        return newErrors;
      });
      showMessage("success", "Event deleted from backend");
    } catch (err) {
      console.error(err);
      showMessage("error", "Failed to delete event");
    }
  };

  const handleDeleteAllEvents = async () => {
    if (!window.confirm("Are you sure you want to delete ALL events?")) return;
    try {
      await axios.delete("http://localhost:3000/api/event/delete-all-events");
      setEvents([createEmptyEvent()]);
      setValidationErrors(new Set());
      setEditingIndex(null);
      showMessage("success", "All events deleted from backend");
    } catch (err) {
      console.error(err);
      showMessage("error", "Failed to delete all events");
    }
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
    setValidationErrors((prev) => {
      if (prev.has(index)) {
        const newErrors = new Set(prev);
        newErrors.delete(index);
        return newErrors;
      }
      return prev;
    });
  };

  const isEventValid = (ev) => {
    return (
      ev.title.trim() &&
      ev.description.trim() &&
      ev.category &&
      ev.date &&
      ev.time &&
      ev.location.trim()
    );
  };

  // Local save for new events (no backend yet)
  const handleSaveSingle = (ev, index) => {
    if (!isEventValid(ev)) {
      setValidationErrors((prev) => new Set(prev).add(index));
      return showMessage("error", "Please fill all required fields");
    }
    setValidationErrors((prev) => {
      const newErrors = new Set(prev);
      newErrors.delete(index);
      return newErrors;
    });
    setEditingIndex(null);
    showMessage("success", "Saved locally");
  };

  // Upload new events to backend
  const handleUploadEvents = async () => {
    const newEvents = events.filter((ev) => ev.isNew);
    if (newEvents.length === 0) {
      return showMessage("error", "No new events to upload");
    }
    const invalidIndices = [];
    newEvents.forEach((ev) => {
      if (!isEventValid(ev)) {
        const actualIndex = events.findIndex((e) => e === ev);
        invalidIndices.push(actualIndex);
      }
    });
    if (invalidIndices.length > 0) {
      setValidationErrors(new Set(invalidIndices));
      setEditingIndex(invalidIndices[0]);
      return showMessage("error", "Please fill all required fields");
    }
    try {
      for (const ev of newEvents) {
        const formData = new FormData();
        formData.append("title", ev.title);
        formData.append("description", ev.description);
        formData.append("category", ev.category);
        formData.append("date", ev.date);
        formData.append("time", ev.time);
        formData.append("location", ev.location);
        if (ev.image instanceof File) {
          formData.append("image", ev.image);
        }
        const response = await axios.post(
          "http://localhost:3000/api/event/create-event",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const savedEvent = response.data.event;
        setEvents((prevEvents) => {
          const idx = prevEvents.findIndex(
            (e) => e.isNew && e.title === ev.title && e.date === ev.date
          );
          if (idx === -1) return prevEvents;
          const updatedEvents = [...prevEvents];
          updatedEvents[idx] = { ...savedEvent, isNew: false };
          return updatedEvents;
        });
      }
      setValidationErrors(new Set());
      setEditingIndex(null);
      showMessage("success", "Events uploaded successfully");
    } catch (err) {
      console.error(err);
      showMessage("error", "Upload failed");
    }
  };

  // New: Update existing event API call
  const handleUpdateEvent = async (ev, index) => {
    
    console.log("Edit button occur", ev._id);
    if (!isEventValid(ev)) {
      setValidationErrors((prev) => new Set(prev).add(index));
      return showMessage("error", "Please fill all required fields");
    }
    try {
      const formData = new FormData();
      formData.append("title", ev.title);
      formData.append("description", ev.description);
      formData.append("category", ev.category);
      formData.append("date", ev.date);
      formData.append("time", ev.time);
      formData.append("location", ev.location);
      if (ev.image instanceof File) {
        formData.append("image", ev.image);
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await axios.put(
        `http://localhost:3000/api/event/update-event/${ev._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEvents((prev) => {
        const updatedEvents = [...prev];
        const updatedEvent = response.data.event;
        updatedEvents[index] = {
          ...updatedEvent,
          image: updatedEvent.imageUrl || null,
          isNew: false,
        };
        return updatedEvents;
      });

      setValidationErrors((prev) => {
        const newErrors = new Set(prev);
        newErrors.delete(index);
        return newErrors;
      });
      setEditingIndex(null);
      showMessage("success", "Event updated successfully");

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      console.log("Update response:", response.data.event);
    } catch (error) {
      console.error(error);
      showMessage("error", "Failed to update event");
    }
  };

  const renderEvent = (ev, index) => {
    const preview =
      typeof ev.image === "string"
        ? ev.image
        : ev.image instanceof File
        ? URL.createObjectURL(ev.image)
        : null;

    const disabled = !ev.isNew && editingIndex !== index;
    const showError = validationErrors.has(index) || editingIndex === index;

    return (
      <div
        key={index}
        className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg text-gray-700">
            Event {index + 1}
          </h3>

          <div className="flex gap-2">
            {!ev.isNew && editingIndex !== index && (
              <button
                onClick={() => setEditingIndex(index)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
            )}

            {(ev.isNew || editingIndex === index) && (
              <button
                onClick={() => {
                  if (ev.isNew) {
                    handleSaveSingle(ev, index);
                  } else {
                    handleUpdateEvent(ev, index);
                  }
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Save
              </button>
            )}

            <button
              onClick={() => handleDeleteEvent(index)}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>

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

        <div className="flex gap-3 mt-3">
          <label
            className={`flex-1 py-2 rounded text-center cursor-pointer ${
              disabled ? "bg-gray-400" : "bg-blue-600 text-white"
            }`}
          >
            Upload Image
            <input
              type="file"
              className="hidden"
              disabled={disabled}
              accept="image/*"
              onChange={(e) =>
                handleInputChange(index, "image", e.target.files[0])
              }
            />
          </label>

          {preview && !disabled && (
            <button
              onClick={() => handleInputChange(index, "image", null)}
              className="flex-1 bg-red-600 text-white py-2 rounded"
            >
              Remove
            </button>
          )}
        </div>

        <div className="mt-3">
          <label className="block font-semibold text-gray-700">
            Title{" "}
            {!ev.title.trim() && showError && (
              <span className="text-red-600">*</span>
            )}
          </label>
          <input
            type="text"
            placeholder="Title"
            disabled={disabled}
            className="w-full p-2 border rounded disabled:bg-gray-100"
            value={ev.title}
            onChange={(e) => handleInputChange(index, "title", e.target.value)}
          />
        </div>

        <div className="mt-2">
          <label className="block font-semibold text-gray-700">
            Description{" "}
            {!ev.description.trim() && showError && (
              <span className="text-red-600">*</span>
            )}
          </label>
          <textarea
            rows={3}
            placeholder="Description"
            disabled={disabled}
            className="w-full p-2 border rounded disabled:bg-gray-100"
            value={ev.description}
            onChange={(e) =>
              handleInputChange(index, "description", e.target.value)
            }
          />
        </div>

        <div className="mt-2">
          <label className="block font-semibold text-gray-700">
            Category{" "}
            {!ev.category && showError && (
              <span className="text-red-600">*</span>
            )}
          </label>
          <select
            disabled={disabled}
            className="w-full p-2 border rounded disabled:bg-gray-100"
            value={ev.category}
            onChange={(e) =>
              handleInputChange(index, "category", e.target.value)
            }
          >
            <option value="">Select Category</option>
            <option value="Academic">Academic</option>
            <option value="Cultural">Cultural</option>
            <option value="Workshop">Workshop</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        <div className="flex gap-3 mt-2 flex-col sm:flex-row">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700">
              Date{" "}
              {!ev.date && showError && <span className="text-red-600">*</span>}
            </label>
            <input
              type="date"
              disabled={disabled}
              className="w-full p-2 border rounded disabled:bg-gray-100"
              value={ev.date}
              onChange={(e) => handleInputChange(index, "date", e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold text-gray-700">
              Time{" "}
              {!ev.time && showError && <span className="text-red-600">*</span>}
            </label>
            <input
              type="time"
              disabled={disabled}
              className="w-full p-2 border rounded disabled:bg-gray-100"
              value={ev.time}
              onChange={(e) => handleInputChange(index, "time", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-2">
          <label className="block font-semibold text-gray-700">
            Location{" "}
            {!ev.location.trim() && showError && (
              <span className="text-red-600">*</span>
            )}
          </label>
          <input
            type="text"
            placeholder="Location"
            disabled={disabled}
            className="w-full p-2 border rounded disabled:bg-gray-100"
            value={ev.location}
            onChange={(e) =>
              handleInputChange(index, "location", e.target.value)
            }
          />
        </div>
      </div>
    );
  };

  return (
    <section className="p-5 max-w-[1200px] mx-auto">
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-lg text-white text-center font-semibold ${
            message.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-between mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-blue-700">Manage Events</h2>

        <div className="flex gap-3">
          <button
            onClick={handleAddEvent}
            className="bg-blue-600 text-white px-5 py-2 rounded flex items-center gap-2"
          >
            <FaPlus /> Add Event
          </button>

          <button
            disabled={!hasNewEvents}
            onClick={handleUploadEvents}
            className={`px-5 py-2 rounded flex items-center gap-2 ${
              hasNewEvents
                ? "bg-green-600 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Upload Events
          </button>

          <button
            onClick={handleDeleteAllEvents}
            className="bg-red-700 text-white px-5 py-2 rounded flex items-center gap-2"
          >
            Delete All Events
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(renderEvent)}
      </div>

      {loading && (
        <p className="text-center text-gray-400 mt-4">
          Loading events from server...
        </p>
      )}
    </section>
  );
};

export default EventsNewsManager;
