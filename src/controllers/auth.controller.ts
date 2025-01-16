import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { ILoginRequestBody, ISignupRequestBody } from '../types/auth.type';

/**
 * Signup Controller
 * @param req - Express request object containing login details (email and password)
 * @param res - Express response object for sending the response back to the client
 */
export const signup = async (req: Request<unknown, unknown, ISignupRequestBody>, res: Response): Promise<void> => {
  try {
    // Check if a user with the given email already exists
    const userExists: IUser | null = await User.findOne({ email: req.body.email });
    if (userExists) {
      // Respond with a 400 status if the user already exists
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create a new user in the database
    await User.create(req.body);

    // Respond with a success message
    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Login Controller
 * @param req - Express request object containing login details (email and password)
 * @param res - Express response object for sending the response back to the client
 */
export const login = async (req: Request<unknown, unknown, ILoginRequestBody>, res: Response): Promise<void> => {
  try {
    // Find the user by email and include the password field (protected by default)
    const user = (await User.findOne({ email: req.body.email }).select('+password')) as IUser | null;

    // Check if the user exists and the provided password is valid
    if (user && (await user.validatePassword(req.body.password))) {
      // Generate a JWT token with the user's ID and email
      const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      // Respond with user details and the token
      res.status(200).json({
        message: 'User logged in successfully',
        user: { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
        token: token,
      });
    } else {
      // Respond with a 401 status if authentication fails
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
