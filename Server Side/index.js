import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import authenicationRouter from "./Routes/authenicationRoute.js";
import userRouter from "./Routes/userRoute.js";
import postRouter from "./Routes/postRoute.js";
import saveRouter from "./Routes/saveRoute.js";
import followRouter from "./Routes/followRoute.js";
import { globalResponse } from "./utils/globalResponse.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
onst allowedOrigins = [
  "http://localhost:5173",
  "https://social-media-website-beta.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

export const Port = process.env.PORT || 3000;

/* mongoose */
mongoose
  .connect(process.env.Mongodb_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(`${err} Connection Failed`));

// Handling Preflight Requests
app.options("*", cors(corsOptions));

app.use("/auth", authenicationRouter);
app.use("/posts", postRouter);
app.use("/saves", saveRouter);
app.use("/users", userRouter);
app.use("/follow", followRouter);

app.use(globalResponse);

app.listen(Port, () => console.log(`listening to port ${Port}`));
