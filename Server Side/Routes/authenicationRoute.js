import * as auth from "../Controllers/authenicationController.js";
import express from "express";


const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);

export default router;
