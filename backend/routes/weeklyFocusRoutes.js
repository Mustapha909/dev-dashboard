import express from 'express';
import { createWeeklyFocus } from '../controllers/weeklyFocusController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: POST /api/focus
router.post('/', protect, createWeeklyFocus);

export default router;
