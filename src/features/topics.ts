import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./settings";

const initialState = {
  loading: false,
  topics: [],
  err: "",
};

export const fetchTopics = createAsyncThunk("topics", async (id, ThunkAPI) => {
  try {
    const headers = {
      Authorization: `token ${ThunkAPI.getState().auth.user.token}`,
    };
    const res = await axios(`${BASE_URL}student/get-course-details/${id}/`, {
      headers,
    });

    if (res.data.message) {
      return ThunkAPI.rejectWithValue("No Topics Found");
    }

    return res.data.topics.sort((t1, t2) => t1.order - t2.order);
  } catch (err) {
    return ThunkAPI.rejectWithValue("something went wrong");
  }
});

const topics = createSlice({
  name: "topics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
        state.err = "";
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.topics = [];
        state.err = action.payload;
      });
  },
});

export default topics.reducer;
