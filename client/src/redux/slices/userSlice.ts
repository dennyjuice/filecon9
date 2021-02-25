import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IParams, IUserState } from '../../types';
import { postFetch } from '../../services';

const initialState: IUserState = {
  currentUser: {},
  isLoading: false,
  serverMessage: {},
  isAuth: false,
};

export const authUser = createAsyncThunk('user/registerUserStatus', async (params: IParams, { rejectWithValue }) => {
  try {
    const response = await postFetch(params.endPoint, params.userData);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearServerMessages(state) {
      state.serverMessage = {};
    },

    logOut(state) {
      state.currentUser = {};
      state.isAuth = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state) => {
      state.serverMessage = {};
      state.isLoading = true;
    });

    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload.token) {
        localStorage.setItem('fcToken', JSON.stringify(payload.token));
        state.currentUser = payload.user;
        state.isAuth = true;
        return;
      }
      state.serverMessage = payload;
    });

    builder.addCase(authUser.rejected, (state, { payload, error }) => {
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
export const { clearServerMessages, logOut } = userSlice.actions;
