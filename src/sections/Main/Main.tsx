import React, { useEffect, useState } from "react";
import { Row, Col, Form, Badge, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchLatestCourses } from "../../features/latestCourses";
import { fetchAllCourses } from "../../features/courses";
import { AiOutlineShopping } from "react-icons/ai";
import GaugeChart from "react-gauge-chart";
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
    dispatch(fetchAllCourses({}));
    dispatch(fetchLatestCourses({}));
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
        <Col sm={4} className="p-3">
          <div className="p-3 bg-white br-2 h-100 ">
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
              percent={0.37}
              arcPadding={0.02}
              hideText
            />
            <h5 className="text-center text-green mt-4">43% performace</h5>
            <p className="tiny text-center">
              completed courses per no.of courses taken up
            </p>
          </div>
        </Col>
        <Col sm={8} className="p-3 px-4">
          <CalenderWithEvents />
        </Col>
      </Row>
      <Container>
        <Row className="p-5" style={{ minHeight: "16rem" }}>
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
