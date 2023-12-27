import mongoose from "mongoose";
import User from "./Users.js";
import Post from "./Posts.js";

const saveSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Save = mongoose.model("Save", saveSchema);
export default Save;
