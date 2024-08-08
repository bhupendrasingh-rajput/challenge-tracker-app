import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import challengeRoutes from './routes/challengeRoutes';
import authRoutes from './routes/authRoutes';
import { Request, Response } from 'express';

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    'Title': 'Challenge Tracker Server',
    'Status': 'Active',
    'Date & Time': new Date().toLocaleString()
  })
})
app.use('/api/auth', authRoutes);
app.use('/api/challenges', challengeRoutes);

// Error handling for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
