import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },

    userName: {
      type: String,
      required: true,
      min: 3,
      max: 50,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 50,
    },

    bio: {
      type: String,
      default: "",
    },
    image: {
      type: {
        id: String,
        url: String,
      },
      default: { id: "", url: "" },
    },
    saves: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
