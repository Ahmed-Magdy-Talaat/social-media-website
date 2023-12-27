import Post from "../Models/Posts.js";
import { handleError } from "./shared/sharedFunctions.js";
import Comment from "../Models/Comments.js";
import { Port } from "../index.js";
import Save from "../Models/Saves.js";
import User from "../Models/Users.js";

export const createPost = async (req, res) => {
  const id = req.user.id;
  const { caption, tags, comments, likes } = req.body;
  const imageUrl = `http://localhost:4000/assets/${req.file.filename}`;
  console.log(imageUrl);

  try {
    const newPost = new Post({
      creator: id,
      caption,
      tags,
      comments,
      likes,
      imageUrl,
    });
    const post = await newPost.save();

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
    console.log(post);
  } catch (err) {
    handleError(res, err);
    console.log(err);
  }
};

export const getPostFeeds = async (req, res) => {
  try {
    const data = await Post.find().populate("creator");
    const posts = data.slice().reverse();
    res.status(200).json({
      status: "success",
      data: { posts },
    });
  } catch (err) {
    handleError(res, err);
  }
};

//
export const getPostById = async (req, res) => {
  const id = req.query.id;

  try {
    const post = await Post.findById(id).populate("creator");
    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const getPostsforUser = async (req, res) => {
  const id = req.query.userId;

  try {
    const posts = await Post.find({ creator: id });
    res.status(200).json({
      status: "success",
      data: { posts },
    });
  } catch (err) {
    handleError(res, err);
  }
};

//update post likes
export const updatePostLikes = async (req, res) => {
  const postId = req.query.id;
  const userId = req.user.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "error",
        message: "Post not found",
      });
    }

    // Check if userId is defined
    if (userId) {
      const isLiked = post.likes.get(userId);

      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
      // Save the updated post
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { likes: post.likes },
        { new: true }
      );

      return res.status(200).json({
        status: "success",
        data: { post: updatedPost },
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "UserId is required",
      });
    }
  } catch (err) {
    // Handle other errors
    console.error(err);
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { caption, tags, photo } = req.body;
  const id = req.params.id;
  console.log(id);
  let imageUrl = "";
  console.log(photo);
  if (photo != undefined)
    imageUrl = `http://localhost:4000/assets/${req.file.filename}`;
  console.log(imageUrl, caption, tags);
  try {
    let post;
    if (imageUrl !== "") {
      post = await Post.findByIdAndUpdate(
        id,
        {
          $set: {
            caption,
            imageUrl,
            tags,
          },
        },
        { new: true } // Return the updated document
      );
    } else {
      post = await Post.findByIdAndUpdate(
        id,
        {
          $set: {
            caption,
            tags,
          },
        },
        { new: true }
      );
    }
    if (post) {
      res.status(200).json({
        status: "success",
        post,
      });
    } else {
      res.status(404).json({
        status: "failed",
        message: "post not found",
      });
    }
  } catch (err) {
    handleError(res, err);
  }
};
//

export const deletePost = async (req, res) => {
  const postId = req.params.id;

  try {
    // Delete the post
    const deletedPost = await Post.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({
        status: "fail",
        data: {
          message: "Post not found",
        },
      });
    }

    await Save.findOneAndDelete({ _id: postId });
    await User.updateMany({ saves: postId }, { $pull: { saves: postId } });

    res.status(200).json({
      status: "success",
      data: {
        message: "Post deleted successfully",
        deletedPost,
      },
    });
  } catch (err) {
    handleError(res, err);
  }
};

//
export const addNewComment = async (req, res) => {
  const userId = req.params.user;
  const postId = req.query.id;
  const { content } = req.params;
  try {
    const newComment = new Comment({
      user: userId,
      post: postId,
      content,
    });

    const savedComment = await newComment.save();
    res.status(200).json({
      status: "success",
      data: {
        comment: savedComment,
      },
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const getCommentsForPost = async (req, res) => {
  const postId = req.query.id;

  try {
    const comments = await Comment.find({ post: postId }).populate("user");
    res.status(200).json({
      status: "success",
      data: { comments },
    });
  } catch (err) {
    handleError(res, err);
  }
};

export const deleteComment = async (req, res) => {
  const id = req.query.id;
  try {
    const isDeleted = await Comment.deleteById(id);
    res.json({
      status: "success",
      message: "Deleted Successfully",
    });
  } catch (err) {
    handleError(res, err);
  }
};
