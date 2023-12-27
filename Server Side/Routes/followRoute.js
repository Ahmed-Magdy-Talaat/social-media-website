import express from "express";
import * as fc from "../Controllers/followController.js";

const router = express.Router();

router.route("/").get(fc.getAllFollowersAndFollowing).post(fc.handleFollower);
router.route("/check").post(fc.checkFollowing);
export default router;
