import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String, default: null }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
