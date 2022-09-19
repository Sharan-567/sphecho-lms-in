import { configureStore } from "@reduxjs/toolkit";

import { auth, courses, topics, assessment } from "./features";

export const store = configureStore({
  reducer: {
    auth,
    courses,
    topics,
    assessment,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
