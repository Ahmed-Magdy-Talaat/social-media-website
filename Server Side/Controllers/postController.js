import Post from "../Models/Posts.js";
import { handleError } from "./shared/sharedFunctions.js";
import Comment from "../Models/Comments.js";
import Save from "../Models/Saves.js";
import User from "../Models/Users.js";
import cloudinary from "../utils/Cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dotenv from "dotenv";
dotenv.config();

export const createPost = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const { caption, tags, comments, likes } = req.body;
  let image = {};
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.CLOUD_FOLDER}/posts/${req.user.userName}`,
        transformation: {
          width: 700, // Width of the transformed image
          height: 500, // Height of the transformed image
          crop: "fill", // Crop mode ("fill" crops to fit dimensions exactly)
          quality: "auto:best", // Quality of the transformed image
        },
      }
    );
    image = {
      url: secure_url,
      id: public_id,
    };
  }
  if (!req.file) return next(new Error("Image is required", { cause: 400 }));

  const newPost = new Post({
    creator: id,
    caption,
    tags,
    comments,
    likes,
    image,
  });

  const post = await newPost.save();

  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

export const getPostFeeds = asyncHandler(async (req, res) => {
  const data = await Post.find().populate("creator");
  const posts = data.slice().reverse();
  res.status(200).json({
    status: "success",
    data: { posts },
  });
});

//
export const getPostById = asyncHandler(async (req, res, next) => {
  const id = req.query.id;
  const post = await Post.findById(id).populate("creator");
  res.status(200).json({
    status: "success",
    data: { post },
  });
});

export const getPostsforUser = async (req, res) => {
  const id = req.query.userId;

  try {
    const posts = await Post.find({ creator: id }).populate("creator");
    res.status(200).json({
      status: "success",
      data: { posts },
    });
  } catch (err) {
    handleError(res, err);
  }
};

//update post likes
export const updatePostLikes = asyncHandler(async (req, res) => {
  const postId = req.query.id;
  const userId = req.user.id;
  const post = await Post.findById(postId);

  if (!post) {
    return next(new Error("post is not found", { cause: 404 }));
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
    return next(new Error("User Id is required", { cause: 400 }));
  }
});

export const updatePost = async (req, res, next) => {
  const { caption, tags } = req.body;
  const id = req.params.id;

  const post = await Post.findById(id);
  console.log(post.creator);
  if (req.user._id != post.creator.toString())
    return next(
      new Error("You are not authorized to update this post", { cause: 403 })
    );

  if (req.file) {
    console.log("hey");
    await cloudinary.uploader.destroy(post.image.id);
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      {
        folder: `${process.env.CLOUD_FOLDER}/posts/${req.user.userName}`,
        transformation: {
          width: 700,
          height: 500,
          crop: "fill", // You can adjust the crop mode as needed
          quality: "auto:best",
        },
      }
    );
    post.image = {
      id: public_id,
      url: secure_url,
    };
  }

  if (caption) post.caption = caption;
  if (tags) post.tags = tags;

  //save the post
  await post.save();

  res.status(200).json({
    status: "success",
    data: { post },
  });
};
//

export const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  // Delete the post
  const deletedPost = await Post.findOneAndDelete({ _id: postId });

  if (!deletedPost) return next(new Error(`Post is not found`, { cause: 404 }));

  await Save.findOneAndDelete({ _id: postId });
  await User.updateMany({ saves: postId }, { $pull: { saves: postId } });

  res.status(200).json({
    status: "success",
    data: {
      message: "Post deleted successfully",
      deletedPost,
    },
  });
});

//
export const addNewComment = asyncHandler(async (req, res) => {
  const userId = req.params.user;
  const postId = req.query.id;
  const { content } = req.params;
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
});

export const getCommentsForPost = asyncHandler(async (req, res) => {
  const postId = req.query.id;
  const comments = await Comment.find({ post: postId }).populate("user");
  res.status(200).json({
    status: "success",
    data: { comments },
  });
});

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
