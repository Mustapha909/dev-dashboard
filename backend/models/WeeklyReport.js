import mongoose from 'mongoose';

const weeklyReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // every log must belong to a user
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    weekEndDate: {
      type: Date,
      required: true,
    },
    completedFocusCount: {
      type: Number,
      default: 0,
    },
    LearningLogCounts: {
      type: Number,
      default: 0,
    },
    weeklyProgress: [
      {
        metric: {
          type: String,
          required: true,
        },
        count: {
          type: Number,
          default: 0,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const WeeklyReport = mongoose.model('WeeklyReport', weeklyReportSchema);

export default WeeklyReport;
