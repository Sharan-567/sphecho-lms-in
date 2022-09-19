import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./settings";

const initialState = {
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
      .addCase(getAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
        state.err = "";
      })
      .addCase(getAssessment.rejected, (state, action) => {
        state.loading = false;
        state.questions = [];
        state.err = action.payload;
      });
  },
});

export default assessment.reducer;
