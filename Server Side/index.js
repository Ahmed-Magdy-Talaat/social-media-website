import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import multer from "multer";
import mongoose from "mongoose";
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
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

export const Port = process.env.PORT || 3000;
/* file storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.post("/posts", verifyAuthorization, upload.single("photo"), createPost);
app.put("/posts/:id", verifyAuthorization, upload.single("photo"), updatePost);
app.put("/users", verifyAuthorization, upload.single("photo"), updateUser);
app.use("/auth", authenicationRouter);
app.use("/posts", verifyAuthorization, postRouter);
app.use("/saves", verifyAuthorization, saveRouter);
app.use("/users", verifyAuthorization, userRouter);
app.use("/follow", verifyAuthorization, followRouter);

/*Routes With Files */

/*mongoose*/

mongoose
  .connect(process.env.Mongodb_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(`${err} Connection Failed`));
app.listen(Port, () => console.log(`listening to port ${Port}`));
