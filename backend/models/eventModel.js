import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  events: { type: Array, default: [] },
});

const EventState = mongoose.model("eventState", eventSchema);

export default EventState;
