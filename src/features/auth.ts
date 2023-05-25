import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Patient } from "../definations/patients";
import authService from "../services/auth.service";
import type { RootState } from "./../store";
import type { UserState } from "../definations/Auth";

type InitialState = {
  loading: boolean;
  isLoggedIn: boolean;
  err?: string;
  userState: string;
  type: string;
};

const isLoggedIn = () => {
  let token = localStorage.getItem("token");
  if (token) return true;
  else return false;
};

const initialState: InitialState = {
  loading: true,
  isLoggedIn: isLoggedIn(),
  userState: "",
  err: "",
  type: "",
};

export const login = createAsyncThunk<
  { type: string; userState: UserState },
  {
    username: string;
    password: string;
    type: string;
    user_type: string;
    userState: UserState;
    lmsAuthorizeType: string;
  },
  { rejectValue: string; serializedErrorType: string }
>("/login", async (reqData, thunkAPI) => {
  try {
    // get the login
    const metaHosResponse = await authService.login(reqData);

    let metaHosToken = metaHosResponse.token;

    const data = await authService.AuthorizeLMS({
      token: metaHosToken,
      typeId: reqData.lmsAuthorizeType,
    });

    if (data.use.role !== reqData.lmsAuthorizeType) {
      return thunkAPI.rejectWithValue("Not authorized");
    }

    if (data.user) {
      // console.log("role: ====>", data.user.role);
      // console.log("lsmauthtype: ====>", reqData.lmsAuthorizeType);

      localStorage.setItem("email", data.user.email);
      localStorage.setItem("is_superuser", data.user.is_superuser);
      localStorage.setItem("m16_id", data.user.m16_id);
      localStorage.setItem("name", data.user.name);
      localStorage.setItem("lms_id", data.user.id);
    } else {
      return thunkAPI.rejectWithValue("Something went wrong.");
    }

    const token = data.token;

    if (token) {
      localStorage.setItem("token", token);
    } else {
      return thunkAPI.rejectWithValue("Not authorized");
    }
    if (metaHosResponse.userState && metaHosResponse.type) {
      localStorage.setItem("userState", metaHosResponse.userState);
      localStorage.setItem("metaHosType", metaHosResponse.type);
    }
    return { type: metaHosResponse.type, userState: metaHosResponse.userState };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// export const getOTP = createAsyncThunk<
//   { hash: string },
//   { phone: string; usertype: string },
//   { rejectValue: string; serializedErrorType: string }
// >("/getOtp", async (data, thunkAPI) => {
//   thunkAPI.dispatch(updateStage(1));
//   try {
//     const res = await authService.getOTP(data);
//     localStorage.setItem("hash", res.hash);
//     return { ...res, userType: "SuperUser" };
//   } catch (error) {
//     thunkAPI.dispatch(patientError(error));
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// type VerifyOTPReqData = {
//   mobile: string;
//   name: string;
//   otp: string;
// };

// export const verifyOTP = createAsyncThunk<
//   {},
//   VerifyOTPReqData,
//   { rejectValue: string; serializedErrorType: string; state: RootState }
// >("/verifyOtp", async (body, thunkAPI) => {
//   try {
//     const res = await authService.verifyOTP(body);
//     thunkAPI.dispatch(updateStage(2));
//     if (res.error) {
//       thunkAPI.dispatch(patientError("Invalid OTP"));
//       return;
//     }

//     const patientData = await authService.GetPatientList({
//       token: res.token,
//       contact: body.mobile,
//     });
//     thunkAPI.dispatch(updateStage(3));
//     // add the patients list to state
//     if (!patientData.patients) {
//       thunkAPI.dispatch(patientError("Patient details not Found..."));
//       return;
//     }
//     localStorage.setItem("patientToken", res.token);
//     thunkAPI.dispatch(addPatients(patientData.patients));
//   } catch (error) {
//     localStorage.removeItem("patientToken");
//     thunkAPI.dispatch(patientError("something went wrong..."));
//     return;
//   }
// });

// export const verifyPatientName = createAsyncThunk<
//   { typeId: number; userType: string },
//   Patient,
//   { rejectValue: string; serializedErrorType: string }
// >("/verifyPatient", async (data, thunkAPI) => {
//   try {
//     const res = await authService.verifyPatient(data);
//     if (res.message) {
//       thunkAPI.dispatch(patientError(res.message));
//     }
//     thunkAPI.dispatch(updateStage(4));
//     const lmsres = await authService.AuthorizeLMS({
//       token: res.token,
//       typeId: 1,
//     });
//     localStorage.setItem("token", lmsres.token);
//     return { ...lmsres, typeId: 1, userType: "patient" };
//   } catch (error) {
//     thunkAPI.dispatch(patientError("Something Went wrong"));
//   }
// });

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.clear();
    },
    makeLogin: (state) => {
      state.isLoggedIn = true;
    },
    clearError: (state) => {
      state.err = "";
    },
    addPatient: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.err = "";
      state.type = "0";
      state.userState = "patient";
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
        state.type = action.payload.type;
        state.userState = action.payload.userState;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.type = "";
        state.err = action.payload;
      });
  },
});

export const { logout, clearError, makeLogin } = auth.actions;
export default auth.reducer;
