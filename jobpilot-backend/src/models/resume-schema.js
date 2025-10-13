import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  tailoredFor: String, // jobId or jobTitle
  pdfUrl: String,
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
