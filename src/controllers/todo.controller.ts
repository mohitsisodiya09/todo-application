import { Request, Response } from 'express';
import { IAuthRequest } from '../middleware/validate-user';
import Todo from '../models/todo.model';
import User from '../models/user.model';

export const createTodo = async (req: IAuthRequest, res: Response): Promise<void> => {
  await Todo.create({ ...req.body, userId: req.user?._id });

  res.status(201).json({ message: 'Todo created successfully' });
};

export const getTodoById = async (req: IAuthRequest, res: Response): Promise<void> => {
  const todo = await Todo.findOne({ _id: req.params.id })
    .populate({ path: 'userId', select: 'firstName lastName email', model: User })
    .lean();
  if (!todo) {
    res.status(404).json({ message: 'Todo detail not found' });
    return;
  }

  res.status(200).json({ message: 'Todo details fetched successfully', data: todo });
};

export const getTodos = async (req: IAuthRequest, res: Response): Promise<void> => {
  const todos = await Todo.find({ userId: req.user?._id })
    .populate({ path: 'userId', select: 'firstName lastName email', model: User })
    .lean();
  if (todos.length === 0) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  res.status(200).json({ message: 'Todos detail fetched successfully', data: todos });
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const updatedTodo = await Todo.updateOne({ _id: req.params._id }, req.body, { new: true });
  if (!updatedTodo.acknowledged) {
    res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json({ message: 'Todos detail fetched successfully' });
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  await Todo.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: 'Todo deleted successfully' });
};
