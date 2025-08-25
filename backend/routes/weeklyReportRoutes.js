import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  generateWeeklyReport,
  getWeeklyReportByWeekStart,
  getWeeklyReportsById,
  getAllWeeklyReports,
} from '../controllers/weeklyReportController.js';

const router = express.Router();

// Generate a weekly report for a specific week
router.get('/generate', protect, generateWeeklyReport);

// Get a weekly report by week start date
router.get('/by-week-start', protect, getWeeklyReportByWeekStart);

// Get a single weekly report by ID
router.get('/:id', protect, getWeeklyReportsById);

// Get all weekly reports for the logged-in user
router.get('/', protect, getAllWeeklyReports);

export default router;
