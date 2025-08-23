import mongoose from 'mongoose';

const learningLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // every log must belong to a user
    },
    date: {
      type: Date,
      required: true,
      default: Date.now, // defaults to today if not provided
    },
    topic: {
      type: String,
      required: true,
      trim: true, // remove extra spaces
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const LearningLog = mongoose.model('LearningLog', learningLogSchema);

export default LearningLog;
