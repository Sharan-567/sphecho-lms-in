import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { Room } from "./../definations/webinars";
import courseService from "../services/course.service";

type InitialState = {
  loading: boolean;
  rooms: Room[];
  err: string;
};

const initialState: InitialState = {
  loading: false,
  rooms: [],
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
    const token = localStorage.getItem("token");
    if (token) {
      const data = await courseService.fetchAllCourse(token);
      return data;
    }
  } catch (err) {
    return ThunkAPI.rejectWithValue(err);
  }
});

export const fetchUserCourses = createAsyncThunk<
  Rooms[],
  {},
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: string;
  }
>("userCourses", async (_, ThunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await courseService.fetchUserCourses(token);
      return data;
    }
    return [];
  } catch (err) {
    return ThunkAPI.rejectWithValue(err);
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
        if (!state.err) state.err = "";
      })
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.loading = false;
        state.courses = [];
        if (action.payload) state.err = action.payload;
      });
  },
});

export default courses.reducer;
