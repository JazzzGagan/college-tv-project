// backend/server.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Serve media
app.use("/videos", express.static(path.join(__dirname, "media/videos")));
app.use("/images", express.static(path.join(__dirname, "media/images")));

// Notices API
app.get("/api/notices", (req, res) => {
  const notices = JSON.parse(fs.readFileSync("./notices.json"));
  res.json(notices);
});

// File upload for admin
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.fieldname === "video" ? "videos" : "images";
    cb(null, path.join(__dirname, "media", folder));
  },
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

app.post("/admin/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully" });
});

app.post("/admin/notices", (req, res) => {
  fs.writeFileSync("./notices.json", JSON.stringify(req.body.notices, null, 2));
  res.json({ message: "Notices updated successfully" });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
