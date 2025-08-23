import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  createWeeklyFocus,
  getWeeklyFocus,
  updateWeeklyFocus,
  deleteWeeklyFocus,
  getWeeklyFocusById,
} from '../controllers/weeklyFocusController.js';
import { validateWeeklyFocus } from '../middleware/validateWeeklyFocus.js';

const router = express.Router();

// Create Weekly Focus
router.post('/', protect, validateWeeklyFocus, createWeeklyFocus);

// Get all Weekly Focus (with filters & pagination)
router.get('/', protect, getWeeklyFocus);

// Get single Weekly Focus by ID
router.get('/:id', protect, getWeeklyFocusById);

// Update Weekly Focus
router.put('/:id', protect, validateWeeklyFocus, updateWeeklyFocus);

// Delete Weekly Focus
router.delete('/:id', protect, deleteWeeklyFocus);

export default router;
