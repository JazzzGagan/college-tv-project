import State from "../models/homeModel.js";

export let currentState = {
  images: {
    leftTop: [],
    leftBottom: [],
    rightTop: [],
    rightBottom: [],
  },
  videoUrl: "",
  notices: [],
  description: "",
};

export const loadStateHome = async () => {
  const state = await State.findOne();
  if (state) {
    console.log("Home State found and load", state);

    currentState = state.toObject();
  } else {
    console.log("No State found, using default");
  }
};

export const saveStateHome = async () => {
  console.log(currentState);
  await State.findOneAndUpdate({}, currentState, { upsert: true, new: true });
  console.log("upload sucessfull");
};
