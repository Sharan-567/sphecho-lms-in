import React, { useEffect } from "react";
import { fetchAllCourses, fetchUserCourses } from "../../features/courses";
import { Spinner } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store";
import type { StudentCourse } from "../../definations/course";
import { fetchAllProgress } from "../../features/progress";
import CourseContainer from "./CourseContainer";

const Course = () => {
  const { loading, courses, userCourses, err } = useAppSelector(
    (state) => state.courses
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses({}));
    dispatch(fetchUserCourses({}));
    dispatch(fetchAllProgress({}));
  }, []);

  const getUsersCourses = (userCourses: StudentCourse[]) => {
    let courseIds = {};
    for (let course of userCourses) {
      courseIds[course.course] = course.course;
    }
    const result = courses.filter((course) => courseIds[course.id]);
    return result;
  };

  const getNoOftopics = (id: number): number => {
    const course = userCourses.find((course) => course.course === id);
    if (course) return course.no_of_topics;
    return 0;
  };

  if (err) {
    return (
      <div className="container p-3 w-100 d-flex justify-content-center align-items-center">
        <BsExclamationTriangle className="me-4" size={40} />
        <div>
          <h5 className="m-auto text-danger">{err}</h5>
          <h2>Please try agian later.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-5 py-5 mt-4 w-100">
      {loading ? (
        <div className="w-100 d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="green" />
        </div>
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
              <p>You have No Assigned to You yet</p>
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
