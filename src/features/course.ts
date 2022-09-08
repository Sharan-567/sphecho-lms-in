import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./settings";

const initialState = {
  loading: false,
  courses: [],
  err: "",
};

export const fetchCourses = createAsyncThunk("courses", async (_, ThunkAPI) => {
  try {
    const headers = {
      Authorization: `token ${ThunkAPI.getState().auth.user.token}`,
    };
    const res = await axios(`${BASE_URL}master/course/`, { headers });
    return res.data;
  } catch (err) {
    return ThunkAPI.rejectWithValue("something went wrong");
  }
});

const courses = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.err = "";
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.courses = [];
        state.err = action.payload;
      });
  },
});

export default courses.reducer;
