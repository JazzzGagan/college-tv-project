import express from "express";
import { Router } from "express";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import { log } from "console";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (username === "admin" && password === "pass123") {
    res.json({ token: "1234", message: "Login sucessfully" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.mimetype.startsWith("video") ? "videos" : "images";
    cb(null, path.join("media", folder));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/upload",
  upload.fields([
    { name: "leftImage", maxCount: 1 },
    { name: "rightImage", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  (req, res) => {
    const leftImage = req.files.leftImage[0];
    const rightImage = req.files.rightImage[0];
    const video = req.files.video[0];

    if (!req.file) {
      return res.status(400).json({ message: "no file uploaded!" });
    }
    res.json({
      leftImageUrl: `http://localhost:3000/uploads/${leftImage.filename}`,
      rightImageUrl: `http://localhost:3000/uploads/${rightImage.filename}`,
      videoUrl: `http://localhost:3000/uploads/${video.filename}`,
      message: "Files uploaded successfully",
    });
  }
);
export default router;
