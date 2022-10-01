import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./settings";

export interface Question {
  id: number;
  marks: number;
  question: string;
  answer: string;
  solution_url?: string;
  correct_option: string;
  option_01: string;
  option_02: string;
  option_03: string;
  option_04: string;
  option_05: string;
  match_a: string;
  match_1: string;
  match_b: string;
  match_2: string;
  match_c: string;
  match_3: string;
  match_d: string;
  match_4: string;
  match_e: string;
  match_5: string;
  match_f: string;
  match_6: string;
  cnt: number;
  topic: number;
  type: number;
}

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

export const getAssessment = createAsyncThunk(
  "getAssessment",
  async (_, ThunkAPI) => {
    try {
      const headers = {
        Authorization: `token ${ThunkAPI.getState().auth.user.token}`,
      };
      const res = await axios(
        `${BASE_URL}student/get-by-assesment-question/2/`,
        { headers }
      );
      return res.data.question;
    } catch (err) {
      return ThunkAPI.rejectWithValue("something went wrong");
    }
  }
);

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
        state.err = action.payload;
      });
  },
});

export default assessment.reducer;
