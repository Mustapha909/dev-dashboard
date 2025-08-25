import WeeklyReport from '../models/WeeklyReport.js';
import LearningLog from '../models/LearningLog.js';
import WeeklyFocus from '../models/WeeklyFocus.js';
import { handleServerError } from '../utils/errorHandler.js';
import { checkOwnershipOrFail } from '../utils//checkOwnership.js';

/**
 * @desc    Generate a weekly report for a specific week
 * @route   GET /api/reports/generate?weekStart=YYYY-MM-DD
 * @access  Private
 */

export const generateWeeklyReport = async (req, res) => {
  try {
    const { weekStart } = req.query;
    if (!weekStart) {
      return res.status(400).json({ message: 'Week start date is required' });
    }

    const weekStartDate = new Date(weekStart);
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);

    // Completed weekly focus for the user in the week
    const completedFocus = await WeeklyFocus.find({
      user: req.user._id,
      weekStartDate: { $gte: weekStartDate, $lte: weekEndDate },
      status: 'completed',
    });

    // Learning logs for the user in the same week
    const learningLogs = await LearningLog.find({
      user: req.user._id,
      date: { $gte: weekStartDate, $lte: weekEndDate },
    });

    const reportData = {
      user: req.user._id,
      weekStartDate,
      weekEndDate,
      completedFocusCount: completedFocus.length,
      learningLogCounts: learningLogs.length,
      weeklyProgress: [
        { metric: 'focusCompleted', count: completedFocus.length },
        { metric: 'learningLogs', count: learningLogs.length },
      ],
    };

    const newReport = await WeeklyReport.create(reportData);
    res.status(201).json(newReport);
  } catch (error) {
    handleServerError(res, error, 'Could not generate weekly report');
  }
};

/**
 * @desc    Get a weekly report by week start date
 * @route   GET /api/reports?weekStart=YYYY-MM-DD
 * @access  Private
 */

export const getWeeklyReportByWeekStart = async (req, res) => {
  try {
    const { weekStart } = req.query;
    if (!weekStart) {
      return res.status(400).json({ message: 'Week start date is required' });
    }

    const weekStartDate = new Date(weekStart);

    const report = await WeeklyReport.findOne({
      user: req.user._id,
      weekStartDate,
    });

    if (!report) {
      return res.status(404).json({ message: 'Weekly report not found' });
    }

    if (!checkOwnershipOrFail(res, report.user, req.user._id)) return;

    res.status(200).json(report);
  } catch (error) {
    handleServerError(res, error, 'Could not fetch weekly report');
  }
};

// @desc    Get a single weekly report by ID
// @route   GET /api/weeklyReports/:id
// @access  Private
export const getWeeklyReportsById = async (req, res) => {
  try {
    const report = await WeeklyReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Weekly report not found' });
    }

    if (!checkOwnershipOrFail(res, report.user, req.user._id)) return;
    res.status(200).json(report);
  } catch (error) {
    handleServerError(res, error, 'Could not fetch weekly report');
  }
};

// @desc    Get all weekly reports for logged-in user
// @route   GET /api/reports
// @access  Private
export const getAllWeeklyReports = async (req, res) => {
  try {
    const reports = await WeeklyReport.find({ user: req.user._id }).sort({
      weekStartDate: -1,
    });

    res.status(200).json(reports);
  } catch (error) {
    handleServerError(res, error, 'Could not fetch weekly reports');
  }
};
