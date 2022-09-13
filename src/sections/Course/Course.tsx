import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCourses, fetchUserCourses } from "../../features/courses";

import { ListGroup, Row, Col, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HOST } from "../../features/settings";
import { BsExclamationTriangle } from "react-icons/bs";

const Course = () => {
  const { loading, courses, userCourses, err } = useSelector(
    (state) => state.courses
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchUserCourses());
  }, []);

  const getUsersCourses = (userCourses) => {
    const userCourseIds = {};
    for (const course of userCourses) {
      if (!userCourseIds[course.id]) {
        userCourseIds[course.id] = true;
      }
    }
    return courses.filter((course) => userCourseIds[course.id]);
  };

  if (err) {
    return (
      <div className="p-2 w-100 d-flex justify-content-center align-items-center">
        <BsExclamationTriangle className="me-4" size={40} />
        <div>
          <h5 className="m-auto text-danger">{err}</h5>
          <h2>Please try agian later.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className=" mt-3 ms-5 w-75">
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
          className="flex-direction-column align-items-center"
        >
          <div>
            <h2 className="b-700 text-blue">My Courses</h2>
            <ListGroup>
              {getUsersCourses(userCourses).map((course) => {
                return (
                  <ListGroup.Item
                    className="my-2 bg-gray p-5 item"
                    style={{
                      borderRadius: "2rem !important",
                      border: "none",
                    }}
                    key={course.id}
                  >
                    <Row>
                      <Col>
                        <div>
                          <h4 className="b-700 text-blue">{course.name}</h4>
                          <p>{course.description}</p>
                        </div>
                      </Col>
                      <Col
                        sm={5}
                        className="bg-2 bg-graydark br-2 p-3"
                        style={{ minHeight: "22rem", maxHeight: "22rem" }}
                      >
                        <img
                          alt=""
                          src={`https://${HOST}${course.info_image}`}
                          style={{
                            width: "100%",
                            height: "11rem",
                            objectFit: "cover",
                            borderRadius: "1rem",
                            marginBottom: "1em",
                          }}
                        />
                        <div className="d-flex align-items-center mb-3">
                          <img
                            alt=""
                            src={`https://${HOST}${course.trainer_image}`}
                            className="round-50 obj-fit-cover me-2"
                            style={{
                              width: "3rem",
                              height: "3rem",
                              border: "5px solid white",
                            }}
                          />
                          <h4>{course.trainer_name}</h4>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Link to={`/courses/${course.id}`}>
                            <Button className="bg-green text-white">
                              Enter this Course
                            </Button>
                          </Link>
                          <h3 className="text-skyBlue b-800">
                            $ {Number(course.full_amount).toFixed(0)}
                          </h3>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
          <h2 className="b-700 mt-5 text-blue">All Courses</h2>
          <ListGroup>
            {courses.map((course) => {
              return (
                course?.view_all && (
                  <ListGroup.Item
                    className="my-2 bg-gray p-5 item"
                    style={{
                      borderRadius: "2rem !important",
                      border: "none",
                    }}
                    key={course.id}
                  >
                    <Row>
                      <Col>
                        <div>
                          <h4 className="b-700 text-blue">{course.name}</h4>
                          <p>{course.description}</p>
                        </div>
                      </Col>
                      <Col
                        sm={5}
                        className="bg-2 bg-graydark br-2 p-3"
                        style={{ minHeight: "22rem", maxHeight: "22rem" }}
                      >
                        <img
                          alt=""
                          src={`https://${HOST}${course.info_image}`}
                          style={{
                            width: "100%",
                            height: "11rem",
                            objectFit: "cover",
                            borderRadius: "1rem",
                            marginBottom: "1em",
                          }}
                        />
                        <div className="d-flex align-items-center mb-3">
                          <img
                            alt="traniner"
                            src={`https://${HOST}${course.trainer_image}`}
                            className="round-50 obj-fit-cover me-2"
                            style={{
                              width: "3rem",
                              height: "3rem",
                              border: "5px solid white",
                            }}
                          />
                          <h4>{course.trainer_name}</h4>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <Link to={`/courses/${course.id}`}>
                            <Button className="bg-green text-white">
                              Enroll
                            </Button>
                          </Link>
                          <h3 className="text-skyBlue b-800">
                            $ {Number(course.full_amount).toFixed(0)}
                          </h3>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              );
            })}
          </ListGroup>
        </div>
      )}
    </div>
  );
};

export default Course;
