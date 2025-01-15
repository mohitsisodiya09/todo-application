import express, { Router } from 'express';
import { getUser, updateUser } from '../controllers/user.controller';
import { ValidateUser } from '../middleware/validate-user';

export const userRouter: Router = express.Router();

userRouter.route('/').get(ValidateUser, getUser).put(ValidateUser, updateUser);
