import {
  serverSentEvent,
  sendState,
  loginAdmin,
  addVideo,
  uploadImage,
  updateNotices,
  updateDescription,
} from "../controller/adminController.js";
import { Router } from "express";

const router = Router();

router.get("current-state", sendState);
router.post("/events", serverSentEvent)("/current-state");
router.post("/login", loginAdmin);
router.post("/upload", uploadImage);
router.post("/upload-video", addVideo);
router.post("/update-notices", updateNotices);
router.post("/update-description", updateDescription);
