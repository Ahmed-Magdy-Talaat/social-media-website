import mongoose from "mongoose";
import User from "./Users.js";
import Comment from "./Comments.js";
const postSchema = mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: {
      type: Map,
      of: Boolean,
      default: new Map(),
    },

    caption: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },
    image: {
      id: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
