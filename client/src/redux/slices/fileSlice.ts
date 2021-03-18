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

export const downloadFile = async (id: string) => {
  const response = await getFetch(`${EndPoints.DOWNLOAD_FILE}?id=${id}`, { responseType: 'blob' });
  return response.data;
};

export const uploadFiles = createAsyncThunk(
  'files/uploadFileStatus',
  async ({ file, parent, config }: any, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      if (parent) {
        formData.append('parent', parent);
      }

      const response = await postFetch(EndPoints.UPLOAD_FILE, formData, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

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
      })

      .addCase(uploadFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFiles.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.files.push(payload);
        }
      })
      .addCase(uploadFiles.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        throw new Error(payload.message);
      });
  },
});

export default fileSlice.reducer;
export const { setCurrentDir } = fileSlice.actions;
