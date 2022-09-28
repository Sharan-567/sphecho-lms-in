import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { HOST } from "../../features/settings";

const CourseDetail = () => {
  const { state } = useLocation();
  const [course, setCourse] = useState({});
  const { courses, err, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courses) {
      let selected = courses.filter((c) => c.id == state.id)[0];
      setCourse(selected);
    }
  }, [loading]);

  if (err) {
    return <h3>Something went wrong</h3>;
  }

  return (
    <div className="p-3 w-100">
      <div className="p-3 round bg-gray">
        <h4 className="b-700 text-blue w-75 p-2 mb-3">{course?.name}</h4>
        <div className="bg-2 bg-graydark br-2 p-3 w-50">
          <img
            alt=""
            src={`https://${HOST}${course.info_image}`}
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
              src={`https://${HOST}${course.trainer_image}`}
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
        <div className="p-3">
          <p>{course?.description}</p>
        </div>

        <div className="d-flex align-items-center justify-content-between mb-1">
          <Link to={`/courses/${course?.id}`}>
            <Button className="bg-green text-white px-5">Enroll Now</Button>
          </Link>
          <h3 className="text-skyBlue b-800">
            $ {Number(course?.full_amount).toFixed(0)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
