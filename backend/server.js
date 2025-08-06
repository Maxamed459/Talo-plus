import express, { json } from "express";
import { PORT } from "./config/config.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cors from "cors";

const app = express();
app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/user", userRouter);

await connectDB();

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`server runs on http://localhost:${PORT}`);
  });
}

// export server for vercel
export default server;
