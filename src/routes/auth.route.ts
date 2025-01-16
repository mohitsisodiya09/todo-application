import express, { Router } from 'express';
import { login, signup } from '../controllers/auth.controller';

// Create a new Router instance
export const authRouter: Router = express.Router();

// Authentication Routes
authRouter.post('/signup', signup);
authRouter.post('/login', login);
