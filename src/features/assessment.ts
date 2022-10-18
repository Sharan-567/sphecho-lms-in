import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "./../definations/assessment";
import assessmentService from "../services/assessment.service";
import { AppDispatch, RootState } from "../store";

type InitialState = {
  loading: boolean;
  questions: Question[];
  err: string;
};

const initialState: InitialState = {
  loading: false,
  questions: [],
  err: "",
};

export const getAssessment = createAsyncThunk<
  Question[],
  number,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("getAssessment", async (id, ThunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await assessmentService.getAssessmentQuestion(token, id);
      return data;
    }
    return [];
  } catch (err) {
    return ThunkAPI.rejectWithValue("something went wrong");
  }
});

const assessment = createSlice({
  name: "assessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssessment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getAssessment.fulfilled,
        (state, action: PayloadAction<Question[]>) => {
          state.loading = false;
          state.questions = action.payload;
          state.err = "";
        }
      )
      .addCase(getAssessment.rejected, (state, action) => {
        state.loading = false;
        state.questions = [];
        state.err = action.payload as string;
      });
  },
});

export default assessment.reducer;
