import multer from "multer";
import { type } from "os";
import path from "path";

let clients = [];

let currentState = {
  images: {
    leftTop: [],
    leftBottom: [],
    rightTop: [],
    rightBottom: [],
  },
  videoUrl: [],
  notices: [],
  description: "",
};

export const serverSentEvent = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  res.write(`data: ${JSON.stringify({ message: "connected" })}\n\n`);

  clients.push(res);
  req.on("close", () => {
    clients = clients.filter((c) => c !== res);
  });
};

const broadcast = (data) => {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

//@desc Get current images, video, notices
//@route GET /current-state
//@access Public
export const sendState = async (req, res) => {
  res.json(currentState);
};

// ---- ADMIN LOGIN ----
//@desc login admin
//@route POST /login
//@access Private
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "pass123") {
    res.json({ token: "1234", message: "Login successfully" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

// ---- IMAGE UPLOAD CONFIG ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("media", "images"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

export const uploadImageMiddleWare = multer({ storage }).fields([
  { name: "leftTop", maxCount: 1 },
  { name: "leftBottom", maxCount: 1 },
  { name: "rightTop", maxCount: 1 },
  { name: "rightBottom", maxCount: 1 },
]);

//@desc upload left and right images
//@route POST /admin/upload
//@access Private
export const uploadImage = async (req, res) => {
  const { leftTop, leftBottom, rightTop, rightBottom } = req.files || {};
  console.log(req.files);

  if (leftTop) {
    const url = `http://localhost:3000/images/${leftTop[0].filename}`;
    currentState.images.leftTop.push(url);
  }

  if (leftBottom) {
    const url = `http://localhost:3000/images/${leftBottom[0].filename}`;
    currentState.images.leftBottom.push(url);
  }

  if (rightTop) {
    const url = `http://localhost:3000/images/${rightTop[0].filename}`;
    currentState.images.rightTop.push(url);
  }
  if (rightBottom) {
    const url = `http://localhost:3000/images/${rightBottom[0].filename}`;
    currentState.images.rightBottom.push(url);
  }

  // Broadcast update to clients (SSE)
  broadcast({
    type: "images",
    images: currentState.images,
  });

  res.json({
    images: currentState.images,
    message: "Images uploaded successfully",
  });
};

const storageVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("media", "video"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const uploadVideo = multer({
  storage: storageVideo,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB max
});

export const uploadVideoMiddleware = uploadVideo.single("video");

//@desc upload video
//@route POST /admin/upload-video
//@access Private
export const addVideo = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No video file provided" });

  const videoUrl = `http://localhost:3000/video/${req.file.filename}`;
  currentState.videoUrl.push(videoUrl);

  currentState.videoUrl = videoUrl;

  broadcast({ type: "video", videoUrl });

  res.json({ message: "Video uploaded successfully", videoUrl });
};

//@desc update notices
//@route POST /admin/update-notices
//@access Private
export const updateNotices = async (req, res) => {
  const noticesArray = req.body;

  currentState.notices = noticesArray;

  broadcast({ type: "notices", notices: noticesArray });

  res.json({ message: "Notices updated", notices: noticesArray });
};

//@desc update description
//@route POST /update-description
//@access Private
export const updateDescription = async (req, res) => {
  const { description } = req.body;

  if (description === undefined) {
    return res.status(400).json({ message: "Description is required" });
  }

  currentState.description = description || "";

  broadcast({ type: "description", description: currentState.description });

  res.json({
    message: "Description updated successfully",
    description: currentState.description,
  });
};

//@desc get all images
//@route GET /all-images
//@access Private

export const getAllImages = async (req, res) => {
  res.json({ images: currentState.images });
};
//@desc deleteImage
//@route GET /all-images
//@access Private

export const deleteImage = async (req, res) => {
  const { key, url } = req.body;

  currentState.images = currentState.images.key.filter((img) => img !== url);
  broadcast({ type: "images", images: currentState.images });
  res.json({ message: "Image deleted", images: currentState.images });
};
