import Question from "../models/Questions.js";

export const postQuestion = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const { title, description, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "title and description is required.",
      });
    }

    const newQuestion = new Question({
      title,
      description,
      tags: tags,
      author: currentUser,
    });

    await newQuestion.save();

    return res.status(201).json({
      message: "question created successfully",
      newQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Question.find({ author: req.user.id })
      .populate({
        path: "author",
        model: "Question",
        select: "username role",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "here are the posts",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const { id } = req.params; // question id from URL
    const { title, description, tags } = req.body;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Check if current user is the author
    if (question.author.toString() !== currentUser) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this question",
      });
    }

    // Update only provided fields
    if (title) question.title = title;
    if (description) question.description = description;
    if (tags) question.tags = tags;

    await question.save();

    return res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const currentUser = req.user.id;
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Check if current user is the author
    if (question.author.toString() !== currentUser) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this question",
      });
    }

    await question.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
