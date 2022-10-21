import axios from "axios";
import { METAHOS_BASE_URL } from "../features/settings";
import { getErrorMessageWithCode } from "./utils";

const customAxios = axios.create({
  baseURL: METAHOS_BASE_URL,
});
const login = async ({
  username,
  password,
  type,
}: {
  username: string;
  password: string;
  type: string;
}) => {
  const body = {
    userName: username,
    password,
    type,
  };
  try {
    const res = await customAxios.post("/auth/login", body);
    if (res.data.error) {
      return Promise.reject(getErrorMessageWithCode(401));
    }
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

const getOTP = async ({
  phone,
  usertype,
}: {
  phone: string;
  usertype: string;
}) => {
  try {
    const res = await customAxios.get(`/patient/generateOtp/${phone}`);
    console.log(res);
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
  hash: string;
  name: string;
  otp: string;
};

const verifyOTP = async (data: VerifyOTP) => {
  try {
    const res = await customAxios.post(`/patient/verifyOtp`, data);
    console.log(res);
    if (res.data.error) {
      return Promise.reject(getErrorMessageWithCode(401));
    }
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

const getLMSToken = async (token: string) => {
  try {
    const res = await customAxios.get(
      `https://lmsv2.metahos.com/lms_api_v1/accounts/authorize/`,
      { params: { token } }
    );
    console.log("ask faizal to solve cors");
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

export default {
  login,
  getOTP,
  verifyOTP,
  getLMSToken,
};
