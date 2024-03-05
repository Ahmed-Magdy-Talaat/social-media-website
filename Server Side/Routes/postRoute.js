import express from "express";
import * as pc from "../Controllers/postController.js";
import cloudinary from "../utils/Cloudinary.js";
import { fileUpload } from "../utils/fileUpload.js";
import { verifyAuthenication } from "../Middlewars/authenication.js";
const router = express.Router();

router
  .route("/")
  .get(verifyAuthenication, pc.getPostFeeds)
  .patch(verifyAuthenication, pc.updatePostLikes);

router.delete("/:id", verifyAuthenication, pc.deletePost);

router.get("/search", verifyAuthenication, pc.getPostById);
router.get("/user", verifyAuthenication, pc.getPostsforUser);
router.post(
  "/",
  verifyAuthenication,
  fileUpload().single("photo"),
  pc.createPost
);
router.put(
  "/:id",
  verifyAuthenication,
  fileUpload().single("photo"),
  pc.updatePost
);
export default router;
