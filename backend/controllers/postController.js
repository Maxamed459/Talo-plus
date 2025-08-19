import mongoose from "mongoose";
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
        model: "User",
        select: "username role",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "here are the posts",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
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

export const getAllQuestions = async (req, res) => {
  try {
    const {
      search = "",
      tag,
      sortBy = "newest",
      limit = 10,
      page = 1,
    } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (tag) query.tags = tag;

    const skip = (Number(page) - 1) * Number(limit);

    const posts = await Question.find(query)
      .populate("author", "username profilePicture role")
      .sort(sortBy === "newest" ? { createdAt: -1 } : { createdAt: 1 })
      .skip(skip)
      .limit(Number(limit));

    const totalPosts = await Question.countDocuments(query);
    res.status(200).json({
      success: true,
      count: posts.length,
      total: totalPosts,
      currentPage: Number(page),
      totalPages: Math.ceil(totalPosts / Number(limit)),
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "The question id is required",
      });
    }

    const post = await Question.findById(id).populate({
      path: "author",
      model: "User",
      select: "username role",
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Question found successfully.",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
