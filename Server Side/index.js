import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { fileURLToPath } from "url";
import authenicationRouter from "./Routes/authenicationRoute.js";
import userRouter from "./Routes/userRoute.js";
import postRouter from "./Routes/postRoute.js";
import { verifyAuthorization } from "./Middlewars/authorization.js";
import { createPost, updatePost } from "./Controllers/postController.js";
import saveRouter from "./Routes/saveRoute.js";
import followRouter from "./Routes/followRoute.js";
import { updateUser } from "./Controllers/userController.js";
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://social-media-website-beta.vercel.app",
  ],
  optionsSuccessStatus: 200,
  credentials: true,
};

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

export const Port = process.env.PORT || 3000;

/* file storage */
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Handling Preflight Requests
app.options("*", cors(corsOptions));

app.post("/posts", verifyAuthorization, upload.single("photo"), createPost);
app.put("/posts/:id", verifyAuthorization, upload.single("photo"), updatePost);
app.put("/users", verifyAuthorization, upload.single("photo"), updateUser);
app.use("/auth", authenicationRouter);
app.use("/posts", verifyAuthorization, postRouter);
app.use("/saves", verifyAuthorization, saveRouter);
app.use("/users", verifyAuthorization, userRouter);
app.use("/follow", verifyAuthorization, followRouter);

/* Routes With Files */

/* mongoose */
mongoose
  .connect(process.env.Mongodb_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(`${err} Connection Failed`));

app.listen(Port, () => console.log(`listening to port ${Port}`));
