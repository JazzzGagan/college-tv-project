
import express from "express";
import { Router } from "express";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TV_CONTENT_FILE = path.join(__dirname, "..", "tv-content.json");

// ---- Helper functions for persistence ----
const loadState = () => {
  try {
    if (fs.existsSync(TV_CONTENT_FILE)) {
      const data = fs.readFileSync(TV_CONTENT_FILE, "utf8");
      const content = JSON.parse(data);
      
      // Handle old format with "notice" (string) vs new format with "notices" (array)
      let notices = [];
      if (content.notices && Array.isArray(content.notices)) {
        notices = content.notices;
      } else if (content.notice && typeof content.notice === "string") {
        // Convert old notice string to notices array format
        if (content.notice.trim()) {
          notices = [{ id: Date.now(), text: content.notice }];
        }
      }
      
      return {
        leftImage: content.leftImage || null,
        rightImage: content.rightImage || null,
        videoUrl: content.videoUrl || null,
        notices: notices,
        description: content.description || "",
      };
    }
  } catch (err) {
    console.error("Error loading state:", err);
  }
  return {
    leftImage: null,
    rightImage: null,
    videoUrl: null,
    notices: [],
    description: "",
  };
};

const saveState = (state) => {
  try {
    const content = {
      leftImage: state.leftImage || "",
      rightImage: state.rightImage || "",
      videoUrl: state.videoUrl || "",
      notices: state.notices || [],
      description: state.description || "",
    };
    fs.writeFileSync(TV_CONTENT_FILE, JSON.stringify(content, null, 2));
    console.log("State saved to file:", content);
  } catch (err) {
    console.error("Error saving state:", err);
  }
};

// ---- SSE Clients ----
let clients = [];

// ---- Current State to persist data ----
let currentState = loadState();
console.log("Loaded initial state:", currentState);

// ---- SSE EVENTS ----
router.get("/events", (req, res) => {
  // Headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Add new client
  clients.push(res);

  // Remove client on disconnect
  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
});

// ---- BROADCAST FUNCTION ----
const broadcast = (data) => {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

// ---- GET CURRENT STATE ----
//@desc Get current images, video, notices
//@route GET /current-state
//@access Public
router.get("/current-state", (req, res) => {
  console.log("Current state requested:", currentState);
  console.log("Description in currentState:", currentState.description);
  res.json(currentState);
});

// ---- ADMIN LOGIN ----
//@desc login admin
//@route POST /login
//@access Private
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "pass123") {
    res.json({ token: "1234", message: "Login successfully" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ---- IMAGE UPLOAD CONFIG ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("media", "images"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + ext);
  },
});

const upload = multer({ storage });

// ---- UPLOAD LEFT AND RIGHT IMAGES ----
//@desc upload left and right images
//@route POST /admin/upload
//@access Private
router.post(
  "/upload",
  upload.fields([
    { name: "left", maxCount: 1 },
    { name: "right", maxCount: 1 },
  ]),
  (req, res) => {
    const leftFile = req.files.left?.[0];
    const rightFile = req.files.right?.[0];

    const leftUrl = leftFile
      ? `http://localhost:3000/images/${leftFile.filename}`
      : null;
    const rightUrl = rightFile
      ? `http://localhost:3000/images/${rightFile.filename}`
      : null;

    // Update current state
    if (leftUrl) currentState.leftImage = leftUrl;
    if (rightUrl) currentState.rightImage = rightUrl;

    // Save to file
    saveState(currentState);

    // Broadcast update to connected clients
    broadcast({ type: "images", leftImage: leftUrl, rightImage: rightUrl });

    res.json({
      leftImage: leftUrl,
      rightImage: rightUrl,
      message: "Files uploaded successfully",
    });
  }
);


const storageVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("media", "video"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + ext);
  },
});

const uploadVideo = multer({
  storage: storageVideo,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max
});

// ---- UPLOAD VIDEO ----
//@desc upload video
//@route POST /admin/upload-video
//@access Private
router.post("/upload-video", uploadVideo.single("video"), (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No video file provided" });

  const videoUrl = `http://localhost:3000/video/${req.file.filename}`;

  // Update current state
  currentState.videoUrl = videoUrl;

  // Save to file
  saveState(currentState);

  // Broadcast update
  broadcast({ type: "video", videoUrl });

  res.json({ message: "Video uploaded successfully", videoUrl });
});

// ---- UPDATE NOTICES ----
//@desc update notices
//@route POST /admin/update-notices
//@access Private
router.post("/update-notices", (req, res) => {
  const noticesArray = req.body;

  // Update current state
  currentState.notices = noticesArray;

  // Save to file
  saveState(currentState);

  // Broadcast update
  broadcast({ type: "notices", notices: noticesArray });

  res.json({ message: "Notices updated", notices: noticesArray });
});

// ---- UPDATE DESCRIPTION ----
//@desc update description
//@route POST /update-description
//@access Private
router.post("/update-description", (req, res) => {
  const { description } = req.body;

  if (description === undefined) {
    return res.status(400).json({ message: "Description is required" });
  }

  // Update current state
  currentState.description = description || "";

  // Save to file
  saveState(currentState);

  // Broadcast update
  broadcast({ type: "description", description: currentState.description });

  res.json({ 
    message: "Description updated successfully", 
    description: currentState.description 
  });
});

export default router;
