import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFileState, IFileCreate } from '../../types';
import { getFetch, postFetch } from '../../services';
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

export const createDir = createAsyncThunk('files/createDirStatus', async ({ name, parent, type }: IFileCreate) => {
  try {
    const response = await postFetch(EndPoints.CREATE_FILE, parent ? { name, type, parent } : { name, type });
    return response.data;
  } catch (error) {
    return error;
  }
});

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setCurrentDir(state, { payload }) {
      state.currentDir = payload;
    },
  },

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
      })

      .addCase(createDir.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDir.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.files.push(payload);
        }
      })
      .addCase(createDir.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fileSlice.reducer;
export const { setCurrentDir } = fileSlice.actions;
