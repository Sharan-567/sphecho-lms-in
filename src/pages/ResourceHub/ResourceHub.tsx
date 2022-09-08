import React, { useCallback, useState } from "react";
import { Row, Col, Modal, Form } from "react-bootstrap";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import LandingSectionTwo from "../../components/LandingSectionTwo";
import btnB from "../../assets/btn-b.png";
import logo from "../../assets/logo-b.png";
import bg from "../../assets/bg-b.jpg";
import illustration from "../../assets/profession-illustration.png";
import { Button } from "react-bootstrap";

const ResourceHub = () => {
  const [showModal, setShowModal] = useState(false);
  const modalHandler = useCallback(() => {
    setShowModal(true);
  }, [showModal]);

  const bottomImages = [
    {
      title: "Research and Publication",
      href: "/",
      img: btnB,
    },
    { title: "Library", href: "/", img: btnB },
    {
      title: "How can I Contribute",
      img: btnB,
      clickHandler: modalHandler,
    },
  ];
  return (
    <div>
      <NavBar />
      <LandingSectionTwo
        bottomImages={bottomImages}
        centerLogo={logo}
        title={"Resource Hub"}
        backgroundImg={bg}
        bottomIllustration={illustration}
      />
      <section id="webinar" className="webinar p-5 mt-5 position-relative">
        <Row className="pt-5 mt-5">
          <Col sm={3}>
            <img
              style={{
                position: "absolute",
                width: "30%",
                left: "-10%",
                top: "0%",
              }}
              alt=""
              src={logo}
            />
          </Col>
          <Col sm={9}>
            <h1>REQUEST FOR WEBINAR PROPOSALS</h1>
            <p>
              <strong>DO YOU HAVE AN IDEA FOR A WEBINAR?</strong>
            </p>
            <p className="pb-3">
              SPHECHO invites you to contribute to a great community of experts
              by providing trends, best practices, and innovations on a broad
              range of topics that will inspire your colleagues across the
              profession.
            </p>
            <h6>OVERVIEW</h6>
            <p>
              Proposals will be reviewed on an ongoing basis, and you will be
              notified within 30 days of your submission. Webinar proposals must
              relate directly to topics important to SPHECHO services,
              specialization, and address skill areas identified within SPHECHO.
              Members are encouraged to submit proposals at any time. SPHECHO
              will develop a timeline and work with you to finalize the program
              details. Webinars are scheduled quarterly A dry run is scheduled
              about a week before the live broadcast to ensure a smooth
              production. SPHECHO will not accept webinar proposals intended
              solely to promote commercial products.
            </p>
            <p>
              For more information or questions regarding webinar proposals,
              please contact support@sphecho.com
            </p>
            <strong>come join the SPHECHO Family </strong>
            <Button
              className="ms-2"
              style={{ background: "#EA3B40", color: "white" }}
            >
              Click here to learn more
            </Button>
          </Col>
        </Row>
      </section>
      <Footer color={"#2E75B5"} />
      <Modal
        centered
        size="md"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Body sytle={{ color: "#708CBC" }}>
          <Modal.Header closeButton style={{ border: "none" }} />
          <div style={{ textAlign: "center" }}>
            <h2>WOAH,</h2>
            <h2>HOLD ON THERE</h2>
            <p className="pb-2">
              Got A Mind Of Queries & Falling Short On Time?
            </p>
            <p className="small">
              Fill in your details & our team will get back to you in a jiffy
            </p>
          </div>
          <Form className="px-5">
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Full Name*"
            />
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Business Email ID*"
            />
            <Form.Control className="mb-3" type="tel" placeholder="+91 " />
            <Button
              className="px-2"
              style={{ backgroundColor: "#708CBC", color: "white" }}
            >
              Lets Connect
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResourceHub;
