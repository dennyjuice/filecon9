import { createReducer } from '@reduxjs/toolkit';
import { IUserState } from '../../types';

const initialState: IUserState = {
  currentUser: {},
  isAuth: false,
};

export default createReducer(initialState, {});
