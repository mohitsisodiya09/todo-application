import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { ILoginRequestBody, ISignupRequestBody } from '../types/auth.type';

export const signup = async (req: Request<unknown, unknown, ISignupRequestBody>, res: Response): Promise<void> => {
  try {
    const userExists: IUser | null = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    await User.create(req.body);

    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req: Request<unknown, unknown, ILoginRequestBody>, res: Response): Promise<void> => {
  try {
    const user = (await User.findOne({ email: req.body.email }).select('+password')) as IUser | null;
    if (user && (await user.validatePassword(req.body.password))) {
      const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRATION,
      });

      res.status(200).json({
        message: 'User logged in successfully',
        user: { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
        token: token,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
