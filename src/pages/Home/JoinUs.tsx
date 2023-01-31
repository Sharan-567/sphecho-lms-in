import React from "react";
import { Col, Container, Row, Button } from "reactstrap";
import bannerImg from "./assets/banner-image.png";
import calender from "./assets/calender.png";
import client from "./assets/client.png";
import docu from "./assets/docu.png";
import onboarding from "./assets/onboarding.png";
import tover from "./assets/tover.png";
import users from "./assets/users.png";
import "./joinus.css";

export const JoinUs = () => {
  return (
    <div>
      <Container>
        <Banner />
        <Features />
      </Container>
      <ArrowContainer />
      <Container>
        <FAQS />
      </Container>
      <Footer />
    </div>
  );
};

const Banner = () => {
  return (
    <Row style={{ height: "30rem", paddingTop: "10%" }}>
      <Col sm={6}>
        <div className="banner-txt">
          <h5 style={{ color: "#662D91", fontSize: "2.3rem" }}>
            Collaborate with us and <br></br>
            contribute to allow discovery <br></br>
            of your range of expertise <br></br>
            without compromising your <br></br>
            schedule
          </h5>
          <div style={{}}>
            <p>
              Work virtually with clients and gain flexible hours and extra
              income
            </p>
          </div>
        </div>
        <Button
          style={{
            backgroundColor: "#662D91",
            color: "white",
            padding: "1rem 2.7rem",
            border: "none",
            borderRadius: "1rem",
            fontSize: "1.3rem",
            marginTop: "1.8rem",
          }}
        >
          JOIN US
        </Button>
      </Col>
      <Col sm={6}>
        <img
          className="banner-img"
          src={bannerImg}
          style={{
            position: "absolute",
            width: "40rem",
            objectFit: "contain",
            top: 0,
            right: 0,
          }}
        />
      </Col>
    </Row>
  );
};

const Features = () => (
  <div style={{ marginTop: "13rem", color: "#662D91" }}>
    <Row>
      <Col sm={4}>
        <div style={{ padding: 1, textAlign: "center" }}>
          <h3>Increased Pay</h3>
          <img src={tover} width="50%" />
          <p style={{ fontWeight: "bold" }}>
            Earn nearly twice as mush per <br></br> hour for Live Sessions
          </p>
        </div>
      </Col>
      <Col sm={4}>
        <div style={{ padding: 1, textAlign: "center" }}>
          <h3>
            Supportive Provider <br></br> community
          </h3>
          <img src={users} width="40%" />
          <p style={{ fontWeight: "bold" }}>
            Join thousand of other talented <br></br> clinicians to exchange
            resource <br></br> and support.
          </p>
        </div>
      </Col>
      <Col sm={4}>
        <div style={{ padding: 1, textAlign: "center" }}>
          <h3>Flexibility</h3>
          <img src={calender} />
          <p style={{ fontWeight: "bold" }}>
            Set a schedule that works best <br></br> for you and your clients.
          </p>
        </div>
      </Col>
    </Row>
  </div>
);

const ArrowContainer = () => (
  <div
    style={{
      marginTop: "10rem",
      marginBottom: "5rem",
      marginRight: "10rem",
      background: "#662D91",
      borderRadius: "0rem 14rem 14rem 0rem",
    }}
  >
    <Container>
      <div
        style={{
          paddingTop: "5rem",
          paddingBottom: "4rem",
          color: "grey",
          width: "90%",
          marginLeft: "10rem",
        }}
      >
        <Row>
          <Col sm={4}>
            <div
              style={{
                padding: "1rem",
                textAlign: "center",
                background: "white",
                width: "17rem",
                height: "19rem",
                borderRadius: "2rem",
                marginBottom: "2rem",
              }}
            >
              <h5 style={{ height: "3rem" }}>Increased Pay</h5>
              <img
                src={docu}
                width="70%"
                height="140rem"
                style={{ objectFit: "contain" }}
              />
              <p>
                Earn nearly twice as mush per <br></br> hour for Live Sessions
              </p>
            </div>
          </Col>
          <Col sm={4}>
            <div
              style={{
                padding: "1rem",
                textAlign: "center",
                background: "white",
                width: "17rem",
                height: "19rem",
                borderRadius: "2rem",
                marginBottom: "2rem",
              }}
            >
              <h5 style={{ height: "3rem" }}>
                Supportive Provider <br></br> community
              </h5>
              <img
                src={onboarding}
                width="60%"
                height="140rem"
                style={{ objectFit: "contain" }}
              />
              <p>
                Join thousand of other talented <br></br> clinicians to exchange
                resource <br></br> and support.
              </p>
            </div>
          </Col>
          <Col sm={4}>
            <div
              style={{
                padding: "1rem",
                textAlign: "center",
                background: "white",
                width: "17rem",
                height: "19rem",
                borderRadius: "2rem",
                marginBottom: "2rem",
              }}
            >
              <h5 style={{ height: "3rem" }}>Flexibility</h5>
              <img
                src={client}
                width="70%"
                height="140rem"
                style={{ objectFit: "contain" }}
              />
              <p>
                Set a schedule that works best <br></br> for you and your
                clients.
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  </div>
);

const FAQS = () => {
  // const faqs = [
  //   {
  //     id: 1,
  //     header: 'How do I apply to become a SPHECHO provider',
  //     content:
  //       "The SPHECHO certification program is intended to assess the knowledge, talents, and skills needed to carry out a certain job, and, upon passing a certification exam, to serve as a testament to an individual's level of professional competence.",
  //   },
  //   {
  //     id: 2,
  //     header: 'How is therapy delivered on SPHECHO?',
  //     content:
  //       'Our credentials are governed and approved by our professional board that frequently reviews all policies and procedures of SPHECHO. The board is composed of a variety of specialists and experts, including clinical experts, therapists, special education professionals etc.',
  //   },
  //   {
  //     id: 3,
  //     header:
  //       'Is it feasible to work and deliver SPHECHO services at the same time?',
  //     content: `Recognition for voluntarily meeting standards beyond professional and regional licensing requirements
  //     Enhancement of reputation and credibility`,
  //   },
  // ];

  return (
    <div
      className="container m-auto text-center"
      style={{ marginBottom: "5rem" }}
    >
      <div className="w-75 m-auto ">
        <h1 className="text-landingPrimary my-4 b-600">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "6rem" }}>
          Please click on a topic below to view common questions. Once you have
          chosen your topic simply click any question to reveal the answer.
          Can’t find an answer to your question? Contact us today
        </p>
        {/* <Accordion defaultActiveKey="0">
          {faqs.map((faq) => (
            <Accordion.Item
              key={faq.id}
              eventKey={`${faq.id}`}
              className="accordion-item"
            >
              <Accordion.Header>
                <p className="accordin-title">{faq.header}</p>
              </Accordion.Header>
              <Accordion.Body
                className="accordin-content"
                style={{ fontSize: '1.2rem' }}
              >
                {faq.content}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion> */}
        <div className="accordion" id="accordionExample">
          <div className="accordion-item accordin-first ">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
                style={{ background: "white" }}
              >
                <div className="accordion-button-inner">
                  How do I apply to become a SPHECHO provider
                </div>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                The SPHECHO certification program is intended to assess the
                knowledge, talents, and skills needed to carry out a certain
                job, and, upon passing a certification exam, to serve as a
                testament to an individual's level of professional competence.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <div className="accordion-button-inner">
                  How is therapy delivered on SPHECHO
                </div>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Our credentials are governed and approved by our professional
                board that frequently reviews all policies and procedures of
                SPHECHO. The board is composed of a variety of specialists and
                experts, including clinical experts, therapists, special
                education professionals etc.'
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <div className="accordion-button-inner">
                  Is it feasible to work and deliver SPHECHO services at the
                  same time?
                </div>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Recognition for voluntarily meeting standards beyond
                professional and regional licensing requirements Enhancement of
                reputation and credibility
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return <div className="footer-joinus"></div>;
};
export default JoinUs;
