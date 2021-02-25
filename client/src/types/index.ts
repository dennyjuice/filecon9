import { EndPoints } from '../helpers';

export interface IUserState {
  currentUser: any;
  isLoading: boolean;
  serverMessage: any;
  isAuth: boolean;
}

export interface IParams {
  endPoint: EndPoints;
  userData: IForm;
}

export interface IForm {
  username?: string;
  email: string;
  password: string;
}
