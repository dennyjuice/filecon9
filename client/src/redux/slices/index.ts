import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import fileReducer from './fileSlice';

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
