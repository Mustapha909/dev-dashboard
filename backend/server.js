import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'; // for future /me and user info
import authRoutes from './routes/authRoutes.js'; // login/register
import weeklyFocusRoutes from './routes/weeklyFocusRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/weeklyFocus', weeklyFocusRoutes);

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
