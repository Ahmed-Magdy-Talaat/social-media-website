import Jwt from "jsonwebtoken";

export const verifyAuthorization = async (req, res, next) => {
  console.log("hello");
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
  next();
};
