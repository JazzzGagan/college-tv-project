import multer from "multer";
import { broadcast } from "../services/seeService.js";
import path from "path";

//@desc Upload College Events
//@route POST /add-event
//access PRIVATE
let eventState = [];
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

  eventState = [...events];

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
  res.json({ events: eventState });
  broadcast({ type: "event", events: eventState });
};

export const getAllEvents = async (req, res) => {
  res.json({ event: eventState });
};
