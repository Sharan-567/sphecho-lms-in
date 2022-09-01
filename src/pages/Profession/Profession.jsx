import React from "react";
import { Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import LandingSectionTwo from "../../components/LandingSectionTwo";
import "./Profession.scss";

import btnG from "../../assets/btn-g.png";
import cLogo from "../../assets/logo-g.png";
import logo from "../../assets/s-logo.png";
import bgG from "../../assets/bg-p.jpg";
import ibbce from "../../assets/ibcce-icon.png";
import arrow from "../../assets/arrow.png";
import calender from "../../assets/calender.jpg";
import proffesionIllustration from "../../assets/profession-illustration.png";
// content
const bottomImages = [
  {
    img: btnG,
    title: "Certification Program Registration",
    href: "/profession",
  },
];

const list1 = [
  "Introduction to Telepractice",
  "Environment",
  "Technolory",
  "Licensing & Compliance",
  "Assessment",
  "Scheduling",
  "Materials",
  "Faciltion",
  "Special Education",
  "Overcoming Obstacles",
];

const list2 = [
  "Introduction to Telepractice",
  "Facilitation",
  "Technology",
  "Schedulling",
  "Maximizing Materials",
  "Facilitating Assessment",
  "Special Education",
];

const List = ({ list, title }) => {
  return (
    <div className="list">
      <p>{title}</p>
      <ListGroup>
        {list.map((item, id) => {
          return (
            <ListGroup.Item key={id} className="list-item">
              <h2>+</h2>
              <p>{item}</p>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

const Profession = () => {
  return (
    <div>
      <NavBar />
      <LandingSectionTwo
        bottomImages={bottomImages}
        backgroundImg={bgG}
        title={"Professional Certification"}
        centerLogo={cLogo}
        logo={logo}
        bottomIllustration={proffesionIllustration}
      />
      <section className="certification">
        <Row
          style={{
            background: "black",
            color: "white",
            textAlign: "center",
            padding: "2rem 0rem",
          }}
        >
          <Col sm="3"></Col>
          <Col sm="5">
            <div className="tele-practice">
              <h6>Telepractice</h6>
              <img src={arrow} className="arrow-icon" />
              <p>Telepractice for special Education</p>
            </div>
          </Col>
          <Col sm="4">
            <div className="ibbce">
              <img src={ibbce} />
              <p>
                <strong>Internation Board</strong> of{" "}
                <strong>Credentialing</strong> and{" "}
                <strong>Continuing Education Standards</strong>
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="3">
            <img src={cLogo} className="logo" alt="" />
          </Col>
          <Col sm="9">
            <Row>
              <Col>
                <p className="info">
                  The online delivery of services to individuals and students
                  with special needs has become a necessity for all therapists
                  and service providers. Schools and districts are still
                  required to provide for students with special needs under
                  federal regulatory requirements, whether students are able to
                  attend school in person or not. To ensure telepractice is easy
                  to implement, meets requirements, and is administered
                  professionally and effectively, standardized learning for
                  practitioners is a must.
                </p>
              </Col>
            </Row>
            <Row>
              <Col sm="7">
                <Row>
                  <h5 style={{ fontWeight: "800" }}>
                    Certification Competencies
                  </h5>
                </Row>
                <Row>
                  <Col>
                    <List
                      list={list1}
                      title="Board Certified Telepractice Specialist Competencies"
                    />
                  </Col>
                  <Col>
                    <List
                      list={list2}
                      title="TelePractice Facilitator Certificate Competencies"
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm="5" className="p-5">
                <Link to="">
                  <img src={calender} style={{ width: "100%" }} alt="" />
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>

      {/* Registration Form */}
      <section className="registration position-relative"></section>
    </div>
  );
};

export default Profession;
