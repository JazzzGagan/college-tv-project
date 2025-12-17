import EventState from "../models/eventModel.js";

export let eventState = [];

export const loadStateEvent = async () => {
  const state = await EventState.findOne();
  if (state && Array.isArray(state.events)) {
    eventState.length = 0;
    eventState.push(...state.events);
    console.log("Events loaded:", eventState);
  } else {
    console.log("No State found, using default");
  }
};

export const saveStateEvent = async () => {
  console.log(eventState);

  await EventState.findOneAndUpdate(
    {},
    { events: eventState },
    {
      upsert: true,
      new: true,
    }
  );
  console.log("Upload event sucessfully");
};
