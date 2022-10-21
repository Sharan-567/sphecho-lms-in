import axios from "axios";
import { BASE_URL } from "../features/settings";
import { getErrorMessageWithCode } from "./utils";
import type { Topic } from "../definations/course";
import type { Assessment } from "../definations/assessment";

type FetchTopicReturnType = {
  topics: Topic[];
  assesements: Assessment[];
  groups?: [];
};

const customAxios = axios.create({
  baseURL: BASE_URL,
});
const fetchTopics = async (
  token: string,
  id: string
): Promise<FetchTopicReturnType> => {
  try {
    const headers = {
      Authorization: `token ${token}`,
    };
    const res = await customAxios.get(`student/get-course-details/${id}/`, {
      headers,
    });
    const { topics, assesements, groups }: FetchTopicReturnType = res.data;
    return Promise.resolve({ topics, assesements });
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response.status));
  }
};

export default {
  fetchTopics,
};
