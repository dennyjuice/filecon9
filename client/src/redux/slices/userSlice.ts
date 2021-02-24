import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IForm, IUserState } from '../../types';
import { EndPoints } from '../../helpers';
import { postFetch } from '../../services';

const initialState: IUserState = {
  currentUser: {},
  isLoading: false,
  successMessage: '',
  isAuth: false,
};

export const registerUser = createAsyncThunk('user/registerUserStatus', async (userData: IForm) => {
  try {
    const response = await postFetch(EndPoints.REGISTRATION, userData);
    return response.message;
  } catch (error) {
    return error.response.data.message;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.successMessage = payload;
    });
    builder.addCase(registerUser.rejected, (state, { error }) => {
      state.isLoading = false;
      state.successMessage = error.message;
    });
  },
});

export default userSlice.reducer;
