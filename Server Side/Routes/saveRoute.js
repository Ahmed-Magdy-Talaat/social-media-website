import express from "express";
import * as sc from "../Controllers/saveControllers.js";
const router = express.Router();
router.route("/").get(sc.getAllSavesForUser).post(sc.updateSaves);

export default router;
