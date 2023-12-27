import express from "express";
import * as uc from "../Controllers/userController.js";
import { updatePost } from "../Controllers/postController.js";
const router = express.Router();
router.route("/").get(uc.getCurrentUser).put(uc.updateUser);
router.route("/all").get(uc.getAllUsers);
router.route("/:id").get(uc.getUserById);

export default router;
