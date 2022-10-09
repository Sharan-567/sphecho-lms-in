import { NormalizedProgress, Progress } from "../definations/course";
import topicService from "./topic.service";

/**
 *
 * @param statusCode
 * @returns string
 */
export const getErrorMessageWithCode = (statusCode: number) => {
  if (statusCode === 401) return "Invalid credentials";
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
export const getTotalTopicsOfCourse = async (
  token: string,
  id: number
): Promise<number> => {
  const { topics, assesements } = await topicService.fetchTopics(
    token,
    `${id}`
  );
  let total_topics = 0;
  if (topics) {
    total_topics += topics.length;
  }
  if (assesements) {
    total_topics += assesements.length;
  }
  return total_topics;
};
