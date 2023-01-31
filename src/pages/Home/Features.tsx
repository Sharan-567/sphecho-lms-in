import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./feature.css";
import bannerImg from "./assets/feat-banner.png";

const Features = () => {
  return (
    <div>
      <Container>
        <Banner />
        <GridContainer />
      </Container>
      <Footer />
    </div>
  );
};

const Banner = () => {
  return (
    <Row style={{ height: "30rem", paddingTop: "10%" }}>
      <Col sm={6}>
        <h1
          style={{
            fontWeight: "bold",
            color: "#33cc33",
            fontSize: "3.8rem",
            paddingTop: "7rem",
          }}
        >
          What's New
        </h1>
        <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          <p>Stay up-to-date about</p>
          <p>everything with Sphecho.</p>
        </div>
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

const Card = () => (
  <div style={{ padding: "1rem", marginTop: "10rem" }}>
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "100%",
          height: "30rem",
          background: "#E3E5E2",
          borderRadius: "2rem",
        }}
      ></div>
      <h5
        style={{
          marginTop: "1.3rem",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        some titles goes here.
      </h5>
    </div>
  </div>
);

const GridContainer = () => {
  return (
    <>
      <Row>
        <Col sm={4}>
          <Card />
        </Col>
        <Col sm={4}>
          <Card />
        </Col>
        <Col sm={4}>
          <Card />
        </Col>
        <Col sm={4}>
          <Card />
        </Col>
        <Col sm={4}>
          <Card />
        </Col>
        <Col sm={4}>
          <Card />
        </Col>
        <Col sm={4}>
          <Card />
        </Col>
        <Col sm={4}>
          <Card />
        </Col>
        <Col sm={4}>
          <Card />
        </Col>
      </Row>
    </>
  );
};

const Footer = () => {
  return <div className="footer-feature"></div>;
};

export default Features;
