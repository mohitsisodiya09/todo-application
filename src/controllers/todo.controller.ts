import { Request, Response } from 'express';
import { IAuthRequest } from '../middleware/validate-user';
import Todo from '../models/todo.model';
import User from '../models/user.model';

/**
 * Create a new Todo
 * @param req - Custom request object containing the authenticated user's detail and Todo details in the request body
 * @param res - Express response object for sending the response back to the client
 */
export const createTodo = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    // Add user ID from authenticated user to the Todo
    await Todo.create({ ...req.body, userId: req.user?._id });

    res.status(201).json({ message: 'Todo created successfully' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get a Todo by ID
 * @param req - Express request object containing the Todo ID in the route parameters
 * @param res - Express response object for sending the response back to the client
 */
export const getTodoById = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id })
      .populate({ path: 'userId', select: 'firstName lastName email', model: User }) // Populate user details
      .lean();

    if (!todo) {
      res.status(404).json({ message: 'Todo detail not found' }); // Respond if Todo is not found
      return;
    }

    res.status(200).json({ message: 'Todo details fetched successfully', data: todo });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get all Todos for the authenticated user
 * @param req - Custom Express request object containing the authenticated user's ID
 * @param res - Express response object for sending the response back to the client
 */
export const getTodos = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ userId: req.user?._id })
      .populate({ path: 'userId', select: 'firstName lastName email', model: User }) // Populate user details
      .lean();

    // Respond if no Todos are found
    if (todos.length === 0) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.status(200).json({ message: 'Todos detail fetched successfully', data: todos });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Update a Todo by ID
 * @param req - Express request object containing Todo ID in the route parameters and the new data in the request body
 * @param res - Express response object for sending the response back to the client
 */
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTodo = await Todo.updateOne({ _id: req.params.id }, req.body, { new: true });

    // Respond if the Todo is not found
    if (!updatedTodo.acknowledged) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }

    res.status(200).json({ message: 'Todos detail updated successfully' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Delete a Todo by ID
 * @param req - Express request object containing the Todo ID in the route parameters
 * @param res - Express response object for sending the response back to the client
 */
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    // Find and delete the Todo item by ID
    await Todo.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
