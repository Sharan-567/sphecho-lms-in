import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../definations/course";

type ToastType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface Toast {
  showToast: boolean;
  type: ToastType;
  message: string;
}

const initialState: Toast = {
  showToast: false,
  type: "primary",
  message: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ type: ToastType; message: string }>
    ) => {
      state.showToast = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideToast: (state) => {
      state.showToast = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = cartSlice.actions;

export default cartSlice.reducer;
