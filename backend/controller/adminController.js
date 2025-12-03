import multer from "multer";
import path from "path";
import asyncHandler from "express-async-handler";

let clients = [];

let currentState = {
  leftImage: null,
  rightImage: null,
  videoUrl: null,
  notices: [],
};

export const serverSentEvent = asyncHandler(async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients.push(res);
  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
});

const broadcast = (data) => {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

//@desc Get current images, video, notices
//@route GET /current-state
//@access Public
export const sendState = asyncHandler(async (req, res) => {
  res.json(currentState);
});

// ---- ADMIN LOGIN ----
//@desc login admin
//@route POST /login
//@access Private
export const loginAdmin = asyncHandler(async (req, res) => {
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

//@desc upload left and right images
//@route POST /admin/upload
//@access Private
export const uploadImage = asyncHandler(
  async,
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
export const addVideo = asyncHandler(
  async,
  uploadVideo.single("video"),
  (req, res) => {
    if (!req.file)
      return res.status(400).json({ message: "No video file provided" });

    const videoUrl = `http://localhost:3000/video/${req.file.filename}`;

    currentState.videoUrl = videoUrl;

    // Broadcast update
    broadcast({ type: "video", videoUrl });

    res.json({ message: "Video uploaded successfully", videoUrl });
  }
);

// ---- UPDATE NOTICES ----
//@desc update notices
//@route POST /admin/update-notices
//@access Private
export const updateNotices = asyncHandler(async (req, res) => {
  const noticesArray = req.body;

  // Update current state
  currentState.notices = noticesArray;

  // Save to file

  // Broadcast update
  broadcast({ type: "notices", notices: noticesArray });

  res.json({ message: "Notices updated", notices: noticesArray });
});

// ---- UPDATE DESCRIPTION ----
//@desc update description
//@route POST /update-description
//@access Private
export const updateDescription = asyncHandler(async (req, res) => {
  const { description } = req.body;

  if (description === undefined) {
    return res.status(400).json({ message: "Description is required" });
  }

  // Update current state
  currentState.description = description || "";

  // Broadcast update
  broadcast({ type: "description", description: currentState.description });

  res.json({
    message: "Description updated successfully",
    description: currentState.description,
  });
});


