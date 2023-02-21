import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { Module, Topic } from "./../definations/course";
import type { Assessment } from "../definations/assessment";
import topicService from "./../services/topic.service";
import { getOrderListFromTwoList, addUniqueIdsToList } from "../services/utils";

type InitialState = {
  topics: Topic[];
  assesements: Assessment[];
  orderTopics: Module[];
};

const initialState: InitialState = {
  topics: [],
  assesements: [],
  orderTopics: [],
};

type ResponseType = {
  topics: Topic[];
  assesements: Assessment[];
  orderTopics: Module[];
};

const topics = createSlice({
  name: "topics",
  initialState,
  reducers: {
    addTopics: (state, action: PayloadAction<ResponseType>) => {
      state.topics = action.payload.topics;
      state.assesements = action.payload.assesements;
      state.orderTopics = action.payload.orderTopics;
    },
    resetTopics: (state) => {
      state.topics = [];
      state.assesements = [];
      state.orderTopics = [];
    },
  },
});

export const { addTopics, resetTopics } = topics.actions;

export default topics.reducer;
