import axios from "axios";
import { BASE_URL } from "../features/settings";
import { getErrorMessageWithCode, NormalizeProgressData } from "./utils";

const customAxios = axios.create({
  baseURL: BASE_URL,
});
const fetchAllProgress = async (token: string) => {
  try {
    const headers = {
      Authorization: `token ${token}`,
    };
    const res = await customAxios.get(`student/student-progress/`, {
      headers,
    });
    const data = NormalizeProgressData(res.data.progress);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

const updateProgress = async (
  token: string,
  data: { course: string; topic?: number; assessment?: number }
) => {
  try {
    const headers = {
      Authorization: `token ${token}`,
    };
    const formData = new FormData();
    formData.append("course", data.course);
    if (data.topic) formData.append("topic", `${data.topic}`);
    if (data.assessment) formData.append("assesment", `${data.assessment}`);
    formData.append("course", "4");
    formData.append("topic", "3");
    const res = await customAxios.post("student/save-progress/", formData, {
      headers,
    });
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

export default {
  fetchAllProgress,
  updateProgress,
};
