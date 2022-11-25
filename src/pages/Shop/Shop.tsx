import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import landing from "../../assets/landing.png";
import career from "../../assets/career.png";
import discover from "../../assets/discover.png";
import enhance from "../../assets/enhance.png";
import improve from "../../assets/improve.png";

import noImage from "../../assets/no-img.png";
import logo from "../../assets/shop/sphechoLogo.png";
import colorLogo from "../../assets/shop/colorlogo.png";
import hearing from "../../assets/shop/hearing.png";
import play from "../../assets/shop/play.png";
import kit from "../../assets/shop/kit.png";
import therepy from "../../assets/shop/therapy.png";
import apple from "../../assets/apple.png";
import fb from "../../assets/fb.png";
import ig from "../../assets/ig.png";
import ins from "../../assets/in.png";
import playstore from "../../assets/playstore.png";
import tw from "../../assets/tw.png";
import yt from "../../assets/yt.png";
import "./shop.scss";
import { threadId } from "worker_threads";

// const Home = () => {
//   return <iframe style={{width: '100vw', height: "100vh"}} src="HTML/index.html"></iframe>
// }

const Shop = () => {
  return (
    <div style={{ position: "relative" }}>
      <NavBar />
      <Banner />
      <Store />
      <BenfitsOfCertification />
      <Board />
      <Committe />
      <InternalCommitee />
      <FAQS />
      <RequestForm />
      <NewLetter />
      <Footer />
    </div>
  );
};

const NavBar = () => {
  return (
    <Navbar
      className="nav-bar-container"
      style={{
        position: "absolute",
        top: "1%",
        left: 0,
        right: 0,
        zIndex: 100,
      }}
      bg="light"
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} width="170rem" />
        </Navbar.Brand>
        <div>
          <input type="search" className="search px-2" placeholder="Search" />
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-links ms-auto">
            <Nav.Link as={Link} to="/" className="text-white b-700 link-nav">
              STORE
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="text-white b-700 link-nav">
              RESOURCE HUB
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="text-white b-700 link-nav">
              SUPPORT
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="text-white b-700 link-nav">
              REGISTER
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="text-white b-700 link-nav">
              LOGIN
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="text-white b-700 link-nav">
              <AiOutlineShoppingCart size="1.7rem" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const Banner = () => {
  return (
    <div
      className="banner-container position: relative"
      style={{ height: "130vh", width: "100wh" }}
    >
      <div className="clip-container position-relative">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block coursel-img"
              src={landing}
              alt="First slide"
            />
            {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
        <h1 className="banner-title">
          YOU CAN ALWAYS
          <i>
            <b style={{ fontSize: "3rem" }}> FIND</b>
          </i>{" "}
          <h1>
            SOMETHING YOU{" "}
            <i>
              <b style={{ fontSize: "3rem" }}>Want</b>
            </i>{" "}
          </h1>
        </h1>
      </div>
    </div>
  );
};

const Store = () => {
  const store = [
    { id: 1, name: "THERAPY MATERIALS", img: therepy },
    {
      id: 2,
      name: `PLAY & DEVELOPMENT`,
      img: play,
    },
    {
      id: 3,
      name: `HEARING AIDS & ACCESSSORIES`,
      img: hearing,
    },
    {
      id: 4,
      name: `STARTER KIT`,
      img: kit,
    },
  ];

  return (
    <div className="container my-4">
      <h2 className="benefits-title bg-600 text-center mb-4">STORE</h2>
      <div className="m-auto w-75">
        <Row>
          {store.map((item) => (
            <Col sm="3" key={item.id}>
              <img src={item.img} className="store-img" />
              <p className="b-600 text-center mt-3">{item.name}</p>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const Resource = () => {
  const store = [
    { id: 1, name: "THERAPY MATERIALS", img: therepy },
    {
      id: 2,
      name: `PLAY & DEVELOPMENT`,
      img: play,
    },
    {
      id: 3,
      name: `HEARING AIDS & ACCESSSORIES`,
      img: hearing,
    },
    {
      id: 4,
      name: `STARTER KIT`,
      img: kit,
    },
  ];

  return (
    <div className="container my-4">
      <h2 className="benefits-title bg-600 text-center mb-4">STORE</h2>
      <div className="m-auto w-75">
        <Row>
          {store.map((item) => (
            <Col sm="3" key={item.id}>
              <img src={item.img} className="store-img" />
              <p className="b-600 text-center mt-3">{item.name}</p>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};


const BenfitsOfCertification = () => {
  const benifits = [
    {
      id: 1,
      title: "ENHANCE OUTCOMES",
      icon: enhance,
    },
    {
      id: 2,
      title: "DISCOVER NEW STRATEGIES ",
      icon: discover,
    },
    {
      id: 3,
      title: `IMPROVE STANDING & CREDIBILITY`,
      icon: improve,
    },
    {
      id: 4,
      title: `CAREER DEVELOPMENT PROSPECTS`,
      icon: career,
    },
  ];

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#F1F0EE"
          d="M0,96L80,112C160,128,320,160,480,149.3C640,139,800,85,960,74.7C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <div
        className="m-auto"
        style={{ background: "#F1F0EE", marginTop: "-10%", zIndex: 19 }}
      >
        <h2 className="benefits-title bg-600 text-center mb-4">
          BENEFITS OF CERTIFICATION
        </h2>
        <Row className="mt-4 w-75 m-auto">
          {benifits.map((benfit) => (
            <Col key={benfit.id} sm="3" className="p-2 px-4 mb-3">
              <div
                className="bg-landingPrimary br-2 p-2 text-center d-flex flex-column align-items-center justify-content-center"
                style={{ height: "12rem" }}
              >
                <img src={benfit.icon} style={{ width: "4rem" }} />
                <p className="text-center text-white b-600 mt-3">
                  {benfit.title}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <svg
        style={{ marginTop: "-1rem", zIndex: "-400" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#F1F0EE"
          d="M0,96L80,122.7C160,149,320,203,480,192C640,181,800,107,960,96C1120,85,1280,139,1360,165.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
};

const Board = () => {
  return (
    <div className="text-center w-75 m-auto">
      <h1 className="text-landingPrimary b-600 mb-4">SPHECHO BOARD</h1>
      <p className="my-4" style={{ fontSize: "1.2rem" }}>
        The SPHECHO certification procedures and content undergo various reviews
        and validation, pursuant to the professions that are eligible for
        certification, as well as standards established by content experts in
        the field across the globe. Please click on a topic below to view common
        questions. Once you have chosen your topic simply click any question to
        reveal the answer. Can’t find an answer to your question? Contact us
        today. Our board at SPHECHO is commitied to ensuring the creation and
        implementation of world-class training and certification programs that
        will enhance the general standard of care and instruction for
        professionals, parents, and caregivers. The Board is made up of a
        variety of the world's top experts, researchers from prestigious
        universities, special education directors, corporate leaders, clinicians
        in the field of mental health, speech therapists, occupational
        therapists, physiotherapists, behavioral therapists and psychologists,
        counsellors, audiologists, and parents.
      </p>
    </div>
  );
};

const Member = ({
  name,
  title,
  img,
}: {
  name: string;
  title: string;
  img?: string;
}) => {
  return (
    <div>
      <img
        className="fluid shadow mb-3"
        src={noImage}
        width="180rem"
        style={{ borderRadius: "50%" }}
      />
      <p className="mb-1 b-600" style={{ fontSize: "1.4rem" }}>
        {name}
      </p>
      <p>
        <i style={{ fontSize: "1.2rem" }}>{title}</i>
      </p>
    </div>
  );
};

const Committe = () => {
  const advaisoryMemebers = [
    {
      id: 1,
      name: "Dr. Swaleha Mohamedali",
      title: "Educational consultant",
    },
    {
      id: 2,
      name: "Dr. Aamir Khamis Al Toubi",
      title: "Consultant Speech Language Pathologist",
    },
    {
      id: 3,
      name: "Udaya Kiran Guttarlapalle",
      title: "Senior Speech Language Pathologist",
    },
  ];

  return (
    <div className="container" style={{ marginTop: "7rem" }}>
      <div
        style={{ width: "90%" }}
        className="m-auto br-4 bg-landingGary text-center py-5 px-4"
      >
        <h5 className="mb-4 pb-3">ADVISORY PANEL MEMBERS</h5>
        <Row className="mb-2">
          {advaisoryMemebers.map((member) => (
            <Col key={member.id} sm="4" className="text-center">
              <Member {...{ ...member }} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const InternalCommitee = () => {
  const members = [
    [
      {
        id: 1,
        name: "Sathish Chandra Segar",
        title: `Clinical Director at the Qatar Institute for Speech & Hearing`,
      },
      {
        id: 2,
        name: "Hebatulla Ibrahim Farrag",
        title: `Clinical Director and Speech and Language Pathologist at the Qatar Institute for Speech & Hearing`,
      },
      {
        id: 3,
        name: "Varun G Rai",
        title: `Clinical Audiologist and Application
Specialist at the Qatar Institute for
Speech & Hearing`,
      },
    ],
    [
      {
        id: 1,
        name: "Jaseena NK",
        title: `Human Resource Manager at
Qatar Institute for Speech & Hearing`,
      },
      {
        id: 2,
        name: "Mahmoud El Abassiry",
        title: `Manager at Qatar Institute for
Speech & Hearing`,
      },
      {
        id: 3,
        name: "Tamer Rashed",
        title: `Manager at Qatar Institute for
Speech & Hearing Rehabilitation Center`,
      },
    ],
  ];

  return (
    <div
      className="container"
      style={{ marginTop: "7rem", marginBottom: "6rem" }}
    >
      <div
        style={{ width: "90%" }}
        className="m-auto br-4 bg-landingGary text-center py-5 px-4"
      >
        <h5 className="mb-4 pb-3">INTERNAL REVIEW COMMITTEE</h5>
        <Row className="mb-4">
          {members[0].map((member) => (
            <Col key={member.id} sm="4" className="text-center">
              <Member {...{ ...member }} />
            </Col>
          ))}
        </Row>
        <Row className="mb-2">
          {members[1].map((member) => (
            <Col key={member.id} sm="4" className="text-center">
              <Member {...{ ...member }} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

const FAQS = () => {
  const faqs = [
    {
      id: 1,
      header: "What is the SPHECHO Certification Program",
    },
    {
      id: 2,
      header: "Who verifies the SPHECHO credentials?",
    },
    {
      id: 3,
      header: "What is the value in becoming certified?",
    },
    {
      id: 4,
      header: "What job can I get with this certification?",
    },
    {
      id: 5,
      header:
        "Once I register to begin my certification program, how long do I have to complete the training and exam?",
    },
    {
      id: 6,
      header: "Is the online learning available on demand?",
    },
    {
      id: 7,
      header: "When do the courses start?",
    },
    {
      id: 8,
      header: "When do the courses start?",
    },
    {
      id: 9,
      header:
        "After I complete my final exam and submit my application, how long will it be before I get my certification?",
    },
  ];

  return (
    <div
      className="container m-auto text-center"
      style={{ marginBottom: "5rem" }}
    >
      <div className="w-75 m-auto ">
        <h1 className="text-landingPrimary my-4">FREQUENTLY ASKED QUESTIONS</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "6rem" }}>
          Please click on a topic below to view common questions. Once you have
          chosen your topic simply click any question to reveal the answer.
          Can’t find an answer to your question? Contact us today
        </p>
        <Accordion defaultActiveKey="0">
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
                style={{ fontSize: "1.2rem" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

const RequestForm = () => {
  return (
    <div className="bg-image" style={{ margin: "8rem 0rem" }}>
      <div className="container p-2">
        <div className="m-auto text-center py-4 my-4" style={{ zIndex: 10 }}>
          <h2 className="text-white mb-3 b-700">
            CONNECT WITH SPHECHO TO LEARN MORE ABOUT CERTIFICATION
          </h2>
          <p className="text-white mb-3">
            Fill out the form below to find out more about your certification
            options
          </p>
          <div className="input-container">
            <Row>
              <Col sm="6" className="p-3">
                <input className="input px-2" placeholder="Name" />
              </Col>
              <Col sm={6} className="p-3">
                <input className="input px-2" placeholder="Name" />
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="p-3">
                <input className="input" placeholder="Email address" />
              </Col>
              <Col sm={4} className="p-3">
                <input className="input px-2" placeholder="Country" />
              </Col>
              <Col sm={4} className="p-3">
                <input
                  className="input px-2"
                  placeholder="Country Code + Phone Number"
                />
              </Col>
            </Row>
            <Row>
              <Col sm="6" className="p-2">
                <input className="input px-2" placeholder="Job Title" />
              </Col>
              <Col sm={6} className="p-2">
                <input className="input px-2" placeholder="Organization" />
              </Col>
            </Row>
            <Row>
              <Col className="p-2">
                <p className="text-white">Additional Questions to Discuss</p>
                <textarea className="input px-4" style={{ height: "6rem" }} />
              </Col>
            </Row>
            <Button className="bg-white text-black">Sumbit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewLetter = () => {
  return (
    <div className="mb-5 pb-4">
      <div className="container mb-4">
        <div className="m-auto w-75">
          <h2
            className=" text-center mb-4 b-700"
            style={{ color: "rgb(163, 160, 160)" }}
          >
            SUBSCRIBE TO OUR NEWSLETTER
          </h2>
          <Row>
            <Col sm="9" className="p-2">
              <input
                className="newLetter-input"
                placeholder="Enter your Email Address"
              ></input>
            </Col>
            <Col sm="3" className="p-2 m-auto">
              <Button className="newsLetter-btn">Subscribe</Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const speechLinks = [
    {
      title: "SPEECH THERAPY",
    },
    {
      title: "EDUCATIONAL CONSULTATION",
    },
    {
      title: "OCCUPATIONAL THERAPY",
    },
    {
      title: "BEHAVIORAL & PSYCHOLOGICAL",
    },
    {
      title: "PHYSIOTHERAPY",
    },
    {
      title: "COUNSELLING",
    },
    {
      title: "AUDIOLOGY",
    },
  ];

  const usefullLinks = [
    {
      title: "PROVIDERS",
    },
    {
      title: "SPHECHO SERVICE",
    },
    {
      title: "SPHECHO SHOP",
    },
    {
      title: "SPHECHO SCHOLAR",
    },
  ];

  const aboutUs = [
    {
      title: "BLOG",
    },
    {
      title: "PRIVACY POLICY",
    },
    {
      title: "TERMS & CONDITIONS",
    },
    {
      title: "RENEWAL POLICY",
    },
    {
      title: "CERTIFICATION PROCESS",
    },
    {
      title: "DIGITAL BADGES",
    },
  ];

  return (
    <footer>
      <div className="">
        <Row>
          <Col sm="3" className="p-4">
            <div className="d-flex flex-column align-items-center">
              <img src={colorLogo} width="126rem" />
              <div className="d-flex mt-2">
                <img
                  src={fb}
                  width="35rem"
                  style={{ margin: ".5rem", cursor: "pointer" }}
                />
                <img
                  src={ig}
                  width="35rem"
                  style={{ margin: ".5rem", cursor: "pointer" }}
                />
                <img
                  src={ins}
                  width="35rem"
                  style={{ margin: ".5rem", cursor: "pointer" }}
                />
                <img
                  src={tw}
                  width="35rem"
                  style={{ margin: ".5rem", cursor: "pointer" }}
                />
                <img
                  src={yt}
                  width="35rem"
                  style={{ margin: ".5rem", cursor: "pointer" }}
                />
              </div>
              <img
                src={playstore}
                width="150rem"
                style={{ display: "block", marginTop: "1rem" }}
              />
              <img
                src={apple}
                width="150rem"
                style={{ display: "block", marginTop: "1rem" }}
              />
            </div>
          </Col>
          <Col sm="9">
            <div className="navlinks-container-footer p-3">
              <Row>
                <Col sm="2"></Col>
                <Col sm="4" className="p-2">
                  <p className="b-700 mb-2 link-header">DEPARTMENTS</p>
                  {speechLinks.map((link) => (
                    <Link key={link.title} className="link b-400" to="/">
                      {link.title}
                    </Link>
                  ))}
                </Col>
                <Col sm="3">
                  <p className="b-700 mb-2 link-header">USEFUL LINKS</p>
                  {usefullLinks.map((link) => (
                    <Link key={link.title} className="link b-400" to="/">
                      {link.title}
                    </Link>
                  ))}
                </Col>
                <Col sm="3">
                  <p className="b-700 mb-2 link-header">ABOUT US</p>
                  {aboutUs.map((link) => (
                    <Link key={link.title} className="link b-400" to="/">
                      {link.title}
                    </Link>
                  ))}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Shop;
