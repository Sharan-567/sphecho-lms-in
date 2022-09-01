import React, { useMemo } from "react";
import { Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import LandingSectionTwo from "../../components/LandingSectionTwo";
import Footer from "../../components/Footer";
import "./Profession.scss";
import countryList from "country-list";
import btnG from "../../assets/btn-g.png";
import cLogo from "../../assets/logo-g.png";
import logo from "../../assets/s-logo.png";
import p1 from "../../assets/p-1.jpg";
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
  const countries = useMemo(() => countryList.getNames());
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
      <section className="registration position-relative">
        <Row>
          <Col sm="8" className="p-5 registration__form">
            <h2>Find Out More Earnings An Teletherapy Certification</h2>
            <p className="pb-3">
              Fill out the form below to connect with a Certification Advisor
              for more information
            </p>
            <Form className="p-3">
              <Row className="mb-3">
                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" />
                </Form.Group>

                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                  <Form.Label>Second Name*</Form.Label>
                  <Form.Control type="text" placeholder="Enter Second Name" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                  <Form.Label>phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter the Phone Number"
                  />
                </Form.Group>

                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control type="text" placeholder="Email Address" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                  <Form.Label>Job title*</Form.Label>
                  <Form.Control type="text" placeholder="Country" />
                </Form.Group>

                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                  <Form.Label>Organization</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} sm={6} controlId="formGridEmail">
                  <Form.Label>Country*</Form.Label>
                  <Form.Select aria-label="select-country">
                    <option>Open this select menu</option>
                    {countries.map((country) => {
                      return <option key={country}>{country}</option>;
                    })}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} sm={6} controlId="formGridPassword">
                  <Form.Label>Question or commets to discuss</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Row>
              <Button variant="danger" type="submit" className="mb-2 px-5">
                Submit
              </Button>
            </Form>
          </Col>
          <Col sm="4" className="p-0">
            <img
              src={p1}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Col>
        </Row>
        <img className="illustration" src={proffesionIllustration} alt="" />
      </section>
      <Footer color={"#cfd648"} />
    </div>
  );
};

export default Profession;
