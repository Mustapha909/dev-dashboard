import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
  createLearningLog,
  getLearningLogs,
  getLearningLogById,
  updateLearningLog,
  deleteLearningLog,
} from '../controllers/learningLogController.js';
import { validateLearningLog } from '../middleware/validateLearningLog.js';

const router = express.Router();

// Create a new learning log
router.post('/', protect, validateLearningLog, createLearningLog);

// Get all learning logs (with search, filter, pagination)
router.get('/', protect, getLearningLogs);

// Get a single log by ID
router.get('/:id', protect, getLearningLogById);

// Update a learning log
router.put('/:id', protect, validateLearningLog, updateLearningLog);

// Delete a learning log
router.delete('/:id', protect, deleteLearningLog);

export default router;
