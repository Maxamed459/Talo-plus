import express from "express";
import { googleSignIn, signIn, signUp } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);
userRouter.post("/googleSignIn", googleSignIn);

export default userRouter;
