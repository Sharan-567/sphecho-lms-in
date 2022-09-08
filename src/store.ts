import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth";
import courses from "./features/course";

export const store = configureStore({
  reducer: {
    auth,
    courses,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
