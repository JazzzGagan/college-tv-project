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
  isSaved: false,
  isEditing: true,
});

const EventsNewsManager = () => {
  //console.log("EventsNeews manager component moundted");

  const [events, setEvents] = useState([createEmptyEvent()]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });

  console.log("events are", events);

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
        const events = res.data.event;
        console.log("events are", events);

        if (Array.isArray(events) && events.length > 0) {
          setEvents(
            events.slice(0, MAX_EVENTS).map((ev) => ({
              ...ev,
              image: ev.imageUrl || null,
              isSaved: true,
              isEditing: false,
            }))
          );
          showMessage("success", "Events loaded successfully");
        } else {
          setEvents([createEmptyEvent()]);
          console.log("No events found");
          showMessage("error", "No events found");
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

  const allEventsSaved = events.length > 0 && events.every((ev) => ev.isSaved);

  /* HANDLERS */

  //adding new event
  const handleAddEvent = () => {
    if (events.length >= MAX_EVENTS) {
      return showMessage("error", "Maximum 10 events allowed");
    }
    setEvents([...events, createEmptyEvent()]);
  };

  //remove event from both backend and frontend
  const handleRemoveEvent = async (index) => {
    const eventId = events[index].id;

    if (!eventId) {
      setEvents(events.filter((_, i) => i !== index));
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/event/delete-event/${eventId}`
      );

      setEvents(events.filter((_, i) => i !== index));
      showMessage("success", "Event deleted successfully");
    } catch (error) {
      console.error("Failed to delete event:", error);
      showMessage("error", "Failed to delete event from server");
    }
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...events];
    updated[index][field] = value;
    setEvents(updated);
  };

  //delete all events from both backend and frontend
  const handleDeleteAll = async () => {
    const backendEvents = events.filter((ev) => ev._id);
    //const frontendOnlyEvents = events.filter((ev) => !ev._id);

    try {
      // Delete backend events
      if (backendEvents) {
        await axios.delete("http://localhost:3000/api/event/delete-all-events");
      }

      // Reset UI
      setEvents([createEmptyEvent()]);
      showMessage(
        "success",
        backendEvents.length
          ? "All events deleted from backend and frontend"
          : "All events deleted from frontend"
      );
    } catch (err) {
      console.error(err);
      showMessage("error", "Failed to delete all events");
    }
  };

  /* SAVE EVENTS */

  //locally saved events not push in backend
  const handleSaveLocal = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isSaved = true;
    updatedEvents[index].isEditing = false;
    setEvents(updatedEvents);
    showMessage("success", `Event ${index + 1} saved`);
  };

  //edit button
  const handleEditEvent = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].isEditing = true;
    updatedEvents[index].isSaved = false;
    setEvents(updatedEvents);
  };

  //upload event in backend
  const handleUpload = async () => {
    if (!allEventsSaved) {
      return showMessage("error", "Please save all events before uploading");
    }
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
      await axios.post(
        "http://localhost:3000/api/event/create-event",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      showMessage("success", "Events saved successfully");
    } catch (err) {
      console.error(err);
      showMessage("error", "Failed to save events");
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
        className="bg-white p-2 rounded-xl shadow hover:shadow-lg transition"
      >
        {/* Header */}
        <div className="mb-1">
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
            {/* Title */}
            <h3 className="font-semibold text-lg text-gray-700">
              Event {index + 1}
            </h3>

            {/* Buttons */}
            <div className="flex flex-col gap-2 sm:flex-row md:flex-row md:gap-1">
              {ev.isEditing ? (
                //save button
                <button
                  onClick={() => handleSaveLocal(index)}
                  className="w-full sm:w-28 bg-green-600 text-white px-3 py-2 rounded-xl text-sm
               flex items-center justify-center gap-1 transition-all hover:scale-105"
                >
                  Save
                </button>
              ) : (
                //edit button
                <button
                  onClick={() => handleEditEvent(index)}
                  className="w-full sm:w-28 bg-yellow-500 text-white px-3 py-2 rounded-xl text-sm
               flex items-center justify-center gap-1 transition-all hover:scale-105"
                >
                  Edit
                </button>
              )}

              {events.length > 1 && (
                //delete button
                <button
                  onClick={() => handleRemoveEvent(index)}
                  className="w-full sm:w-28 bg-red-600 text-white px-3 py-2 rounded-xl text-sm
                     flex items-center justify-center gap-1 transition-all hover:scale-105"
                >
                  <FaTrash /> Delete
                </button>
              )}
            </div>
          </div>
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
        {ev.isEditing && (
          <div className="flex gap-3 mt-3 flex-wrap">
            <label className="flex-1 bg-[#2743fd] text-white py-2 rounded-xl text-center cursor-pointer transition-all hover:scale-[1.02]">
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
                className="flex-1 bg-red-600 text-white py-2 rounded-xl transition-all hover:scale-[1.02]"
              >
                Remove
              </button>
            )}
          </div>
        )}

        {/* Inputs */}
        <input
          type="text"
          placeholder="Title"
          disabled={!ev.isEditing}
          className="w-full mt-3 p-2 border rounded"
          value={ev.title}
          onChange={(e) => handleInputChange(index, "title", e.target.value)}
        />

        <textarea
          rows={3}
          placeholder="Description"
          disabled={!ev.isEditing}
          className="w-full h-[10%] mt-2 p-1 border rounded"
          value={ev.description}
          onChange={(e) =>
            handleInputChange(index, "description", e.target.value)
          }
        />

        <select
          className="w-full mt-2 p-2 border rounded"
          disabled={!ev.isEditing}
          value={ev.category}
          onChange={(e) => handleInputChange(index, "category", e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Academic">Academic</option>
          <option value="Cultural">Cultural</option>
          <option value="Workshop">Workshop</option>
          <option value="Sports">Sports</option>
        </select>

        <div className="flex gap-1 mt-2 flex-col sm:flex-row">
          <input
            type="date"
            className="flex-1 p-1 border rounded"
            value={ev.date}
            onChange={(e) => handleInputChange(index, "date", e.target.value)}
          />
          <input
            type="time"
            className="flex-1 p-1 border rounded"
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
      {/* Message bar  */}
      {message.text && (
        <div
          className={`mb-4 p-3 rounded-2xl text-white text-center font-semibold ${
            message.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
          style={{ border: "2px solid yellow" }}
        >
          {message.text}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 border-b pb-4">
        <h2 className="text-3xl font-bold text-[#2743fd]">Manage Events</h2>

        <div className="flex gap-3 flex-wrap">
          {events.length < MAX_EVENTS && (
            <button
              onClick={handleAddEvent}
              className="w-40 bg-green-600 text-white px-5 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <FaPlus /> Add Event
            </button>
          )}

          <button
            onClick={handleUpload}
            disabled={saving}
            className={`w-40 px-6 py-3 rounded-2xl flex items-center justify-center transition-all
    ${
      saving
        ? "bg-gray-400 cursor-not-allowed"
        : allEventsSaved
        ? "bg-[#2743fd] text-white hover:scale-105"
        : "bg-[#2743fd]/70 text-white hover:scale-105"
    }`}
          >
            {saving ? "Uploading..." : "Upload"}
          </button>

          {/* Delete all button   */}
          <button
            onClick={handleDeleteAll}
            className="w-40 bg-red-600 text-white px-6 py-3 rounded-2xl flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <FaTrash /> Delete All
          </button>
        </div>
      </div>

      {/* Grid of events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(renderEvent)}
      </div>

      {/* Loading text */}
      {/* {loading && (
        <p className="text-center text-gray-400 mt-4">
          Loading events from server...
        </p>
      )} */}
    </section>
  );
};

export default EventsNewsManager;
