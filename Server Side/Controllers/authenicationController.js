import User from "../Models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  console.log("hey");

  try {
    const { Name, userName, email, password, bio, imageUrl, imageId } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

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
  } catch (err) {
    if (err.code === 11000 && err.keyPattern) {
      if (err.keyPattern.userName) {
        return res.status(400).json({
          message: "Username is already taken",
        });
      } else if (err.keyPattern.email) {
        return res.status(400).json({
          message: "Email is already registered",
        });
      }
    } else {
      console.log(err.message);
      res.status(500).json({
        message: "Server Error",
        error: err.message,
      });
    }
  }

  // ...
};

//

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Email Doesn't exist",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});

    delete user.password;

    res.status(200).json({
      message: "Success",
      data: { token, user },
    });
  } else {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }
};
