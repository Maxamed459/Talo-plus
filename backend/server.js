import express, { json } from "express";
import { PORT } from "./config/config.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(json());

app.use("/api/user", userRouter);

await connectDB();

app.listen(PORT, () => {
  console.log(`server runs on http://localhost:${PORT}`);
});
