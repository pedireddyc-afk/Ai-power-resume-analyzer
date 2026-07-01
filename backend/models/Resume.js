import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  score: Number,
  feedback: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Resume', resumeSchema);
