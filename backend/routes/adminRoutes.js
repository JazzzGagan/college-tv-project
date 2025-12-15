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
} from "../controller/adminController.js";
import { Router } from "express";
import { seeHandler } from "../services/seeService.js";

const router = Router();

router.get("/current-state", sendState);
router.get("/events", seeHandler);
router.post("/login", loginAdmin);
router.post("/upload", uploadImageMiddleWare, uploadImage);
router.post("/upload-video", uploadVideoMiddleware, addVideo);
router.post("/update-notices", updateNotices);
router.get("/notices", getAllNotices);
router.post("/update-description", updateDescription);
router.get("/all-images", getAllImages);
router.post("/delete-image", deleteImage);
router.get("/video", getVideo);
router.get("/video", getVideo);

export default router;
