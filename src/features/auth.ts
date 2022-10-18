import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auth.service";

type InitialState = {
  loading: boolean;
  isLoggedIn: boolean;
  err?: string;
  userType: string;
};

type ResponseData = {
  token: string;
  userType: string;
};

const initialState: InitialState = {
  loading: true,
  isLoggedIn: false,
  userType: "",
  err: "",
};

export const login = createAsyncThunk<
  ResponseData,
  { username: string; password: string; type: string },
  { rejectValue: string; serializedErrorType: string }
>("/login", async (data, thunkAPI) => {
  try {
    const res = await authService.login(data);
    localStorage.setItem("token", res.token);
    return { ...res, userType: "SuperUser" };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getOTP = createAsyncThunk<
  { hash: string },
  { phone: string; usertype: string },
  { rejectValue: string; serializedErrorType: string }
>("/getOtp", async (data, thunkAPI) => {
  try {
    const res = await authService.getOTP(data);
    localStorage.setItem("token", res.token);
    return { ...res, userType: "SuperUser" };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

type VerifyOTPReqData = {
  mobile: string;
  hash: string;
  name: string;
  otp: string;
};

export const verifyOTP = createAsyncThunk<
  ResponseData,
  VerifyOTPReqData,
  { rejectValue: string; serializedErrorType: string }
>("/verifyOtp", async (data, thunkAPI) => {
  try {
    const res = await authService.verifyOTP(data);
    localStorage.setItem("token", res.token);
    return { ...res, userType: "patient" };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
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
        state.err = "";
        state.userType = action.payload.userType;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.err = action.payload;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.userType = action.payload.userType;
        state.isLoggedIn = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.err = action.payload;
      });
  },
});

export const {} = auth.actions;
export default auth.reducer;
