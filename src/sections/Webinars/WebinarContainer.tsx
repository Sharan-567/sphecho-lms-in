import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { HOST } from "../../features/settings";
import type { Course } from "../../definations/course";
import {
  BsFillCalendarCheckFill,
  BsFillAlarmFill,
  BsFillEaselFill,
} from "react-icons/bs";

type CourseContainer = {
  course: Course;
};

const WebinarContainer = ({ course }: CourseContainer) => {
  return (
    <div
      className="my-5 bg-white br-3 p-5 item "
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
            <p>{course.description.slice(0, 563)}...</p>
            <div className="d-flex align-items-center mb-2">
              <BsFillCalendarCheckFill
                size={"1.5rem"}
                className="text-green me-2"
              />
              <h5 className="b-400" style={{ fontSize: "1.1rem" }}>
                {" "}
                13:00 PM - 13:45 PM
              </h5>
            </div>
            <div className="d-flex align-items-center mb-2">
              <BsFillAlarmFill size={"1.5rem"} className="text-green me-2" />
              <h5 className="b-400" style={{ fontSize: "1.1rem" }}>
                10/10/22
              </h5>
            </div>
            <div className="d-flex align-items-center mb-2">
              <BsFillEaselFill size={"1.5rem"} className="text-green me-2" />
              <h5 className="b-400" style={{ fontSize: "1.1rem" }}>
                LIVE
              </h5>
            </div>
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
            <h3 className="text-skyBlue b-800">
              {/* $ {Number(course.full_amount).toFixed(0)} */}
            </h3>
            <Button className="bg-green text-white">Add Webinar</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WebinarContainer;
