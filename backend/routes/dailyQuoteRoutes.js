import express from 'express';
import { getDailyQuote } from '../controllers/dailyQuoteController.js';

const router = express.Router();

router.get('/daily', getDailyQuote);

export default router;
