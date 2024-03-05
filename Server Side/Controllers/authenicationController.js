import User from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res, next) => {
  const { Name, userName, email, password, bio, imageUrl, imageId } = req.body;

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //check for email existance
  let isExist = await User.findOne({ email });
  if (isExist)
    return next(new Error("Email is already exists", { cause: 400 }));

  //check for userName
  isExist = await User.findOne({ userName });
  if (isExist)
    return next(new Error("username is already exists", { cause: 400 }));

  // Create a new instance of the User model
  const newUser = new User({
    Name,
    userName,
    email,
    password: passwordHash,
    bio,
    imageUrl,
    imageId,
  });

  // Save the user to the database
  const savedUser = await newUser.save();

  res.status(201).json({
    message: "User Created Successfully",
    data: { user: savedUser },
  });
  // ...
});

//

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return next(new Error("User is not found", { cause: 404 }));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return next(new Error("Invalid Credentials"));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});

  delete user.password;

  res.status(200).json({
    message: "Success",
    data: { token, user },
  });
};
