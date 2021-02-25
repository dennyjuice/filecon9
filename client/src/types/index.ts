export interface IUserState {
  currentUser: any;
  isLoading: boolean;
  serverMessage: any;
  isAuth: boolean;
}

export interface IForm {
  username?: string;
  email: string;
  password: string;
}
