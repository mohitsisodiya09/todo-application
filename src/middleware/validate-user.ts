import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

/**
 * Extending the Request interface to include a `user` property
 */
export interface IAuthRequest extends Request {
  user?: IUser | null;
}

/**
 * Middleware to validate and authenticate the user
 * @param req - Express request object, extended to include `user` property
 * @param res - Express response object for sending responses to the client
 * @param next - Express next function to pass control to the next middleware or route handler
 */
export const ValidateUser = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined; // Token to hold the JWT extracted from the `Authorization` header

  // Check if the `Authorization` header contains a Bearer token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract the token after the 'Bearer' prefix
  }

  // If no token is provided, respond with a 401 Unauthorized status
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    // Verify the token using the secret key and decode its payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Retrieve the user from the database using the email from the decoded token
    req.user = await User.findOne({ email: decoded.email });

    // If user is found, pass control to the next middleware or route handler
    next();
  } catch (error) {
    // Respond with a 403 Forbidden status if the token is invalid or expired
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
