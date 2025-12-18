import multer from "multer";
import { broadcast } from "../services/seeService.js";
import path from "path";
import { eventState, saveStateEvent } from "../services/eventService.js";
import EventState from "../models/eventModel.js";

//@desc Upload College Events
//@route POST /add-event
//access PRIVATE

const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("media", "EventImages"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const uploadEventMiddleWare = multer({ storage: eventStorage }).any();

export const collegEvents = async (req, res) => {
  const { events } = req.body;
  console.log("events from frontend", events);

  eventState.length = 0;
  eventState.push(...events);

  events.forEach((event) => {
    if (req.files && req.files.length > 0) {
      const file = req.files[`${event.id}`];

      if (eventState[`${event.id}`]) {
        eventState[
          `${event.id}`
        ].imageUrl = `http://localhost:3000/EventImages/${file.filename}`;
      }
    }
  });

  console.log("saved events", eventState);
  try {
    await saveStateEvent();

    broadcast({ type: "event", events: eventState });
    res.json({ events: eventState });
  } catch (error) {
    console.error("Failed to save state:", error);
    res.status(500).json({ message: "Failed to save event" });
  }
};

export const getAllEvents = async (req, res) => {
  const state = await EventState.findOne();

  res.json({ event: state?.events || [] });
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Backend received delete request for id:", id);

    if (!id) return res.status(400).json({ message: "Event id required" });

    // Find the event first to get its image URL
    const eventToDelete = eventState.find((ev) => ev._id === id);
    if (!eventToDelete) {
      console.log("Event not found for id:", id);
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete image file if exists
    if (eventToDelete.imageUrl) {
      const filename = path.basename(eventToDelete.imageUrl);
      const filepath = path.join("media", "EventImages", filename);

      // Delete file asynchronously, but don't block the response
      fs.unlink(filepath, (err) => {
        if (err) {
          console.error("Failed to delete image file:", filepath, err);
        } else {
          console.log("Deleted image file:", filepath);
        }
      });
    }

    // Remove event from array
    eventState = eventState.filter((ev) => ev._id !== id);

    console.log("Event deleted successfully", id);

    res.json({ message: "Event deleted successfully" });
    broadcast({ type: "event", events: eventState });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

export const deleteAllEvents = async (req, res) => {
  try {
    // Delete all image files before clearing eventState
    for (const event of eventState) {
      if (event.imageUrl) {
        const filename = path.basename(event.imageUrl);
        const filepath = path.join("media", "EventImages", filename);

        fs.unlink(filepath, (err) => {
          if (err) {
            console.error("Failed to delete image file:", filepath, err);
          } else {
            console.log("Deleted image file:", filepath);
          }
        });
      }
    }

    eventState = [];

    res.json({ message: "All events deleted successfully" });
    broadcast({ type: "event", events: eventState });
    console.log("All events deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete all events" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEventData = req.body;

    console.log("Update event received data:", updatedEventData);
    console.log("Edit event id:", id);
    console.log("Uploaded file:", req.file);

    const eventIndex = eventState.findIndex((ev) => ev._id === id);
    if (eventIndex === -1) {
      return res.status(404).json({ message: "Event not found" });
    }

    // If there's a file uploaded
    if (req.file) {
      const imageUrl = `http://localhost:3000/EventImages/${req.file.filename}`;
      updatedEventData.imageUrl = imageUrl;
    }

    // Merge the updated fields into existing event
    eventState[eventIndex] = {
      ...eventState[eventIndex],
      ...updatedEventData,
      _id: id,
    };

    res.json({ event: eventState[eventIndex] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update event" });
  }
  const state = await EventState.findOne();

  res.json({ event: state?.events || [] });
};
