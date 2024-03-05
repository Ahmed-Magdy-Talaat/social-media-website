import Jwt from "jsonwebtoken";
import User from "../Models/Users.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyAuthenication = asyncHandler(async (req, res, next) => {
  const token = req.headers.authenication;

  if (!token) {
    return res.status(401).json({ message: "Authenication token missing" });
  }
  const decoded = Jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  req.user = user;
  next();
});
