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

export interface IParams {
  endPoint: EndPoints;
  userData: IForm;
}
