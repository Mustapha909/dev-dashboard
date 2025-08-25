import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import learningLogRoutes from './routes/learningLogRoutes.js';
import WeeklyReportRoutes from './routes/weeklyReportRoutes.js';
import getDailyQuote from './routes/dailyQuoteRoutes.js ';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/learningLogs', learningLogRoutes);
app.use('/api/reports', WeeklyReportRoutes);
app.use('/api/quotes', getDailyQuote);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// http://localhost:5001/api/weeklyFocus/
// http://localhost:5001/api/auth/login
// http://localhost:5001/api/reports/generate?weekStart=2005-08-13
