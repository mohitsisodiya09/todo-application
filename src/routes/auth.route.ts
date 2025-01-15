import express, { Router } from 'express';
import { login, signup } from '../controllers/auth.controller';

export const authRouter: Router = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
