import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Patient } from "../definations/patients";
import authService from "../services/auth.service";
import type { RootState } from "./../store";
import { addPatients } from "./patient";

type InitialState = {
  loading: boolean;
  isLoggedIn: boolean;
  err?: string;
  userType: string;
  typeId: number;
};

type ResponseData = {
  token: string;
  userType: string;
  typeId: number;
};

const isLoggedIn = () => {
  let token = localStorage.getItem("token");
  if (token) return true;
  else return false;
};

const initialState: InitialState = {
  loading: true,
  isLoggedIn: isLoggedIn(),
  userType: "",
  err: "",
  typeId: 0,
};

export const login = createAsyncThunk<
  ResponseData,
  { username: string; password: string; type: string },
  { rejectValue: string; serializedErrorType: string }
>("/login", async (data, thunkAPI) => {
  try {
    // get the login
    const res = await authService.login(data);
    let token = res.token;
    if (res.userType !== "superadmin") {
      // authorize with LMS Server
      const data = await authService.AuthorizeLMS(token);
      token = data.token;
    }
    if (token) {
      localStorage.setItem("token", token);
    } else {
      return thunkAPI.rejectWithValue("Not authorized");
    }
    return { ...res };
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
    localStorage.setItem("hash", res.hash);
    return { ...res, userType: "SuperUser" };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

type VerifyOTPReqData = {
  mobile: string;
  name: string;
  otp: string;
};

export const verifyOTP = createAsyncThunk<
  ResponseData,
  VerifyOTPReqData,
  { rejectValue: string; serializedErrorType: string; state: RootState }
>("/verifyOtp", async (body, thunkAPI) => {
  try {
    const res = await authService.verifyOTP(body);
    if (res.error) {
      // if otp is wrong
      return thunkAPI.rejectWithValue(res.error);
    }
    const patientData = await authService.GetPatientList({
      token: res.token,
      contact: body.mobile,
    });
    // add the patients list to state
    if (!patientData.patients) {
      return thunkAPI.rejectWithValue("Somethng went wrong");
    }
    localStorage.setItem("patientToken", res.token);
    thunkAPI.dispatch(addPatients(patientData.patients));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const verifyPatientName = createAsyncThunk<
  {},
  Patient,
  { rejectValue: string; serializedErrorType: string }
>("/verifyPatient", async (data, thunkAPI) => {
  try {
    const res = await authService.verifyPatient(data);
    console.log(res);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
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
        state.typeId = action.payload.typeId;
        state.userType = action.payload.userType;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.typeId = 0;
        state.err = action.payload;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload;
      });
  },
});

export const { logout } = auth.actions;
export default auth.reducer;
