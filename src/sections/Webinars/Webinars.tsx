import React, { useEffect } from "react";
import { fetchAllCourses } from "../../features/courses";
import { Spinner } from "react-bootstrap";
import { BsExclamationTriangle } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store";
import WebinarContainer from "./WebinarContainer";

const Webinars = () => {
  const { loading, courses, err } = useAppSelector((state) => state.courses);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses({}));
  }, []);

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
    <div className="container px-5 py-2 mt-4 w-100">
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
          className="px-5  py-5 flex-direction-column align-items-center"
        >
          <div>
            <h2 className="b-700 text-blue ms-2">Webinars</h2>
            <div>
              {courses.map((course) => {
                return (
                  <WebinarContainer
                    key={`course-${course.id}`}
                    course={course}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webinars;
