import axios from "axios";
import {
  NormalizedProgress,
  Progress,
  StudentCourse,
  Topic,
  Module,
} from "../definations/course";
import topicService from "./topic.service";
import { BASE_URL } from "../features/settings";
import { Assessment } from "../definations/assessment";

export const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `token ${localStorage.getItem("token")}`,
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `token ${token}`;
    }

    return config;
  },
  (error) => {
    // console.log("request error", error);
    return Promise.reject(error);
  }
);

/**
 *
 * @param statusCode
 * @returns string
 */
export const getErrorMessageWithCode = (statusCode: number) => {
  if (statusCode === 401) return "Invalid credentials, Please check once again";
  else if (statusCode === 403) return "Forbidden";
  else if (statusCode === 500) return "Interal Server Error";
  else if (statusCode === 404) return "Resource Not Found";
  else if (statusCode === 405) return " Method Not Allowed";
  return "Something Went Wrong";
};

type Order = { order: number };
/**
 *
 * @param array
 * @param array
 * @returns array
 */
export const getOrderListFromTwoList = <T1 extends Order, T2 extends Order>(
  list1: T1[],
  list2: T2[]
) => {
  const combinedFormedList = [...list1, ...list2];
  return combinedFormedList.sort((item1, item2) => item1.order - item2.order);
};

export const addUniqueIdsToList = <T>(list: Array<T>) => {
  for (let i = 0; i < list.length; i++) {
    list[i]["customId"] = i + 1;
  }
  return list;
};

/**
 * 
 * @param arr 
 * @return {
 *  courseId: {
    topics: []
    assesment: []
  }
 * }
 */

export const NormalizeProgressData = (arr: Progress[]): NormalizedProgress => {
  const normalizedData: NormalizedProgress = {};
  for (let progressObj of arr) {
    let courseId = progressObj.course;
    if (!normalizedData[courseId]) {
      normalizedData[courseId] = {
        topics: [],
        assesments: [],
      };
    }
    let topics = normalizedData[courseId].topics;
    let assesments = normalizedData[courseId].assesments;
    if (progressObj.topic && !topics.includes(progressObj.topic)) {
      topics.push(progressObj.topic);
    }
    if (progressObj.assesment && !assesments.includes(progressObj.assesment)) {
      assesments.push(progressObj.assesment);
    }
  }
  return normalizedData;
};

/**
 *
 * @param token
 * @param id
 * @returns total_topics
 */
export const getTotalTopicsOfCourse = (courseId: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    customAxios
      .get(`student/get-course-details/${courseId}`)
      .then((res) => {
        let total_topics = 0;
        if (res.data.topics) {
          total_topics += res.data.topics.length;
        }
        if (res.data.assesements) {
          total_topics += res.data.assesements.length;
        }
        return resolve(total_topics);
      })
      .catch((err) => {
        reject(err.message);
      });
  });
};

export const normalizeTopics = (topics: (Topic | Assessment)[]) => {
  const result: Module[] = [];
  topics.forEach((topic) => {
    if (topic?.module_title) {
      let obj: Module = {
        module_name: topic.module_title,
        completed: false,
        topics: [topic],
      };
      result.push(obj);
    } else {
      let obj = result.pop();
      obj?.topics.push(topic);
      result.push(obj);
    }
  });
  return result;
};
