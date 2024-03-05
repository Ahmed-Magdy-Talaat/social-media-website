import User from "../Models/Users.js";
import { handleError } from "./shared/sharedFunctions.js";
import cloudinary from "../utils/Cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dotenv from "dotenv";
dotenv.config();

export const getCurrentUser = asyncHandler(async (req, res, next) => {
  console.log(req.user._id);
  const id = req.user._id;
  console.log(id);
  const user = await User.findById(id);
  res.json({
    status: "success",
    user,
  });
});

export const getUserById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json({
    status: "success",
    user,
  });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "succes",
    data: { users },
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { Name, userName, bio } = req.body;
  const id = req.user._id;
  const user = await User.findById(id);
  console.log(user);
  // If the user has an image, destroy it
  if (user?.image.id) await cloudinary.uploader.destroy(user.image.id);

  if (req.file) {
    console.log("hey cloud");

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.CLOUD_FOLDER}/profileImage/${req.user.userName}`,
      }
    );

    let image = {
      id: public_id,
      url: secure_url,
    };
    user.image = image;
  }

  // Update fields only if they exist in req.body
  if (Name) user.Name = Name;
  if (bio) user.bio = bio;
  if (userName) {
    const isExist = await User.findOne({ userName });
    if (isExist)
      return next(new Error("This username already exists!", { cause: 404 }));
    user.userName = userName;
  }

  await user.save();
  res.status(200).json({
    status: "success",
    user,
  });
});
