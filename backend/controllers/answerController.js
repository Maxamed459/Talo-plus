import Answer from "../models/Answers.js";
import Question from "../models/Questions.js";

export const createAnswer = async (req, res) => {
  try {
    const { content, questionId } = req.body;
    const authorId = req.user.id; // From authentication middleware

    // Validate required fields
    if (!content || !questionId) {
      return res.status(400).json({
        success: false,
        message: "Content and question ID are required",
      });
    }

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Create the answer
    const answer = await Answer.create({
      content,
      author: authorId,
      question: questionId,
    });

    // Populate author details for response
    await answer.populate("author", "username profilePicture role");

    // Add answer to question's answers array
    await Question.findByIdAndUpdate(
      questionId,
      { $push: { answers: answer._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Answer created successfully",
      answer,
    });
  } catch (error) {
    console.error("[Answer Controller] Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAnswersByQuestion = async (req, res) => {
  try {
    const { id: questionId } = req.params;
    if (!questionId) {
      return res.status(400).json({
        success: false,
        message: "Content and question ID are required",
      });
    }

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        select: "username profilePicture role _id", // Exclude _id if not needed
      })
      .sort({ createdAt: 1 }); 

    if (answers.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No answers found for this question yet",
        count: 0,
        data: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "answers found successfully.",
      count: answers.length,
      answers,
    });
  } catch (error) {
    console.log("error at: ", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
