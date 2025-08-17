import express, { json } from "express";
import { NODE_ENV, PORT } from "./config/config.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";
import postRouter from "./routes/postRouter.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      const whitelist = [
        "http://localhost:3000",
        "https://talo-plus.vercel.app",
      ];
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

await connectDB();

if (NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`server runs on http://localhost:${PORT}`);
  });
}

// export server for vercel
export default app;
