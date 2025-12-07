import {
  serverSentEvent,
  sendState,
  loginAdmin,
  addVideo,
  uploadImage,
  updateNotices,
  updateDescription,
  uploadImageMiddleWare,
  uploadVideoMiddleware,
  getAllImages,
} from "../controller/adminController.js";
import { Router } from "express";

const router = Router();

router.get("/current-state", sendState);
router.post("/events", serverSentEvent);
router.post("/login", loginAdmin);
router.post("/upload", uploadImageMiddleWare, uploadImage);
router.post("/upload-video", uploadVideoMiddleware, addVideo);
router.post("/update-notices", updateNotices);
router.post("/update-description", updateDescription);
router.get("/all-images", getAllImages);

export default router;
