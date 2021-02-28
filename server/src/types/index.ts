import { Document, Types } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  diskSpace: number;
  usedSpace: number;
  avatar?: string;
  files: Types.ObjectId[];
}

export interface IUserRequest extends Request {
  user: IUser;
}
