/* eslint-disable no-console */
import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import { authRouter } from './routes/auth.route';
import { todoRouter } from './routes/todo.route';
import { userRouter } from './routes/user.route';
import './utils/cron';

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);

app.listen(port, () => console.log('Server listening on port:', port));
