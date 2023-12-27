import Save from "../Models/Saves.js";
import { handleError } from "./shared/sharedFunctions.js";
import User from "../Models/Users.js";

export const updateSaves = async (req, res) => {
  const userId = req.user.id;
  const postId = req.query.id;

  try {
    const save = await Save.findOne({ creator: userId, post: postId });
    if (save) {
      const deleted = await Save.deleteOne({ creator: userId, post: postId });
      await User.findByIdAndUpdate(userId, { $pull: { saves: postId } });

      res.status(200).json({
        status: "success",
        data: { message: "Post deleted from saves successfully", v: 0 },
      });
    } else {
      const post = new Save({
        creator: userId,
        post: postId,
      });

      await post.save();
      await User.findByIdAndUpdate(userId, { $addToSet: { saves: postId } });
      
      res.status(200).json({
        status: "success",
        data: { post, message: "Post Saved successfully", v: 0 },
      });
    }
  } catch (err) {
    handleError(res, err);
  }
};

export const getAllSavesForUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const posts = await Save.find({ creator: userId }).populate("post");
    res.status(200).json({
      status: "success",
      data: { posts, message: "Post Saved Successfully ", v: 1 },
    });
  } catch (err) {
    handleError(res, err);
  }
};
