import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { Topic } from "./../definations/course";
import type { Assessment } from "../definations/assessment";
import topicService from "./../services/topic.service";
import { getOrderListFromTwoList, addUniqueIdsToList } from "../services/utils";

type InitialState = {
  loading: boolean;
  topics: Topic[];
  assesements: Assessment[];
  orderTopics: (Topic | Assessment)[];
  err: string;
};

const initialState: InitialState = {
  loading: false,
  topics: [],
  assesements: [],
  orderTopics: [],
  err: "",
};

type ResponseType = {
  topics: Topic[];
  assesements: Assessment[];
  orderTopics: (Topic | Assessment)[];
};

export const fetchTopics = createAsyncThunk<
  ResponseType,
  string,
  { state: RootState; rejectValue: string }
>("topics", async (id, ThunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const { topics, assesements } = await topicService.fetchTopics(token, id);
      const orderTopics = getOrderListFromTwoList<Topic, Assessment>(
        topics,
        assesements
      );
      const orderTopicsWithCustomIds = addUniqueIdsToList<Topic | Assessment>(
        orderTopics
      );
      return {
        topics,
        assesements,
        orderTopics: orderTopicsWithCustomIds,
      };
    }
    return { topics: [], assesements: [], orderTopics: [] };
  } catch (error) {
    return ThunkAPI.rejectWithValue(error);
  }
});

const topics = createSlice({
  name: "topics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTopics.fulfilled,
        (state, action: PayloadAction<ResponseType>) => {
          state.loading = false;
          state.topics = action.payload.topics;
          state.assesements = action.payload.assesements;
          state.orderTopics = action.payload.orderTopics;
          state.err = "";
        }
      )
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.topics = [];
        state.orderTopics = [];
        state.err = action.payload as string;
      });
  },
});

export default topics.reducer;
