import {
  sendState,
  loginAdmin,
  addVideo,
  uploadImage,
  updateNotices,
  updateDescription,
  uploadImageMiddleWare,
  uploadVideoMiddleware,
  getAllImages,
  deleteImage,
  getVideo,
  getAllNotices,
  deleteNotice,
} from "../controller/adminController.js";
import { Router } from "express";
import { seeHandler } from "../services/seeService.js";

const router = Router();

router.get("/current-state", sendState);
router.get("/events", seeHandler);
router.post("/login", loginAdmin);
router.post("/upload", uploadImageMiddleWare, uploadImage);
router.post("/upload-video", uploadVideoMiddleware, addVideo);
router.get("/notices", getAllNotices);
router.post("/update-notices", updateNotices);
router.delete("/delete-notice/:id", deleteNotice);
router.post("/update-description", updateDescription);
router.get("/all-images", getAllImages);
router.post("/delete-image", deleteImage);
router.get("/video", getVideo);
router.get("/video", getVideo);

export default router;
