export interface IUserState {
  currentUser: any;
  isLoading: boolean;
  successMessage: string;
  isAuth: boolean;
}

export interface IForm {
  username?: string;
  email: string;
  password: string;
}
