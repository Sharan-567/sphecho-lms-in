import React from "react";
import NavBar from "../../components/NavBar";
import {
  Col,
  Row,
  Form,
  Carousel,
  Button,
  ListGroup,
  Container,
} from "react-bootstrap";
import "./home.scss";
import { Link } from "react-router-dom";

// images import
import bg1 from "../../assets/bg-1.jpg";
import bg2 from "../../assets/bg-2.jpg";
import btnY from "../../assets/btn-y.png";
import btnB from "../../assets/btn-b.png";
import btnG from "../../assets/btn-g.png";
import logo from "../../assets/logo.png";
import sLogo from "../../assets/s-logo.png";
import cBg from "../../assets/c-bg.png";
import event from "../../assets/event.jpg";
import event2 from "../../assets/event-2.jpg";
import flr from "../../assets/flower.png";

// content data
const images = [bg1, bg2];
const bottomImages = [
  { img: btnY, title: "SPHECHO Curriculum" },
  { img: btnG, title: "Professional Certification" },
  { img: btnB, title: "Resource Hub" },
];

const Home = () => {
  return (
    <>
      <NavBar />
      <div className="position-relative overflow-hidden carousel-container">
        <Carousel indicators={false}>
          {images.map((item, i) => (
            <Carousel.Item key={i} className="c-carousel-item">
              <img
                className="d-block c-carsousel-img"
                src={item}
                alt="Third slide"
              />

              <Carousel.Caption className="carousel-caption">
                <h3>Education is Life Long Learning Adventure.</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <div className="d-flex position-absolute end-0 me-5 bottom-btns">
          {bottomImages.map(({ img, title }, id) => {
            return (
              <div className="position-relative" key={id}>
                <Link to="">
                  <img className="me-4 c-btn-bottom" src={img} />
                </Link>
                <p className="position-absolute">{title}</p>
              </div>
            );
          })}
        </div>
        <img className="position-absolute c-logo" src={logo} />
        <img className="position-absolute s-logo" src={sLogo} />
        <img className="position-absolute c-bg" src={cBg} />
      </div>
      {/* event section */}
      <section className="event pt-5">
        <Row className="pt-5">
          <Col sm={6}>
            <img src={event} className="e-img-left" />
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
                {images.map((item, idx) => {
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
          <Col
            sm={3}
            style={{ padding: 0, height: "15rem", position: "relative" }}
          >
            <img src={event2} className="e-img-tag" />
            <h3 className="e-inner-text">We are here to listen to you</h3>
          </Col>
          <Col sm={9} style={{ background: "black", padding: "1em" }}>
            <h6 style={{ textAlign: "center", color: "white" }}>Latest News</h6>
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
                <Form.Label>
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

              <div className="d-flex justify-content-center py-2">
                <img className="t-img" src={bg1} />
                <img className="t-img" src={bg2} />
                <img className="t-img" src={bg2} />
                <img className="t-img" src={event} />
                <img className="t-img" src={event2} />
              </div>
              <p className="pt-1 mb-0">Manuel</p>
              <p className="small ">Designer</p>
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

      <footer>
        <Row>
          <Col sm={2}></Col>
          <Col sm={6} className="f-container-1 p-5">
            <img src={flr} className="flr-img" />
            <p className="p-sm-5">
              Subscribe now and recive weekly newsletter with Educational
              materials, new courses, interesting posts, popular books and much
              more!
            </p>
          </Col>
          <Col
            sm={4}
            className="d-flex align-items-center justify-content-center"
          >
            <Form className="d-flex align-items-center">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Your Email Here" />
              </Form.Group>
              <Button className="mybtn" type="submit">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>
      </footer>
    </>
  );
};

export default Home;
