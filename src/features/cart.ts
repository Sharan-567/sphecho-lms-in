import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../definations/course";

interface Cart {
  items: Course[];
}

const initialState: Cart = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<Course>) => {
      let found = false;
      for (let item of state.items) {
        if (item.id === payload.id) found = true;
      }
      if (!found) state.items.push(payload);
    },
    removeItem: (state, { payload }: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
