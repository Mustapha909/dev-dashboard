import mongoose from 'mongoose';

const weeklyFocusSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    priority: {
      type: Number, // e.g., 1 (high) to 5 (low)
      default: 3,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const WeeklyFocus = mongoose.model('WeeklyFocus', weeklyFocusSchema);

export default WeeklyFocus;
