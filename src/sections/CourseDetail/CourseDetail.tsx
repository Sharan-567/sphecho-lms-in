import React, { useEffect, useState, useRef, ReactHTMLElement } from "react";
import { useLocation, Link, Path } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useAppSelector } from "../../store";
import { useAppDispatch } from "../../store";
import { HOST } from "../../features/settings";
import type { Course } from "../../definations/course";
import { showToast } from "../../features/toast";
import defaultImag from "../../assets/default.jpg";
import { customAxios } from "../../services/utils";
import { removeItem } from "../../features/cart";

interface Location extends Path {
  state: {
    id: number;
  };
}

const CourseDetail = () => {
  const location: Location = useLocation() as Location;
  const [course, setCourse] = useState<Course>();
  const { courses } = useAppSelector((state) => state.courses);
  const imageRef = useRef<HTMLImageElement | any>(null);
  const imageRefAvathar = useRef<HTMLImageElement | any>(null);
  const dispatch = useAppDispatch();
  const [success, setSuccess] = React.useState(false);
  const [showGoto, setShowGoTo] = useState(false);

  useEffect(() => {
    if (courses) {
      let selected = courses.filter((c) => c.id == location.state.id)[0];
      console.log(selected);
      if (selected) {
        setCourse(selected);
      }
    }
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onerror = () => {
        imageRef.current.src = defaultImag;
      };
    }
    if (imageRefAvathar.current) {
      imageRefAvathar.current.onerror = () => {
        imageRefAvathar.current.src = defaultImag;
      };
    }
  }, [defaultImag, imageRef, imageRefAvathar]);

  const getPrice = (price) => {
    if (price) {
      if (parseInt(price) == 0) return "Free";
      else return `$${parseInt(price)}`;
    }
  };

  const enroll = () => {
    const formData = new FormData();
    formData.append("course", course.id);
    customAxios
      .post(`/student/enrol-course/`, formData)
      .then((res) => {
        setSuccess(true);
        setShowGoTo(true);
        dispatch(removeItem(course.id));
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
        dispatch(
          showToast({
            type: "info",
            message: "You successfully enrolled",
          })
        );
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " :enroll : while enrolling course",
          })
        );
      });
  };

  return (
    <div className=" p-5 br-3" style={{ maxWidth: "1000px", margin: "auto" }}>
      {success && (
        <div
          className="bg-green px-2 py-4 mb-5 text-center b-600 br-1 text-white"
          style={{}}
        >
          Your successfully enrolled to course
        </div>
      )}
      <div className="px-5 py-4 br-2 bg-graydark">
        <h4 className="b-700 text-blue w-75 p-2 mb-3">{course?.name}</h4>

        <Row>
          <Col sm={6}>
            <div className="bg-2 bg-graydark br-2 p-3">
              <img
                alt=""
                ref={imageRef}
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
                  ref={imageRefAvathar}
                  alt="traniner"
                  src={`https://${HOST}${course?.trainer_imag}`}
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

                {showGoto ? (
                  <Link to={`/courses/${course?.id}`}>
                    <Button className="bg-green text-white px-5 py-3">
                      Go to course
                    </Button>
                  </Link>
                ) : (
                  <Button
                    className="bg-green text-white px-5 py-3"
                    onClick={() => enroll()}
                  >
                    Enroll Now
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CourseDetail;
