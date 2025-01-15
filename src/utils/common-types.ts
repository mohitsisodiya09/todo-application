import { Types } from 'mongoose';

export interface ICommonResponse<T = unknown> {
  status: boolean;
  statusCode: number;
  message: string | string[];
  data: T | [];
  error: T | [];
}

export type CommonPromiseResponse = Promise<ICommonResponse>;

export interface IJwtPayload {
  _id: Types.ObjectId;
  email: string;
}
