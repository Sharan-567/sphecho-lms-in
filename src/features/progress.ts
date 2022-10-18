import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { NormalizedProgress } from "../definations/course";
import { RootState } from "../store";
import progressService from "./../services/progress.service";

type InitialState = {
  loading: boolean;
  progress: NormalizedProgress;
  err: string;
};

const initialState: InitialState = {
  loading: false,
  progress: {},
  err: "",
};

export const fetchAllProgress = createAsyncThunk<
  NormalizedProgress,
  {},
  { state: RootState; rejectValue: string }
>("FetchAllprogress", async (_, ThunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await progressService.fetchAllProgress(token);
      return data;
    }
    return {};
  } catch (error) {
    return ThunkAPI.rejectWithValue(error);
  }
});

type DataType = { course: string; topic?: number; assessment?: number };

export const updateProgress = createAsyncThunk<
  Promise<string>,
  DataType,
  { state: RootState; rejectValue: string }
>("updateProgress", async (body, ThunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      let data = await progressService.updateProgress(token, body);
      return data;
    }
  } catch (error) {
    return ThunkAPI.rejectWithValue(error);
  }
});

const progresses = createSlice({
  name: "progresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllProgress.fulfilled,
        (state, action: PayloadAction<NormalizedProgress>) => {
          state.loading = false;
          state.progress = action.payload;
        }
      )
      .addCase(fetchAllProgress.rejected, (state, action) => {
        state.loading = false;
        state.progress = {};
        state.err = action.payload as string;
      });
  },
});

export default progresses.reducer;
