import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../features/User/userSlice';
import fileReducer from '../features/FileDisk/fileSlice';

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
