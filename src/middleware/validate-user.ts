import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

export interface IAuthRequest extends Request {
  user?: IUser | null;
}

export const ValidateUser = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = await User.findOne({ email: decoded.email });
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
