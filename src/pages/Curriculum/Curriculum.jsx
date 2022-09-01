import React from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import AliceCarousel from "react-alice-carousel";
import "./Curriculum.scss";
import { AiOutlineFileText, AiOutlineTeam } from "react-icons/ai";
import LandingSectionTwo from "../../components/LandingSectionTwo";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import illustration from "../../assets/profession-illustration.png";
import logo from "../../assets/logo-y.png";
import cBg from "../../assets/curriculum-bg.jpg";
import bg2 from "../../assets/bg-2.jpg";
import btnY from "../../assets/btn-y.png";

const bottomImages = [
  { title: "Operational Guide", href: "/", img: btnY },
  { title: "Clinical Expectation", href: "/", img: btnY },
  { title: "Technical Know-How", href: "/", img: btnY },
];
const items = [1, 2, 3, 4, 5, 6, 7];
const Curriculum = () => {
  return (
    <div>
      <NavBar />
      <LandingSectionTwo
        title={"SPHECHO Curriculum"}
        bottomImages={bottomImages}
        bottomIllustration={illustration}
        centerLogo={logo}
        backgroundImg={cBg}
      />
      <section className="curriculum ">
        <h2>Curriculum Competencies</h2>
        <Row
          style={{
            backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url("${bg2}")`,
            backgroundPosition: "center",
            padding: "1rem",
            position: "relative",
          }}
        >
          <Col sm={3}>
            <img
              src={logo}
              alt=""
              style={{
                width: "20rem",
                position: "absolute",
                opacity: ".6",
                top: "-20%",
              }}
            />
          </Col>
          <Col sm={3} className="p-3">
            <div
              style={{
                background: "rgb(201, 170, 75, .7)",
                textAlign: "center",
                color: "white",
                padding: "1em",
                color: "white",
                borderRadius: "1rem",
              }}
            >
              <p>Operational Guide</p>
              <ListGroup className="p-2">
                <ListGroup.Item className="c-item">
                  + Introduction to SPHECHO
                </ListGroup.Item>
                <ListGroup.Item className="c-item">
                  + Licensing and compliance
                </ListGroup.Item>
                <ListGroup.Item className="c-item">
                  + Standards of practice
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col sm={3} className="p-3">
            <div
              style={{
                background: "rgb(201, 170, 75, .7)",
                textAlign: "center",
                color: "white",
                padding: "1em",
                color: "white",
                borderRadius: "1rem",
              }}
            >
              <p>Clinical Expectation</p>
              <ListGroup className="p-2">
                <ListGroup.Item className="c-item">
                  + Teletherapy
                </ListGroup.Item>
                <ListGroup.Item className="c-item">
                  + Roles and responsibilities
                </ListGroup.Item>
                <ListGroup.Item className="c-item">
                  + Code of ethics
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col sm={3} className="p-3">
            <div
              style={{
                background: "rgb(201, 170, 75, .7)",
                textAlign: "center",
                color: "white",
                padding: "1em",
                color: "white",
                borderRadius: "1rem",
              }}
            >
              <p>Technical Know-How</p>
              <ListGroup className="p-2 pb-4">
                <ListGroup.Item className="c-item">+ Technology</ListGroup.Item>
                <ListGroup.Item className="c-item mb-5">
                  + Customer support
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>
      </section>
      <section className="courses p-5 mt-5">
        <h3>Popular courses</h3>
        <p>Limitless learning, more possibilities</p>
        <AliceCarousel
          infinite
          responsive={{
            0: {
              items: 1,
            },
            1024: {
              items: 5,
            },
          }}
          items={items.map((item, id) => {
            return (
              <Card key={id} style={{ width: "14rem" }}>
                <Card.Img variant="top" src={bg2} />
                <Card.Body style={{ marginTop: "-3rem", textAlign: "center" }}>
                  <img
                    src={bg2}
                    className="border-round"
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "4px solid white",
                    }}
                  />
                  <p>stanley</p>
                  <Card.Text>Html and Css: Html and Css Tutorial</Card.Text>
                  <hr />
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex">
                      <span className="d-flex align-items-center me-3">
                        <AiOutlineFileText size={20} />{" "}
                        <p className="pt-3">32</p>
                      </span>
                      <span className="d-flex align-items-center">
                        <AiOutlineTeam size={20} /> <p className="pt-3">32</p>
                      </span>
                    </div>
                    <h4 style={{ fontWeight: "bold", color: "#EDBD2D" }}>3$</h4>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        />
      </section>
      <Footer color={"#EDBD2D"} />
    </div>
  );
};

export default Curriculum;
