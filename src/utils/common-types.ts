import { Types } from 'mongoose';

/**
 * Generic interface to define a common structure for API responses.
 * @template T - The type of data or error that this response will contain.
 */
export interface ICommonResponse<T = unknown> {
  status: boolean;
  statusCode: number;
  message: string | string[];
  data: T | [];
  error: T | [];
}

/**
 * Type alias representing a promise that resolves to a common response.
 */
export type CommonPromiseResponse = Promise<ICommonResponse>;

/**
 * Interface representing the payload structure for JWT tokens.
 */
export interface IJwtPayload {
  _id: Types.ObjectId;
  email: string;
}
