import express, { Router } from 'express';
import { createTodo, deleteTodo, getTodoById, getTodos, updateTodo } from '../controllers/todo.controller';
import { ValidateUser } from '../middleware/validate-user';

export const todoRouter: Router = express.Router();

todoRouter.route('/').post(ValidateUser, createTodo).get(ValidateUser, getTodos);

todoRouter.route('/:id').get(ValidateUser, getTodoById).put(ValidateUser, updateTodo).delete(ValidateUser, deleteTodo);
