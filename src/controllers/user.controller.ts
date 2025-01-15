import { Response } from 'express';
import { IAuthRequest } from '../middleware/validate-user';
import User, { IUser } from '../models/user.model';

export const getUser = async (req: IAuthRequest, res: Response): Promise<void> => {
  const user: IUser | null = await User.findOne({ email: req.user?.email });
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json({ message: 'User details fetched successfully', user });
};

export const updateUser = async (req: IAuthRequest, res: Response): Promise<void> => {
  const result = await User.updateOne({ email: req.user?.email }, req.body);
  if (!result.modifiedCount) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json({ message: 'User details updated successfully' });
};
