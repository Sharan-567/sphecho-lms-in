import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./settings";

const initialState = {
  loading: false,
  courses: [],
  userCourses: [],
  err: "",
};

export const fetchAllCourses = createAsyncThunk(
  "courses",
  async (_, ThunkAPI) => {
    try {
      const headers = {
        Authorization: `token ${ThunkAPI.getState().auth.user.token}`,
      };
      const res = await axios(`${BASE_URL}student/course/`, { headers });
      return res.data;
    } catch (err) {
      return ThunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const fetchUserCourses = createAsyncThunk(
  "userCourses",
  async (_, ThunkAPI) => {
    try {
      const headers = {
        Authorization: `token ${ThunkAPI.getState().auth.user.token}`,
      };
      const res = await axios(`${BASE_URL}student/student-course/`, {
        headers,
      });
      return res.data;
    } catch (err) {
      return ThunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const courses = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.err = "";
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.courses = [];
        state.err = action.payload;
      })
      .addCase(fetchUserCourses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.userCourses = action.payload;
        state.err = "";
      })
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.loading = false;
        state.courses = [];
        state.err = action.payload;
      });
  },
});

export default courses.reducer;
