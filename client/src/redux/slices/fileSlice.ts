import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFileState } from '../../types';
import { getFetch } from '../../services';
import { EndPoints } from '../../helpers';

const initialState: IFileState = {
  files: [],
  currentDir: '',
  isLoading: false,
};

export const getFiles = createAsyncThunk('files/getFilesStatus', async (params: string) => {
  try {
    const response = await getFetch(`${EndPoints.GET_FILES}${params ? `?parent=${params}` : ''}`);
    return response.data;
  } catch (error) {
    return error;
  }
});

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFiles.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.files = payload;
        }
      })
      .addCase(getFiles.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fileSlice.reducer;
// export const {  } = fileSlice.actions;
