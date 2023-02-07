import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { NormalizedProgress } from "../definations/course";
import { RootState } from "../store";
import progressService from "./../services/progress.service";

type InitialState = {
  progress: NormalizedProgress;
};

const initialState: InitialState = {
  progress: {},
};

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
  reducers: {
    addAllprogress: (state, action: PayloadAction<NormalizedProgress>) => {
      state.progress = action.payload;
    },
  },
});

export const { addAllprogress } = progresses.actions;

export default progresses.reducer;
