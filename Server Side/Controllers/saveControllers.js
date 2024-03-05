import Save from "../Models/Saves.js";
import User from "../Models/Users.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const updateSaves = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const postId = req.query.id;

  const save = await Save.findOne({ user: userId, post: postId });
  if (save) {
    const deleted = await Save.deleteOne({ user: userId, post: postId });
    await User.findByIdAndUpdate(userId, { $pull: { saves: postId } });

    res.status(200).json({
      status: "success",
      data: { message: "Post deleted from saves successfully", v: 0 },
    });
  } else {
    const post = new Save({
      user: userId,
      post: postId,
    });

    await post.save();
    await User.findByIdAndUpdate(userId, { $addToSet: { saves: postId } });

    res.status(200).json({
      status: "success",
      data: { post, message: "Post Saved successfully", v: 0 },
    });
  }
});

export const getAllSavesForUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const posts = await Save.find({ user: userId }).populate({
    path: "post",
    populate: {
      path: "creator",
      model: "User",
    },
  });
  res.status(200).json({
    status: "success",
    data: { posts, message: "Post Saved Successfully ", v: 1 },
  });
});
