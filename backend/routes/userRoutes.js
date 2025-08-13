import express from "express";
import {
  googleSignIn,
  logout,
  signIn,
  signUp,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);
userRouter.post("/logout", logout);
userRouter.post("/googleSignIn", googleSignIn);

export default userRouter;
