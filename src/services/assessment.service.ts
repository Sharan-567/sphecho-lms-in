import axios from "axios";
import { BASE_URL } from "../features/settings";
import { getErrorMessageWithCode } from "./utils";
import type { Question } from "../definations/assessment";

const customAxios = axios.create({
  baseURL: BASE_URL,
});
const getAssessmentQuestion = async (
  token: string,
  id: number
): Promise<Question[]> => {
  try {
    const headers = {
      Authorization: `token ${token}`,
    };
    const res = await customAxios.get(
      `student/get-by-assesment-question/${id}/`,
      {
        headers,
      }
    );
    return Promise.resolve(res.data.question);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

export default {
  getAssessmentQuestion,
};
