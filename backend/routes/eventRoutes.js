import { Router } from "express";
import {
  uploadEventMiddleWare,
  collegEvents,
  getAllEvents,
  deleteEvent,
  deleteAllEvents,
  updateEvent,
} from "../controller/eventController.js";
import { seeHandler } from "../services/seeService.js";

const router = Router();

router.post("/create-event", uploadEventMiddleWare, collegEvents);
router.get("/get-all-event", getAllEvents);
router.get("/events", seeHandler);
router.delete("/delete-event/:id", deleteEvent);
router.delete("/delete-all-events", deleteAllEvents);
router.put("/update-event/:id", uploadEventMiddleWare, updateEvent);

export default router;
