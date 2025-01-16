import { Response } from 'express';
import { IAuthRequest } from '../middleware/validate-user';
import User, { IUser } from '../models/user.model';

/**
 * Get User Controller
 * @param req - Custom Express request object containing the authenticated user's information
 * @param res - Express response object for sending the response back to the client
 */
export const getUser = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    // Find the user in the database using the email from the authenticated user
    const user: IUser | null = await User.findOne({ email: req.user?.email });

    // If the user is not found, respond with a 404 status
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Respond with the user details
    res.status(200).json({ message: 'User details fetched successfully', user });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Update User Controller
 * @param req - Custom Express request object containing the authenticated user's information and the new data to update
 * @param res - Express response object for sending the response back to the client
 */
export const updateUser = async (req: IAuthRequest, res: Response): Promise<void> => {
  try {
    // Update the user's details in the database
    const result = await User.updateOne({ email: req.user?.email }, req.body);

    // If no documents were modified, respond with a 404 status
    if (!result.modifiedCount) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Respond with a success message
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
