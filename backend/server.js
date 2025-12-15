// backend/server.js
import cors from "cors";
import express from "express";
import adminRoutes from "./routes/adminRoutes.js";
import tvRoutes from "./routes/eventRoutes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", adminRoutes);
app.use("/api/event", tvRoutes);
app.use("/images", express.static("media/images"));
app.use("/video", express.static("media/video"));
app.use("/EventImages", express.static("media/EventImages"));

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
