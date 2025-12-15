import { Router } from "express";
import {
  uploadEventMiddleWare,
  collegEvents,
  getAllEvents,
} from "../controller/eventController.js";
import { seeHandler } from "../services/seeService.js";

const router = Router();

router.post("/create-event", uploadEventMiddleWare, collegEvents);
router.get("/get-all-event", getAllEvents);
router.get("/events", seeHandler);

export default router;
