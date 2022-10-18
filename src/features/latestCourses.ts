import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { BASE_URL } from "./settings";

export interface Course {
  id: number;
  name: string;
  tags: string;
  info_image: string;
  description: string;
  trainer_name: string;
  trainer_image: string;
  full_amount?: string;
  sample_ur?: string;
  view_all: boolean;
  enroll_all: boolean;
  featured: boolean;
}

export interface LatestestCourse {
  loading: boolean;
  latestCourses: Course[];
  err: string;
}

const initialState: LatestestCourse = {
  loading: false,
  latestCourses: [],
  err: "",
};

export const fetchLatestCourses = createAsyncThunk<
  Course[],
  {},
  {
    state: RootState;
    rejectValue: string;
  }
>("latestCourses", async (_, ThunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const headers = {
        Authorization: `token ${token}`,
      };
      const res = await axios(
        `${BASE_URL}student/course-serach/?search=latest`,
        {
          headers,
        }
      );
      return res.data.courses;
    }
  } catch (err) {
    return ThunkAPI.rejectWithValue("something went wrong");
  }
});

const courses = createSlice({
  name: "latestCourses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchLatestCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.latestCourses = action.payload;
          state.err = "";
        }
      )
      .addCase(fetchLatestCourses.rejected, (state, { payload }) => {
        state.loading = false;
        state.latestCourses = [];
        if (typeof payload == "string") state.err = payload;
      });
  },
});

export default courses.reducer;
