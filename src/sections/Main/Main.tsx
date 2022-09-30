import React, { useEffect, useState } from "react";
import { Row, Col, Form, Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchLatestCourses } from "../../features/latestCourses";
import { fetchAllCourses } from "../../features/courses";
import { AiOutlineShopping } from "react-icons/ai";
import AliceCarousel from "react-alice-carousel";
import Search from "../../components/Search";
import CalenderWithEvents from "../../components/CalenderWithEvents";
import Card from "../../components/Card";
import "react-calendar/dist/Calendar.css";
import "./Main.scss";
import bg1 from "../../assets/bg-1.jpg"; // its dummy imaage usally have to come from server

const Main = () => {
  const {
    loading: latestLoading,
    err,
    latestCourses,
  } = useAppSelector((state) => state.latestCourses);
  const { items } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
    dispatch(fetchLatestCourses());
  }, []);

  return (
    <div className="py-4 w-100 container">
      <Row className="px-5">
        <Col
          sm={4}
          className="d-flex px-4 align-items-center justify-content-between w-100"
        >
          <div></div>
          <Search />
          <div>
            <Link to="/cart">
              <AiOutlineShopping size={"2rem"} />
              <Badge
                bg="danger"
                text="white"
                pill
                style={{ marginLeft: "-.7em", marginBottom: "-.2em" }}
              >
                {items.length}
              </Badge>
            </Link>
          </div>
        </Col>
      </Row>
      <Row className="p-5 py-3">
        <h4 className="text-blue">Hello Clara! Its good to see you again</h4>
        <p
          style={{ fontWeight: "500", lineHeight: ".8rem" }}
          className="small text-blue"
        >
          You have tauth 6 hours yesterday
        </p>
        <Col sm={4} className="px-4 py-1">
          <Row className="br-2 bg-graydark p-3 h-100">
            <Col sm={5}>
              <h5 className="b-700 mb-4">My Demo Rating</h5>
              <img
                src={bg1}
                alt=""
                style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "auto",
                }}
              />
              <p className="text-blue mt-1" style={{ fontWeight: "700" }}>
                Clara Kilen
              </p>
              <div className="d-flex align-items-center">
                <h4 className="text-skyBlue me-2 b-900">4.5</h4>
                <Badge
                  bg="blue"
                  style={{ fontSize: ".7rem", marginTop: "-.5em" }}
                >
                  Top 20%
                </Badge>
              </div>
              <Link to="" className="text-skyBlue b-600">
                Leadership Board
              </Link>
            </Col>
            <Col xs={7} className="bg-gray round p-2">
              <h5 className="b-700 p-1 mb-4">Impact Report</h5>
              <h6>Demo Conversions %</h6>
              <div className="d-flex">
                <p>LifeTime Conversions</p>
                <span className="ms-auto text-danger b-500">6%</span>
              </div>
              <div className="d-flex">
                <p className="lh-0">Last 60 days</p>
                <span className="ms-auto b-500 lh-0">80%</span>
              </div>
              <p>Monthly</p>
              <div className="d-flex">
                <p>Project Submission %</p>
                <span className="ms-auto b-500">75%</span>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={8}>
          <CalenderWithEvents />
        </Col>
      </Row>
      <Container>
        <Row className="p-5" style={{ minHeight: "16rem" }}>
          <Col className="p-4 br-2 bg-graydark position-relative">
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
                items={latestCourses.map((course) => (
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
