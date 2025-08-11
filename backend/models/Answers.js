import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isVerified: { type: Boolean, default: false }, // admin can verify correct answer
  },
  { timestamps: true }
);

export default mongoose.model("Answer", answerSchema);
