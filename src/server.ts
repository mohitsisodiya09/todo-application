/* eslint-disable no-console */
import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.route';
import './utils/cron';

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express application
const app: Application = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define routes
app.use('/api', routes);

// Start the Express server
app.listen(port, () => console.log('Server listening on port:', port));

export default app; // Export the app instance for testing or further usage
