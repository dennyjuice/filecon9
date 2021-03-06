import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteFetch, getFetch, postFetch } from '../../services';
import { EndPoints } from '../../helpers';
import { IUser } from '../User/userSlice';

const initialState: IFileState = {
  files: [],
  currentDir: '',
  isLoading: false,
};

export const getFiles = createAsyncThunk('files/getFilesStatus', async (params: string) => {
  try {
    const response = await getFetch(`${EndPoints.FILES_DIR}${params ? `?parent=${params}` : ''}`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const searchFiles = createAsyncThunk('files/searchFilesStatus', async (params: string) => {
  try {
    const response = await getFetch(`${EndPoints.FILES_DIR}/search?search=${params}`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const createDir = createAsyncThunk('files/createDirStatus', async ({ name, parent, type }: IFileCreate) => {
  try {
    const response = await postFetch(EndPoints.FILES_DIR, parent ? { name, type, parent } : { name, type });
    return response.data;
  } catch (error) {
    return error;
  }
});

export const deleteFile = createAsyncThunk('files/deleteFileStatus', async (id: string) => {
  try {
    const response = await deleteFetch(`${EndPoints.FILES_DIR}/?id=${id}`);
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
    sortByName(state) {
      state.files.sort((prev, next) => {
        if (prev.name < next.name) return -1;
        if (prev.name > next.name) return 1;
        return 0;
      });
    },
    sortByDate(state) {
      state.files.sort((prev, next) => new Date(prev.date).getTime() - new Date(next.date).getTime());
    },
    sortBySize(state) {
      state.files.sort((prev, next) => prev.size - next.size);
    },
    setCurrentDir(state, { payload }) {
      state.currentDir = payload;
    },
    deleteFileAction(state, { payload }) {
      // eslint-disable-next-line no-underscore-dangle
      state.files = state.files.filter((file) => file._id !== payload);
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

      .addCase(searchFiles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchFiles.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload) {
          state.files = payload;
        }
      })
      .addCase(searchFiles.rejected, (state) => {
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
      })

      .addCase(deleteFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default fileSlice.reducer;
export const { setCurrentDir, deleteFileAction, sortByName, sortByDate, sortBySize } = fileSlice.actions;

export interface IFileState {
  files: IFile[];
  currentDir: string;
  isLoading: boolean;
}

export interface IFileCreate {
  name: string;
  type: string;
  parent?: string;
}

export interface IFile extends IFileCreate {
  size: number;
  path: string;
  date: Date;
  user: IUser;
  children: string[];
  _id: string;
}
