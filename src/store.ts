import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  auth,
  courses,
  topics,
  assessment,
  latestCourses,
  cart,
} from "./features";

export const store = configureStore({
  reducer: {
    auth,
    courses,
    topics,
    assessment,
    latestCourses,
    cart,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
