import express from "express";
import * as pc from "../Controllers/postController.js";

const router = express.Router();

router.route("/").get(pc.getPostFeeds).patch(pc.updatePostLikes);

router.route("/:id").put(pc.updatePost).delete(pc.deletePost);

router.route("/search").get(pc.getPostById);
router.route("/user").get(pc.getPostsforUser);
router.route("/comment").post(pc.addNewComment);
export default router;
