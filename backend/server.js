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

app.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`);
});
