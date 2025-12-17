import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    images: {
      leftTop: [{ type: String }],
      leftBottom: [{ type: String }],
      rightTop: [{ type: String }],
      rightBottom: [{ type: String }],
    },
    videoUrl: { type: String, default: "" },
    notices: [{ id: Number, text: String}],
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const State = mongoose.model("CurrentState", stateSchema);
export default State;
