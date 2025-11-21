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
router.post("/upload", upload.single("file"), (req, res) => {
  console.log("test", req.body);

  if (!req.file) {
    return res.status(400).json({ message: "no file uploaded!" });
  }
  res
    .status(200)
    .json({ message: `${req.file.filename} uploaded sucessfully.` });
});
export default router;
