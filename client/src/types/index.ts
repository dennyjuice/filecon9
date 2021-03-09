import { EndPoints } from '../helpers';

export interface IUserState {
  currentUser: IUser;
  isLoading: boolean;
  serverMessage: { error?: string; message?: string };
  isAuth: boolean;
}

export interface IForm {
  username?: string;
  email: string;
  password: string;
}

export interface IUser extends IForm {
  diskSpace: number;
  usedSpace: number;
  avatar?: string;
}

export interface IUserParams {
  endPoint: EndPoints;
  userData: IForm;
}

export interface IFileState {
  files: IFile[];
  currentDir: string;
  isLoading: boolean;
}

export interface IFileCreate {
  name: string;
  type: string;
  parent?: string;
}

export interface IFile extends IFileCreate {
  size: number;
  path: string;
  date: Date;
  user: IUser;
  children: string[];
  _id: string;
}
