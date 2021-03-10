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
  query: { parent: string };
}

export interface IFileRequest extends Request {
  user: IUser;
  body: { _id: string; parent: string };
}

export interface IFile extends Document {
  name: string;
  type: string;
  accessLink: string;
  size: number;
  path: string;
  user: IUser;
  parent: Types.ObjectId;
  children: Types.ObjectId[];
}
