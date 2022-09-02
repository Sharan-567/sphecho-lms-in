import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import LandingSection from "../../components/LandingSection";
import { Col, Row, Form, Button, ListGroup, Container } from "react-bootstrap";
import "./home.scss";

// images import
import bg1 from "../../assets/bg-1.jpg";
import bg2 from "../../assets/bg-2.jpg";
import btnY from "../../assets/btn-y.png";
import btnB from "../../assets/btn-b.png";
import btnG from "../../assets/btn-g.png";
import event from "../../assets/event.jpg";
import event2 from "../../assets/event-2.jpg";
import vector from "../../assets/Vector1.png";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

// content data
const carouselImages = [bg1, bg2];
const bottomImages = [
  { img: btnY, title: "SPHECHO Curriculum", href: "/curriculum" },
  { img: btnG, title: "Professional Certification", href: "/profession" },
  { img: btnB, title: "Resource Hub", href: "/resourcehub" },
];
const newsImages = [bg1, bg2, event2, event, bg1, bg2, event2, event];
const testmonialImages = [
  { id: 0, name: "manuael", title: "design", img: bg1 },
  { id: 1, name: "jaffar", title: "ux desinger", img: bg2 },
  { id: 2, name: "alice", title: "ux desinger", img: event2 },
  { id: 3, name: "coarsel", title: "programmer", img: event },
  { id: 4, name: "lila", title: "software developer", img: btnY },
];

const Home = () => {
  const [currentTestMoinal, setCurrentTestMoinal] = useState(
    testmonialImages[2]
  );
  const handleItemTestemonial = (e) => {
    setCurrentTestMoinal(
      testmonialImages.filter((item) => item.id === e.item)[0]
    );
  };

  return (
    <div>
      <NavBar />
      <LandingSection config={{ bottomImages, carouselImages }} />

      {/* event section */}
      <section className="event pt-5 w-100 position-relative">
        <img src={vector} alt="" className="position-absolute vector-img" />
        <Row className="pt-5">
          <Col sm={6}>
            <img src={event} className="e-img-left" alt="" />
          </Col>
          <Col sm={6} className="px-5 pt-3">
            <Row className="d-flex">
              <Col sm={9}>
                <h3>Events</h3>
                <p className="small">
                  Upcoming Education Events to feed your brain
                </p>
              </Col>
              <Col sm={3}>
                <Button className="e-btn">View All</Button>
              </Col>
            </Row>
            <Row>
              <ListGroup variant="flush">
                <ListGroup.Item></ListGroup.Item>
                {carouselImages.map((item, idx) => {
                  return (
                    <ListGroup.Item key={idx} className="pt-4">
                      <Row>
                        <Col xs={2}>
                          <h1 className="e-big-nb">15</h1>
                          <p>Augest</p>
                        </Col>
                        <Col xs={6}>
                          <h6>Education Auntum tour</h6>
                          <p className="small">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Nam eius sed, eveniet sapiente
                          </p>
                        </Col>
                        <Col xs={4}>
                          <img src={item} className="w-100" alt="" />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col sm={4} className="p-0">
            <div className="position-relative">
              <img src={event2} className="e-img-tag" alt="" />
              <h3 className="e-inner-text">We are here to listen to you</h3>
            </div>
          </Col>
          <Col sm={8} style={{ background: "black", padding: "2em" }}>
            <h6
              style={{
                textAlign: "center",
                color: "white",
                paddingBottom: ".5em",
              }}
            >
              Latest News
            </h6>
            <AliceCarousel
              mouseTracking
              autoHeight
              infinite
              items={newsImages.map((img) => {
                return (
                  <Link to="" style={{ width: "14rem", height: "9rem" }}>
                    <div style={{ width: "14rem", height: "10rem" }}>
                      <img
                        alt=""
                        src={img}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Link>
                );
              })}
              disableButtonsControls
              responsive={{
                0: {
                  items: 0,
                },
                556: {
                  items: 2,
                },
                1024: {
                  items: 3,
                },
              }}
            />
          </Col>
        </Row>
      </section>

      <section className="registration">
        <div
          className="bg"
          style={{
            backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url("${bg1}") `,
          }}
        >
          <Row>
            <Col sm={7}>
              <h1 className="title">Register Now</h1>
            </Col>
            <Col sm={5} className="p-5">
              <Form>
                <Form.Label style={{ color: "white" }}>
                  Create your free account now and get immediate access to many
                  courses.
                </Form.Label>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    className="c-control"
                    type="text"
                    placeholder="Your Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Control
                    placeholder="Phone"
                    type="tel"
                    label="Check me out"
                  />
                </Form.Group>
                <Button className="mybtn" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </section>

      <section className="testmonial">
        <Container>
          <Row>
            <Col sm={8} className="m-auto pb-5">
              <h4>What People Say</h4>

              <p className="text-secondary">
                What real people said Education WordPress theme.
              </p>
              <Row>
                <Col sm={6} className="m-auto">
                  <AliceCarousel
                    mouseTracking
                    autoHeight
                    infinite
                    onSlideChange={handleItemTestemonial}
                    items={testmonialImages.map((item) => {
                      return <img className="t-img" src={item.img} alt="" />;
                    })}
                    disableButtonsControls
                    disableDotsControls
                    responsive={{
                      0: {
                        items: 5,
                      },
                    }}
                  />
                </Col>
              </Row>
              <p className="pt-1 mb-0">{currentTestMoinal.name}</p>
              <p className="small ">{currentTestMoinal.title}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deserunt laborum quae nostrum quaerat quas, et reiciendis non
                inventore illo perferendis tempore ipsum distinctio nulla quis.
                Cumque provident laboriosam excepturi blanditiis!
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer color={"#ffb605"} />
    </div>
  );
};

export default Home;
