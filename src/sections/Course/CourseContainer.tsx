import React from "react";
import { Row, Col } from "react-bootstrap";
import { HOST } from "../../features/settings";
import type { Course } from "../../definations/course";
import { useAppSelector } from "../../store";
import Progress from "./Progress";
import ButtonGroup from "./ButtonGroup";

type CourseContainer = {
  course: Course;
  no_of_topics?: number;
  type: string;
};

const CourseContainer = ({ course, no_of_topics, type }: CourseContainer) => {
  const { progress } = useAppSelector((state) => state.progress);

  const getNoOfTopicsCompleted = (id: string): number => {
    let topicsCompleted = 0;
    if (progress[id]) {
      let no_of_topics = progress[id].topics.length;
      let no_of_assesments = progress[id].assesments.length;
      topicsCompleted = no_of_topics + no_of_assesments;
    }
    return topicsCompleted;
  };

  const getPercentageValue = (id: string) => {
    if (!no_of_topics) return 0;
    return ((getNoOfTopicsCompleted(id) / no_of_topics) * 100).toFixed(0);
  };
  return (
    <div
      className="bg-graydark br-3 p-5 item "
      style={{
        borderRadius: "2rem !important",
        border: "none",
      }}
      key={course.id}
    >
      <Row>
        <Col>
          <div>
            <h4 className="b-700 text-blue pt-3">{course.name}</h4>
            <p
              className="my-4 pe-3"
              style={{
                overflow: "hidden",
              }}
            >
              {course.description.slice(0, 573)}...
            </p>
          </div>
           {no_of_topics && no_of_topics > 0 ? (
            <div className="d-flex align-items-center p-2">
              <Progress
                Value={getPercentageValue(`${course.id}`)}
                isPercentage
                title="Completed"
              />
              <Progress
                Value={no_of_topics}
                max={no_of_topics}
                title="Total Available Topics"
              />
            </div>
          ): <p className="b-500 text-green">No Topics Found on this Course</p>}
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
           {course.trainer_name &&  <img
              alt=""
              src={`https://${HOST}${course.trainer_image}`}
              className="round-50 obj-fit-cover me-2"
              style={{
                width: "3rem",
                height: "3rem",
                border: "5px solid white",
              }}
            />}
            <h4>{course.trainer_name}</h4>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-1">
            <ButtonGroup {...{ course, type }} />
            {type === "allCourses" && (
              <h3 className="text-skyBlue b-800">
                {Number(course.full_amount).toFixed(0) === "0"
                  ? "Free"
                  : `$${Number(course.full_amount).toFixed(0)}`}
              </h3>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CourseContainer;
