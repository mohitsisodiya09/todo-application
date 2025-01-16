import express, { Router } from 'express';
import { authRouter } from './auth.route';
import { todoRouter } from './todo.route';
import { userRouter } from './user.route';

// Create a new Router instance
const indexRouter: Router = express.Router();

// Group and define route prefixes
indexRouter.use('/auth', authRouter); // Authentication routes
indexRouter.use('/user', userRouter); // User management routes
indexRouter.use('/todo', todoRouter); // Todo management routes

export default indexRouter;
