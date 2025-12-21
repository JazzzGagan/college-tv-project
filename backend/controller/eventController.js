import multer from "multer";
import { broadcast } from "../services/seeService.js";
import path from "path";
import fs from "fs";
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
      //const file = req.files[`${event.id}`];
      const file = req.files.find((f) =>
        f.fieldname.includes(`[${event.id}][image]`)
      );

      // if (eventState[`${event.id}`]) {
      //   eventState[
      //     `${event.id}`
      //   ].imageUrl = `http://localhost:3000/EventImages/${file.filename}`;
      // }

      if (file && eventState[event.id]) {
        eventState[
          event.id
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

export const deleteAllEvents = async (req, res) => {
  try {
    const state = await EventState.findOne();

    if (!state || !Array.isArray(state.events)) {
      return res.json({ message: "No events to delete" });
    }

    // Delete image files
    for (const event of state.events) {
      if (event.imageUrl) {
        const filename = path.basename(event.imageUrl);
        const filepath = path.join("media", "EventImages", filename);

        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
    }

    // Delete all DB records
    state.events = [];
    await state.save();

    broadcast({ type: "event", events: [] });

    res.json({ message: "All events deleted successfully" });
    console.log("All events deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete all events" });
  }
};

// DELETE /delete-event/:index
export const deleteEvent = async (req, res) => {
  const id = req.params.id;
  console.log("delete event id is 0", id);

  try {
    const state = await EventState.findOne();
    if (!state || !Array.isArray(state.events)) {
      return res.status(404).json({ message: "No events found" });
    }

    // Find index by event.id (string)
    const index = state.events.findIndex((ev) => ev.id === id);

    if (index === -1) {
      return res.status(400).json({ message: "Invalid event id" });
    }

    // Delete image file if exists
    const eventToDelete = state.events[index];
    if (eventToDelete.imageUrl) {
      const filename = path.basename(eventToDelete.imageUrl);
      const filepath = path.join("media", "EventImages", filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    // Remove event
    state.events.splice(index, 1);

    await state.save();

    eventState.length = 0;
    eventState.push(...state.events);

    broadcast({ type: "event", events: state.events });

    res.json({ message: "Event deleted successfully", events: state.events });
  } catch (error) {
    console.error("Failed to delete event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};
