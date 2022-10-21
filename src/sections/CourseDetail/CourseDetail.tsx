import React, { useEffect, useState } from "react";
import { useLocation, Link, Path } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useAppSelector } from "../../store";
import { HOST } from "../../features/settings";
import type { Course } from "../../definations/course";

interface Location extends Path {
  state: {
    id: number;
  };
}

const CourseDetail = () => {
  const location: Location = useLocation() as Location;
  const [course, setCourse] = useState<Course>();
  const { courses, err, loading } = useAppSelector((state) => state.courses);

  useEffect(() => {
    if (courses) {
      let selected = courses.filter((c) => c.id == location.state.id)[0];
      setCourse(selected);
    }
  }, [loading]);

  const getPrice = (price) => {
    if (price) {
      if (parseInt(price) == 0) return "Free";
      else return `$${parseInt(price)}`;
    }
  };

  if (err) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="container p-5 w-100 br-3">
      <div className="px-5 py-4 br-2 bg-gray">
        <h4 className="b-700 text-blue w-75 p-2 mb-3">{course?.name}</h4>
        <Row>
          <Col sm={6}>
            <div className="bg-2 bg-graydark br-2 p-3">
              <img
                alt=""
                src={`https://${HOST}${course?.info_image}`}
                style={{
                  width: "100%",
                  height: "17rem",
                  objectFit: "cover",
                  borderRadius: "1rem",
                  marginBottom: "1em",
                }}
              />
              <div className="d-flex align-items-center mb-3">
                <img
                  alt="traniner"
                  src={`https://${HOST}${course?.trainer_image}`}
                  className="round-50 obj-fit-cover me-2"
                  style={{
                    width: "3rem",
                    height: "3rem",
                    border: "5px solid white",
                  }}
                />
                <h4>{course?.trainer_name}</h4>
              </div>
            </div>
          </Col>
          <Col sm={6}>
            <div className="h-100 px-4 d-flex flex-column justify-content-between">
              <div className="p-3">
                <p>{course?.description}</p>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-1">
                <h3 className="text-skyBlue b-800">
                  {getPrice(course?.full_amount)}
                </h3>
                <Link to={`/courses/${course?.id}`}>
                  <Button className="bg-green text-white px-5">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CourseDetail;
