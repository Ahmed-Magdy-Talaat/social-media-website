import express from "express";
import * as sc from "../Controllers/saveControllers.js";
import { verifyAuthenication } from "../Middlewars/authenication.js";
const router = express.Router();
router
  .route("/")
  .get(verifyAuthenication, sc.getAllSavesForUser)
  .post(verifyAuthenication, sc.updateSaves);

export default router;
