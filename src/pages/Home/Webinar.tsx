import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import banner from "./assets/webinar/banner-webinar.png";
import detail from "./assets/webinar/detail.png";
import NavBar from "./Navbar";

import "./webinar.css";

const webinar = () => {
  return (
    <>
      <NavBar />
      <div style={{ width: "100vw", overflowX: "hidden" }}>
        <Container>
          <Banner />
          <Member />
        </Container>
        <Detail />
        <Container>
          <OverView />
        </Container>
        <Footer />
      </div>
    </>
  );
};

const Banner = () => {
  return (
    <Row style={{ height: "30rem", paddingTop: "10%" }}>
      <Col sm={6}>
        <div className="banner-txt">
          <h5
            style={{ color: "#97d25a", fontSize: "2.3rem", fontWeight: "bold" }}
          >
            Collaborate with us and <br></br>
            contribute to allow discovery <br></br>
            of your range of expertise <br></br>
            without compromising your <br></br>
            schedule
          </h5>
        </div>
      </Col>
      <Col sm={6}>
        <img
          className="banner-img"
          src={banner}
          style={{
            position: "absolute",
            width: "45%",
            objectFit: "contain",
            top: 0,
            right: 0,
          }}
        />
      </Col>
    </Row>
  );
};

const Member = () => (
  <div
    style={{
      textAlign: "center",
      marginTop: "5rem",
      fontSize: "1.5rem",
    }}
  >
    <p>
      Some webinars are participartory, making them a fantastic place for
      service provider, clients, parents,
    </p>
    <p></p>
    <p>
      You can receive the most recent information about the next webinars if you
      register. You can always<br></br>
    </p>
    <p>
      Watch the recording later and download the certificate of attendance if
      you couldn't make the specified <br></br> day or time.
    </p>
    <Button
      style={{
        background: "#97d25a",
        color: "white",
        margin: "auto",
        border: "none",
        fontSize: "1.4rem",
        fontWeight: "bold",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      Access the Webinars by Becoming a member.
    </Button>
  </div>
);

const Detail = () => (
  <div
    className="detail"
    style={{
      marginTop: "5rem",
      paddingTop: "3rem",
      paddingBottom: "3rem",
      borderRadius: "0rem 40rem 40rem 0rem",
      background: "#97d25a",
      marginRight: "10rem",
    }}
  >
    <Row>
      <Col sm={6}>
        <img
          className="detail-image"
          src={detail}
          style={{ height: "25rem", borderRadius: "2rem" }}
        />
      </Col>
      <Col sm={6}>
        <div
          style={{
            padding: "1rem",
            paddingTop: "5rem",
          }}
        >
          <h1 style={{ color: "white" }}>
            DO YOU HAVE AN IDEA <br></br> FOR A WEBINAR
          </h1>
          <p style={{ paddingTop: "1rem" }}>
            SPHECHO invites you to contribute to a <br></br>great community of
            experts of experts by providing <br></br> and innovations on broad
            range of <br></br>topics that will inspire your colleagues across
            the profession.
          </p>
        </div>
      </Col>
    </Row>
  </div>
);

const OverView = () => (
  <div style={{ marginTop: "5rem" }}>
    <h2 style={{ color: "GrayText" }}>OVERVIEW</h2>
    <p style={{ fontWeight: "bold" }}>
      Proposals will be reviewed on an ongoing basis, and you will be notified
      within 30 days of your <br></br> submission. Webinar proposals must relate
      directly to topics important to SPHECHO services, <br></br>{" "}
      specialization, and address skill areas identified within SPHECHO. Members
      are encouraged to submit <br></br> propsals at any time.
    </p>
    <ul>
      <li>
        SPHECHO will be develop a timeline and work with you to finalize the
        program details.
      </li>
      <li>Webinars are scheduled quarterly</li>
      <li>
        A dry run is scheduled about a week before the live broadcast to ensure
        a smooth production.
      </li>
      <li>
        SPHECHO will not accept webinar proposals intended solely to promote
        commercial products.
      </li>
    </ul>
    <Button
      style={{
        background: "#97d25a",
        color: "white",
        border: "none",
        fontSize: "1.4rem",
        fontWeight: "bold",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      SPHECHO Webinar Request Form
    </Button>
    <p style={{ marginTop: "1.4rem", color: "GrayText" }}>
      For more information or questions regarding webinar proposals, please
      contact <br></br>support@sphecho.com
    </p>
    <p style={{ marginTop: "2rem", color: "#97d25a", fontWeight: "bold" }}>
      Come join the SPHECHO Family
    </p>
  </div>
);

const Footer = () => {
  return <div className="footer-webinar"></div>;
};

export default webinar;
