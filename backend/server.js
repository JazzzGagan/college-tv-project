// backend/server.js
import cors from "cors";
import express from "express";
import eventsRouter from "./routes/admin.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", eventsRouter);
app.use("/images", express.static("media/images"));
app.use("/video", express.static("media/video"));

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "TV Content API Server",
    endpoints: {
      currentState: "/api/current-state",
      events: "/api/events",
      upload: "/api/upload",
      uploadVideo: "/api/upload-video",
      updateNotices: "/api/update-notices",
      updateDescription: "/api/update-description",
      login: "/api/login",
    },
  });
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
