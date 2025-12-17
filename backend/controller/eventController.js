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

export const deletEvent = async (req, res) => {};
