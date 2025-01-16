import express, { Router } from 'express';
import { getUser, updateUser } from '../controllers/user.controller';
import { ValidateUser } from '../middleware/validate-user';

// Create a new Router instance
export const userRouter: Router = express.Router();

// User Management Routes
userRouter.route('/').get(ValidateUser, getUser).put(ValidateUser, updateUser);
