import axios from "axios";
import { StudentCourse } from "../definations/course";
import { BASE_URL } from "../features/settings";
import { getErrorMessageWithCode, getTotalTopicsOfCourse } from "./utils";

const customAxios = axios.create({
  baseURL: BASE_URL,
});

const fetchAllCourse = async (token: string) => {
  try {
    const headers = {
      Authorization: `token ${token}`,
    };
    const res = await customAxios("student/course/", { headers });
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response?.status));
  }
};

const fetchUserCourses = async (token: string) => {
  try {
    const headers = { Authorization: `token ${token}` };
    const { data }: { data: StudentCourse[] } = await customAxios(
      "student/student-course/",
      { headers }
    );
    for (let course of data) {
      let no_of_topics = await getTotalTopicsOfCourse(token, course.course);
      course.no_of_topics = no_of_topics;
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(getErrorMessageWithCode(error.response?.status));
  }
};

export default {
  fetchAllCourse,
  fetchUserCourses,
};
