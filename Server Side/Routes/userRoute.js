import express from "express";
import * as uc from "../Controllers/userController.js";
import { verifyAuthenication } from "../Middlewars/authenication.js";
import { fileUpload } from "../utils/fileUpload.js";
const router = express.Router();
router.get("/", verifyAuthenication, uc.getCurrentUser);
router.put(
  "/",
  verifyAuthenication,
  fileUpload().single("photo"),
  uc.updateUser
);
router.get("/all", verifyAuthenication, uc.getAllUsers);
router.route("/:id").get(uc.getUserById);

export default router;
