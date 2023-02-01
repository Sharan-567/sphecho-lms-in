import React, { useEffect, useState } from "react";
import { Row, Col, Badge, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchLatestCourses } from "../../features/latestCourses";
import { AiOutlineShopping } from "react-icons/ai";
import GaugeChart from "react-gauge-chart";
import AliceCarousel from "react-alice-carousel";
import Search from "../../components/Search";
import CalenderWithEvents from "../../components/CalenderWithEvents";
import Card from "../../components/Card";
import "react-calendar/dist/Calendar.css";
import "./Main.scss";
import { logout } from "../../features/auth";
import {
  addAllCourses,
  addUserCourses,
  addUserTopic,
} from "../../features/courses";
import { showToast } from "../../features/toast";
import { customAxios, NormalizeProgressData } from "../../services/utils";
import Counter from "../../components/Counter/Counter";
import { BiBookOpen, BiBookmarkAlt, BiBookmarkHeart } from "react-icons/bi";
import { convertToObject } from "../Certfication/helpers";
import { addAllprogress } from "../../features/progress";

const Main = () => {
  const {
    loading: latestLoading,
    err,
    latestCourses,
  } = useAppSelector((state) => state.latestCourses);
  const { items } = useAppSelector((state) => state.cart);
  const [noOfCoursesEnrolled, setNoOfCourseEnrolled] = useState("--");
  const [noOfBadgesEarned, setNoOfBadgesEarned] = useState("--");
  const [noOfCertificatesEarned, setNoOfCertificatesEarned] = useState("--");
  const [gaugePerformance, setGaugePerformance] = useState(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getAllCourses = () => {
    customAxios
      .get("student/course/")
      .then((res) => {
        dispatch(addAllCourses(res.data));
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : main : while fetching all courses",
          })
        );
      });
  };

  const getAllCoursesLength = () => {
    customAxios
      .get("student/student-course/")
      .then((res) => {
        setNoOfCourseEnrolled(`${res.data.length}`);
      })

      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + ": User Courses length",
          })
        );
      });
  };

  const getCertificationAndBagesLength = () => {
    let token = localStorage.getItem("token");
    if (token) {
      const headers = {
        Authorization: "token " + token,
      };
      customAxios
        .get(`student/certificates-badges/`)
        .then((res) => {
          const certs = convertToObject(res.data.certs);
          const badges = convertToObject(res.data.badges);
          setNoOfCertificatesEarned(`${certs.length}`);
          setNoOfBadgesEarned(`${badges.length}`);
        })
        .catch((err) => {
          dispatch(
            showToast({
              type: "danger",
              message: err.message + ": Certificates/Badges Courses length",
            })
          );
        });
    }
  };

  const getAllUserTopicsCompletedCount = (cb: (arg) => void) => {
    customAxios
      .get(`student/student-progress/`)
      .then((res) => {
        let progresses = NormalizeProgressData(res.data.progress);
        cb(progresses);
        dispatch(addAllprogress(progresses));
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : count : While fetching all Progress",
          })
        );
      });
  };

  const getAllUserCoursesTopicsCount = (cb: (arg) => void) => {
    customAxios
      .get("student/student-course/")
      .then((res) => {
        dispatch(addUserCourses(res.data));
        return res;
      })
      .then((res) => {
        let total = 0;
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
              total = total + noOfTopics + noOfAssessments;
            })
            .catch((err) => {
              dispatch(
                showToast({
                  type: "danger",
                  message: err.message + " : count : While fetching topic list",
                })
              );
            });
        }
        console.log("toaltTopics: ", total);
        cb(total);
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : count : While fetching all User Courses",
          })
        );
      });
  };

  useEffect(() => {
    getAllUserTopicsCompletedCount((progresses) => {
      let totalCompletedTopics = 0;
      for (const [key, value] of Object.entries(progresses)) {
        totalCompletedTopics =
          totalCompletedTopics + value.topics.length + value.assesments.length;
      }
      console.log("totalCompletedTopics: ", totalCompletedTopics);
      getAllUserCoursesTopicsCount((totalTopics) => {
        let perforamance = totalCompletedTopics / totalTopics;
        setGaugePerformance(perforamance);
      });
    });
  }, []);

  useEffect(() => {
    getAllCourses();
    getAllCoursesLength();
    getCertificationAndBagesLength();
    dispatch(fetchLatestCourses({}));
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const isAdmin = () => {
    const userState = localStorage.getItem("userState");
    if (userState) {
      if (
        userState === "SuperUser" ||
        userState === "Provider" ||
        userState === "staffMember"
      )
        return true;
    }
    return false;
  };

  return (
    <div className="py-4 w-100 container">
      <Row className="px-5">
        <Col
          sm={4}
          className="d-flex px-4 align-items-center justify-content-between w-100"
        >
          <div className="none"></div>
          <Search />
          <div className="none">
            <Link to="/cart">
              <AiOutlineShopping width={"2rem"} size={"2rem"} />
              <Badge
                bg="danger"
                text="white"
                pill
                style={{ marginLeft: "-.7em", marginBottom: "-.2em" }}
              >
                {items.length}
              </Badge>
            </Link>
            <Button
              className="bg-primary text-white px-4 py-2 b-700 ms-4"
              style={{ border: "none" }}
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        </Col>
      </Row>
      <Row
        className="main__row_1"
        style={{ padding: "5rem", paddingTop: "3rem", paddingBottom: "3rem" }}
      >
        {/* <h4 className="text-blue">Hello Clara! Its good to see you again</h4>
        <p
          style={{ fontWeight: "500", lineHeight: ".8rem" }}
          className="small text-blue"
        >
          You have tauth 6 hours yesterday
        </p> */}
        <Col sm={4} className="p-3">
          <div className="p-3 bg-graydark br-2 h-100 ">
            {/* <h5 className="b-700 mb-4">Rating</h5> */}
            {/* <img
              src={bg1}
              alt=""
              style={{
                width: "3.5rem",
                height: "3.5rem",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "auto",
              }}
            /> */}

            <h5 className="b-700 p-1 text-center mt-2">Impact Report</h5>
            <GaugeChart
              id="gauge-chart5"
              nrOfLevels={10}
              arcWidth={0.5}
              arcsLength={[0.2, 0.5, 0.3]}
              colors={["#EA4228", "#F5CD19", "#0cae00"]}
              percent={gaugePerformance}
              arcPadding={0.02}
              hideText
            />
            <h5 className="text-center text-green mt-4">
              {(gaugePerformance * 100).toFixed(0)}% performace
            </h5>
            <p className="tiny text-center">
              completed courses per no.of courses taken up
            </p>
          </div>
        </Col>
        <Col sm={8} className="p-3 px-4">
          <CalenderWithEvents />
        </Col>
      </Row>
      <Row
        className="main__row_1"
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          paddingLeft: "4rem",
          paddingRight: "4rem",
        }}
      >
        <Col sm={4}>
          <Counter
            Icon={BiBookOpen}
            title="No Of Course Enrolled"
            value={noOfCoursesEnrolled}
          />
        </Col>
        <Col sm={4}>
          <Counter
            Icon={BiBookmarkAlt}
            title="No Of Badges Earned"
            value={noOfBadgesEarned}
          />
        </Col>
        <Col sm={4}>
          <Counter
            Icon={BiBookmarkHeart}
            title="No Of Certificates Earned"
            value={noOfCertificatesEarned}
          />
        </Col>
      </Row>
      <Container>
        <Row
          className="main_row_3"
          style={{ minHeight: "16rem", padding: "5rem" }}
        >
          <Col className="p-4 br-2 bg-white  position-relative">
            <h4 className="b-700 text-blue">Latest Courses</h4>
            <div className="p-2">
              <AliceCarousel
                disableDotsControls
                autoWidth
                renderPrevButton={() => (
                  <span
                    style={{ cursor: "pointer" }}
                    className="bg-skyBlue text-white p-2 b-900"
                  >{`<`}</span>
                )}
                renderNextButton={() => (
                  <span
                    style={{ cursor: "pointer" }}
                    className="bg-skyBlue text-white p-2 b-900"
                  >{`>`}</span>
                )}
                items={(latestCourses || []).map((course) => (
                  <Card key={course.id} course={course} />
                ))}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
