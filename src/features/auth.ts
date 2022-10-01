import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./settings";

type InitialState = {
  loading: boolean;
  isLoggedIn: boolean;
  user: {
    token: string;
  };
  err?: string;
};

type ResponseData = {
  token: string;
};

const initialState: InitialState = {
  loading: true,
  isLoggedIn: false,
  user: {
    token: "",
  },
  err: "",
};

export const login = createAsyncThunk<
  ResponseData,
  FormData,
  { rejectValue: string; serializedErrorType: string }
>("/login", async (data, thunkAPI) => {
  return axios
    .post(`${BASE_URL}accounts/login/`, data)
    .then((res) => res.data)
    .catch((err) => thunkAPI.rejectWithValue("something went wrong"));
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user.token = action.payload.token;
        state.err = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        if (action.payload) {
          state.err = action.payload;
        } else {
          state.err = action.error;
        }
      });
  },
});

export const {} = auth.actions;
export default auth.reducer;
