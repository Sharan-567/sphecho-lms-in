import React, { useCallback, useEffect, useState } from "react";
import {
  addAllCourses,
  addUserCourses,
  addUserTopic,
} from "../../features/courses";
import { Spinner } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store";
import type { StudentCourse } from "../../definations/course";
import { fetchAllProgress } from "../../features/progress";
import CourseContainer from "./CourseContainer";
import { customAxios } from "../../services/utils";
import { showToast } from "../../features/toast";
import Loading from "../Loading";
import NotFound from "../NotFound";

const Course = () => {
  const { courses, userCourses, userCoursesTopics } = useAppSelector(
    (state) => state.courses
  );
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const getAllCourses = () => {
    setLoading(true);
    customAxios
      .get("student/course/")
      .then((res) => {
        dispatch(addAllCourses(res.data));
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + ": While fetching all Courses",
          })
        );
      });
  };

  const getAllUserCourses = () => {
    setLoading(true);
    customAxios
      .get("student/student-course/")
      .then((res) => {
        dispatch(addUserCourses(res.data));
        return res;
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          const courseId = res.data[i].course;
          customAxios
            .get(`student/get-course-details/${courseId}`)
            .then((topicRes) => {
              let noOfTopics = 0;
              let noOfAssessments = 0;
              if (topicRes.data.topics) {
                noOfTopics = topicRes.data.topics.length;
              }
              if (topicRes.data.assessments) {
                noOfAssessments = topicRes.data.assessments.length;
              }
              dispatch(addUserTopic({ courseId, noOfTopics, noOfAssessments }));
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              dispatch(
                showToast({
                  type: "danger",
                  message: err.message + ": While fetching topic detail",
                })
              );
            });
        }
      })
      .catch((err) => {
        setLoading(false);
        dispatch(
          showToast({
            type: "danger",
            message: err.message + ": While fetching all User Courses",
          })
        );
      });
  };

  useEffect(() => {
    getAllCourses();
    getAllUserCourses();
  }, []);

  const getUsersCourses = useCallback(
    (userCourses: StudentCourse[]) => {
      let courseIds = {};
      for (let course of userCourses) {
        if (course.course) {
          courseIds[course.course] = course.course;
        }
      }
      const result = courses.filter((course) => courseIds[course.id]);
      return result;
    },
    [userCourses, courses]
  );

  const getNoOftopics = useCallback(
    (id: number): number => {
      const course = userCoursesTopics.find((course) => course.courseId === id);
      if (course) return course.noOfTopics + course.noOfAssessments;
      return 0;
    },
    [userCoursesTopics]
  );

  return (
    <div className="container px-5 py-5 mt-4 w-100">
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
          className="px-5 flex-direction-column align-items-center"
        >
          <div>
            <h2 className="b-700 text-blue">My Courses</h2>

            {getUsersCourses(userCourses).length === 0 ? (
              <>
                <NotFound />
                <h5 className="text-center b-600">
                  No Courses Available At this Moment
                </h5>
              </>
            ) : null}
            <div>
              {(getUsersCourses(userCourses) || []).map((course) => {
                return (
                  <CourseContainer
                    key={`course-${course.id}`}
                    no_of_topics={getNoOftopics(course.id)}
                    course={course}
                    type="userCourses"
                  />
                );
              })}
            </div>
          </div>
          {/* <h2 className="b-700 mt-5 text-blue">All Courses</h2>
          <div>
            {courses.map((course) => {
              return (
                course?.view_all && (
                  <CourseContainer
                    key={course.id}
                    course={course}
                    type="allCourses"
                  />
                )
              );
            })}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Course;
