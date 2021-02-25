import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IForm, IUserState } from '../../types';
import { EndPoints } from '../../helpers';
import { postFetch } from '../../services';

const initialState: IUserState = {
  currentUser: {},
  isLoading: false,
  serverMessage: {},
  isAuth: false,
};

export const registerUser = createAsyncThunk(
  'user/registerUserStatus',
  async (userData: IForm, { rejectWithValue }) => {
    try {
      const response = await postFetch(EndPoints.REGISTRATION, userData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

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
      state.serverMessage = payload;
    });
    builder.addCase(registerUser.rejected, (state, { payload, error }) => {
      state.isLoading = false;
      if (payload) {
        state.serverMessage = payload;
      } else {
        state.serverMessage = { error: error.message };
      }
    });
  },
});

export default userSlice.reducer;
