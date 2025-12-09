// backend/server.js
import cors from "cors";
import express from "express";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", adminRoutes);
app.use("/images", express.static("media/images"));
app.use("/video", express.static("media/video"));



const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
