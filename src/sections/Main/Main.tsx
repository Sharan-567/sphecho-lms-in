import React from "react";
import { Row, Col, Form, Button, Badge } from "react-bootstrap";

import { Link } from "react-router-dom";
import Search from "../../components/Search";
import bg1 from "../../assets/bg-1.jpg";
const Main = () => {
  return (
    <div className="p-3 w-100 ">
      <Row className="px-2">
        <Col sm={4} className="m-auto">
          <Search />
        </Col>
      </Row>
      <Row>
        <Col sm={6} className="px-4 py-1">
          <h4 className="text-blue">Hello Clara! Its good to see you again</h4>
          <p
            style={{ fontWeight: "500", lineHeight: ".8rem" }}
            className="small text-blue"
          >
            You have tauth 6 hours yesterday
          </p>
          <Row className="br-2 bg-graydark p-3">
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
      </Row>
    </div>
  );
};

export default Main;
