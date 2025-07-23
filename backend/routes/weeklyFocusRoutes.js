import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  createWeeklyFocus,
  getWeeklyFocus,
  updateWeeklyFocus,
  deleteWeeklyFocus,
  getWeeklyFocusById,
} from '../controllers/weeklyFocusController.js';

const router = express.Router();

router.post('/', protect, createWeeklyFocus);
router.get('/', protect, getWeeklyFocus);
router.get('/:id', protect, getWeeklyFocusById);
router.put('/:id', protect, updateWeeklyFocus);
router.delete('/:id', protect, deleteWeeklyFocus);

export default router;
