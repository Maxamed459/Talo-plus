import express from "express";
import {
  deleteQuestion,
  getAllQuestions,
  getUserPosts,
  postQuestion,
  updateQuestion,
} from "../controllers/postController.js";
import { authenticate } from "../middlewares/authenticate.js";

const postRouter = express.Router();

postRouter.post("/create-post", authenticate, postQuestion);
postRouter.get("/get-user-posts", authenticate, getUserPosts);
postRouter.get("/get-all-posts", authenticate, getAllQuestions);
postRouter.put("/update-post/:id", authenticate, updateQuestion);
postRouter.delete("/delete-post/:id", authenticate, deleteQuestion);

export default postRouter;
