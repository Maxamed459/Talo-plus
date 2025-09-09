import express from "express";
import {
  deleteQuestion,
  getAllQuestions,
  getQuestionById,
  getUserPosts,
  postQuestion,
  updateQuestion,
} from "../controllers/postController.js";
import { authenticate } from "../middlewares/authenticate.js";

const postRouter = express.Router();

postRouter.post("/create-post", authenticate, postQuestion);
postRouter.get("/get-user-posts", authenticate, getUserPosts);
postRouter.get("/questions", authenticate, getAllQuestions);
postRouter.get("/get-post/:id", authenticate, getQuestionById);
postRouter.put("/update-post/:id", authenticate, updateQuestion);
postRouter.delete("/delete-post/:id", authenticate, deleteQuestion);

export default postRouter;
