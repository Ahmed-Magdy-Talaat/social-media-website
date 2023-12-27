import mongoose from "mongoose";
import User from "./Users.js";

const followSchema = mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  },
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  },
});

const Followship = mongoose.model("Follower", followSchema);
export default Followship;
