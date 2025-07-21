import express from 'express';
import { getMe } from '../controllers/userController.js';
import { logoutUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getMe);
router.post('/logout', protect, logoutUser);

export default router;
