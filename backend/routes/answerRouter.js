import express from "express";
import {
  createAnswer,
  getAnswersByQuestion,
} from "../controllers/answerController.js";
import { authenticate } from "../middlewares/authenticate.js";

const answerRouter = express.Router();

answerRouter.post("/create-answer", authenticate, createAnswer);
answerRouter.get("/get-answers/:id", authenticate, getAnswersByQuestion);

export default answerRouter;
