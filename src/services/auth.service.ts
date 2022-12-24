import axios from "axios";
import type { Patient } from "../definations/patients";
import { BASE_URL } from "../features/settings";
import { getErrorMessageWithCode } from "./utils";

import type { UserState, Auth } from "../definations/Auth";

const customAxios = axios.create({
  baseURL: BASE_URL,
});
const login = async ({
  username,
  password,
  type,
  user_type,
  userState,
}: {
  username: string;
  password: string;
  type: string;
  user_type: string;
  userState: UserState;
}): Promise<{ userState: UserState; type: string; token: string }> => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("type", type); // for meta login type is 1
    formData.append("user_type", user_type); // for type of user
    let res = await customAxios.post("/accounts/auth/", formData);

    if (res.data.error) {
      return Promise.reject(getErrorMessageWithCode(401));
    }
    return Promise.resolve({
      ...res.data,
      userState,
      type,
    });
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

const getOTP = async (
  number: string,
  userType: "patient" | "admin" | "supertype" | "doctor"
) => {
  try {
    const formData = new FormData();
    formData.append("mobile", number);
    formData.append("type", "2"); //type 2 means its patient type user
    const res = await customAxios.post("/accounts/auth/", formData);
    if (res.data.error) {
      return Promise.reject(getErrorMessageWithCode(401));
    }
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

type VerifyOTP = {
  mobile: string;
  name: string;
  otp: string;
  hashcode: string;
};

const verifyOTP = async (data: VerifyOTP) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("mobile", data.mobile);
    formData.append("hash", data.hashcode);
    formData.append("otp", data.otp);
    formData.append("type", "3");
    const res = await customAxios.post(`/accounts/auth/`, formData);
    if (res.data.error) {
      return Promise.resolve(res.data.error);
    }
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

const GetPatientList = async (number: string, token: string) => {
  try {
    const formData = new FormData();
    formData.append("type", "4");
    formData.append("contact", number);
    formData.append("token", token);

    const res = await customAxios.post("accounts/auth/", formData);
    if (res.data.error) {
      return Promise.reject(getErrorMessageWithCode(401));
    }
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

type Authroizetype = {
  token: string;
  typeId: string;
};

const AuthorizeLMS = async ({ token, typeId }: Authroizetype) => {
  try {
    const res = await customAxios.get(
      `/accounts/authorize/?token=${token}&type=${typeId}`
    );
    if (res.data.error) {
      return Promise.reject(getErrorMessageWithCode(401));
    }
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

// type 5
const verifyPatient = async (data: Patient) => {
  try {
    const formData = new FormData();
    formData.append("type", "5");
    const token = localStorage.getItem("patientToken");
    if (token) {
      formData.append("token", token);
    }
    formData.append("name", data.fullName);
    formData.append("id", data._id);
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    const res = await customAxios.post(`/accounts/auth/`, formData);
    if (res.data.error) {
      return Promise.reject(getErrorMessageWithCode(401));
    }
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

export default {
  login,
  getOTP,
  verifyOTP,
  AuthorizeLMS,
  GetPatientList,
  verifyPatient,
};
