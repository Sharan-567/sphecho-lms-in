import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { date } from "yup";
import { Patient } from "../definations/patients";
import authService from "../services/auth.service";
import type { RootState } from "./../store";
import { addPatients, patientError, updateStage } from "./patient";

type InitialState = {
  loading: boolean;
  isLoggedIn: boolean;
  err?: string;
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
  { typeId: number; userType: string },
  { username: string; password: string; type: string },
  { rejectValue: string; serializedErrorType: string }
>("/login", async (data, thunkAPI) => {
  try {
    // get the login
    const res = await authService.login(data);
    let token = res.token;
    if (res.userType !== "superadmin") {
      // authorize with LMS Server
      const data = await authService.AuthorizeLMS({
        token: token,
        typeId: res.typeId,
      });
      token = data.token;
    }
    if (token) {
      localStorage.setItem("token", token);
    } else {
      return thunkAPI.rejectWithValue("Not authorized");
    }
    if (res.userType && res.typeId) {
      localStorage.setItem("userType", res.userType);
      localStorage.setItem("typeId", res.typeId);
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
  thunkAPI.dispatch(updateStage(1));
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
  {},
  VerifyOTPReqData,
  { rejectValue: string; serializedErrorType: string; state: RootState }
>("/verifyOtp", async (body, thunkAPI) => {
  try {
    const res = await authService.verifyOTP(body);
    thunkAPI.dispatch(updateStage(2));
    if (res.error) {
      thunkAPI.dispatch(patientError("Otp is wrong"));
    }

    const patientData = await authService.GetPatientList({
      token: res.token,
      contact: body.mobile,
    });
    thunkAPI.dispatch(updateStage(3));
    // add the patients list to state
    if (!patientData.patients) {
      thunkAPI.dispatch(patientError("Patient details not getting..."));
    }
    localStorage.setItem("patientToken", res.token);
    thunkAPI.dispatch(addPatients(patientData.patients));
  } catch (error) {
    localStorage.removeItem("patientToken");
    thunkAPI.dispatch(patientError("something went wrong..."));
  }
});

export const verifyPatientName = createAsyncThunk<
  { typeId: number; userType: string },
  Patient,
  { rejectValue: string; serializedErrorType: string }
>("/verifyPatient", async (data, thunkAPI) => {
  try {
    const res = await authService.verifyPatient(data);
    if (res.message) {
      thunkAPI.dispatch(patientError(res.message));
    }
    thunkAPI.dispatch(updateStage(4));
    const lmsres = await authService.AuthorizeLMS({
      token: res.token,
      typeId: 1,
    });
    localStorage.setItem("token", lmsres.token);
    return { ...lmsres, typeId: 1, userType: "patient" };
  } catch (error) {
    thunkAPI.dispatch(patientError("Something Went wrong"));
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
    clearError: (state) => {
      state.err = "";
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
      .addCase(verifyPatientName.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.err = "";
        state.typeId = action.payload.typeId;
        state.userType = action.payload.userType;
      })
      .addCase(verifyPatientName.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.typeId = 0;
        state.err = action.payload;
      });
  },
});

export const { logout, clearError } = auth.actions;
export default auth.reducer;
