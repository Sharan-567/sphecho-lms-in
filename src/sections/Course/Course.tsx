import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../../features/course";

import { ListGroup, Row, Col, Button, Spinner } from "react-bootstrap";
import SideNav from "../SideNav";

const Course = () => {
  const { loading, courses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  return (
    <div className="d-flex">
      <SideNav />
      <div className="ps-2 mt-3 ms-5 w-75">
        {loading ? (
          <div className="w-100 d-flex justify-content-center mt-5">
            <Spinner style={{}} animation="border" variant="green" />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
            className="flex-direction-column align-items-center"
          >
            <h2 className="b-700 text-blue">Courses</h2>
            <ListGroup>
              {courses.map((course) => {
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
                          src={course.info_image}
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
                            src={course.trainer_image}
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
                          <Button className="bg-green text-white">
                            Enter this Course
                          </Button>
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
        )}
      </div>
    </div>
  );
};

export default Course;
