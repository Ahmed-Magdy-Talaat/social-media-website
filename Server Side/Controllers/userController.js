import User from "../Models/Users.js";
import { handleError } from "./shared/sharedFunctions.js";

export const getCurrentUser = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    res.json({
      status: "success",
      user,
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.json({
      status: "success",
      user,
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "succes",
      data: { users },
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const updateUser = async (req, res) => {
  const { Name, bio } = req.body;
  const userIdFromAuth = req.user.id;

  try {
    const updatedFields = { Name, bio };
    if (req.file) {
      updatedFields.imageUrl = `http://localhost:4000/assets/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(
      userIdFromAuth, // Use the authenticated user's ID for the update
      { $set: updatedFields },
      { new: true }
    );

    if (user) {
      res.status(200).json({
        status: "success",
        user,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
  } catch (err) {
    handleError(res, err);
  }
};
