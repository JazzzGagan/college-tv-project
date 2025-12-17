import multer from "multer";
import { broadcast } from "../services/seeService.js";
import path from "path";
import { saveStateHome } from "../services/stateServices.js";
import { currentState } from "../services/stateServices.js";

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

//@desc upload left and right images
//@route POST /admin/upload
//@access Private
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

export const uploadImage = async (req, res) => {
  const { leftTop, leftBottom, rightTop, rightBottom } = req.files || {};

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

  try {
    await saveStateHome();

    broadcast({
      type: "images",
      images: currentState.images,
    });

    res.json({
      images: currentState.images,
      message: "Images uploaded successfully",
    });
  } catch (error) {
    console.error("Failed to save state:", error);
    res.status(500).json({ message: "Failed to save images" });
  }
};

//@desc upload video
//@route POST /admin/upload-video
//@access Private

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
export const addVideo = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "No video file provided" });

  const newVideoUrl = `http://localhost:3000/video/${req.file.filename}`;

  // DELETE OLD VIDEO IF EXISTS
  if (currentState.videoUrl) {
    const oldFilename = currentState.videoUrl.split("/video/")[1];
    const oldFilePath = path.join("media/video", oldFilename);

    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }
  }

  currentState.videoUrl = newVideoUrl;
  try {
    await saveStateHome();
    broadcast({ type: "video", videoUrl: newVideoUrl });

    res.json({ message: "Video replaced successfully", videoUrl: newVideoUrl });
  } catch (error) {
    console.error("Failed to save state:", error);
    res.status(500).json({ message: "Failed to save video" });
  }
};

// GET VIDEO
export const getVideo = (req, res) => {
  res.json({ videoUrl: currentState.videoUrl });
};

export const deleteVideo = async (req, res) => {
  const filename = req.params.fielename;

  const filePath = path.join("media/video", filename);

  if (!fs.existSync(filePath)) {
    return res.status(400).json({
      message: "Video not found",
    });
  }

  fs.unlinkSync(filePath);

  currentState.videoUrl = currentState.videoUrl.filter(
    (url) => !url.endsWith("/" + filename)
  );

  try {
    await saveStateHome();
    broadcast({ type: "delete_video", filename });

    res.json({ message: "Video deleted Successfully" });
  } catch (error) {
    console.error("Failed to save state:", error);
    res.status(500).json({ message: "Failed to delete video" });
  }
};

//@desc update notices
//@route POST /admin/update-notices
//@access Private
export const updateNotices = async (req, res) => {
  const noticesArray = req.body;

  console.log("Notice are", noticesArray);
  currentState.notices = noticesArray;

  try {
    await saveStateHome();
    broadcast({ type: "notices", notices: currentState.notices });

    res.json({ message: "Notices updated", notices: currentState.notices });
  } catch (error) {
    console.error("Failed to save state:", error);
    res.status(500).json({ message: "Failed to upload notices" });
  }
};

//@desc get all notices
//@route GET /all-notices
//@access Private
export const getAllNotices = async (req, res) => {
  res.json({ notices: currentState.notices });
};

export const deleteNotice = async (req, res) => {
  const { id } = req.params;

  console.log("Delete Params", req.params);

  if (!id) {
    return res.status(400).json({ message: "Notice id is required" });
  }

  console.log("Before delete:", currentState.notices.length);

  currentState.notices = currentState.notices.filter(
    (notices) => String(notices.id) !== String(id)
  );
  console.log("After delete:", currentState.notices.length);

  try {
    await saveStateHome();
    broadcast({
      type: "notices",
      notices: currentState.notices,
    });

    res.json({
      message: "Notice deleted successfully",
      notices: currentState.notices,
    });
  } catch (error) {
    console.error("Failed to save state:", error);
    res.status(500).json({ message: "Failed to delete notices" });
  }
};

//@desc update description
//@route POST /update-description
//@access Private
export const updateDescription = async (req, res) => {
  const { description } = req.body;
  console.log(description);

  if (description === undefined) {
    return res.status(400).json({ message: "Description is required" });
  }

  currentState.description = description || "";

  try {
    await saveStateHome();
    broadcast({ type: "description", description: currentState.description });

    res.json({
      message: "Description updated successfully",
      description: currentState.description,
    });
  } catch (error) {
    console.error("Failed to save state:", error);
    res.status(500).json({ message: "Failed to update description" });
  }
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

  if (!key || !url) {
    return res.status(400).json({ message: "Key and URL  required" });
  }

  if (!currentState.images[key]) {
    return res.status(400).json({ message: "Invalid image Key" });
  }

  currentState.images[key] = currentState.images[key].filter(
    (img) => img !== url
  );
  try {
    await saveStateHome();
    broadcast({ type: "images", images: currentState.images });
    res.json({ message: "Image deleted", images: currentState.images });
  } catch (error) {
    console.error("Failed to save state:", error);
    res.status(500).json({ message: "Failed to delete image" });
  }
};
