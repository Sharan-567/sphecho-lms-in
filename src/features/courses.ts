import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./settings";
import { AppDispatch, RootState } from "../store";

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

type InitialState = {
  loading: boolean;
  courses: Course[];
  userCourses: Course[];
  err: string;
};

const initialState: InitialState = {
  loading: false,
  courses: [],
  userCourses: [],
  err: "",
};

export const fetchAllCourses = createAsyncThunk<
  Course[],
  {},
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("courses", async (_, ThunkAPI) => {
  try {
    const headers = {
      Authorization: `token ${ThunkAPI.getState().auth.user.token}`,
    };
    const res = await axios(`${BASE_URL}student/course/`, { headers });
    return res.data;
  } catch (err) {
    return ThunkAPI.rejectWithValue("Something Went Wrong");
  }
});

export const fetchUserCourses = createAsyncThunk<
  Course[],
  {},
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("userCourses", async (_, ThunkAPI) => {
  try {
    const headers = {
      Authorization: `token ${ThunkAPI.getState().auth.user.token}`,
    };
    const res = await axios(`${BASE_URL}student/student-course/`, {
      headers,
    });
    return res.data as Course[];
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
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.courses = action.payload;
          state.err = "";
        }
      )
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.courses = [];
        if (action.payload) state.err = action.payload;
      })
      .addCase(fetchUserCourses.pending, (state) => {
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
        if (action.payload) state.err = action.payload;
      });
  },
});

export default courses.reducer;
