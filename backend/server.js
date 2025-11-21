// backend/server.js
import cors from "cors";
import express from "express";
import adminRoutes from "./routes/admin.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
