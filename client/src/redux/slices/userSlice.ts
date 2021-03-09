import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUserParams, IUser, IUserState } from '../../types';
import { getFetch, postFetch } from '../../services';
import { EndPoints } from '../../helpers';

const initialState: IUserState = {
  currentUser: {} as IUser,
  isLoading: false,
  serverMessage: {},
  isAuth: false,
};

export const authUser = createAsyncThunk('user/authUserStatus', async (params: IUserParams, { rejectWithValue }) => {
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

export const getCurrentUser = createAsyncThunk('user/getCurrentUserStatus', async () => {
  try {
    const response = await getFetch(EndPoints.GET_CURRENT_USER);
    if (response.status === 401) {
      localStorage.removeItem('fcToken');
    }
    return response.data;
  } catch (error) {
    return error;
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
      state.currentUser = {} as IUser;
      state.isAuth = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.serverMessage = {};
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.token) {
          localStorage.setItem('fcToken', JSON.stringify(payload.token));
          state.currentUser = payload.user;
          state.isAuth = true;
          return;
        }
        state.serverMessage = payload;
      })
      .addCase(authUser.rejected, (state, { payload, error }) => {
        state.isLoading = false;
        if (payload) {
          state.serverMessage = payload;
        } else {
          state.serverMessage = { error: error.message };
        }
      });

    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.serverMessage = {};
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.user) {
          state.currentUser = payload.user;
          state.isAuth = true;
          return;
        }
        state.currentUser = {} as IUser;
      });
  },
});

export default userSlice.reducer;
export const { clearServerMessages, logOut } = userSlice.actions;
