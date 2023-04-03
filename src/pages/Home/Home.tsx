import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Accordion from "react-bootstrap/Accordion";
import career from "../../assets/career.png";
import discover from "../../assets/discover.png";
import enhance from "../../assets/enhance.png";
import improve from "../../assets/improve.png";
import noImage from "../../assets/no-img.png";
import colorLogo from "../../assets/colorlogo.png";
import lb1 from "../../assets/lb1.jpg";
import feature from "../../assets/feature.png";

import apple from "../../assets/apple.png";
import fb from "../../assets/fb.png";
import ig from "../../assets/ig.png";
import ins from "../../assets/in.png";
import playstore from "../../assets/playstore.png";
import tw from "../../assets/tw.png";
import yt from "../../assets/yt.png";

import wave from "../../assets/wave.png";

import "./home.scss";
import Fade from "react-reveal/Fade";
import Navbar from "./Navbar";

import c1 from "../../assets/c1.png";
import c2 from "../../assets/c2.png";
import c3 from "../../assets/c3.png";

// const Home = () => {
//   return <iframe style={{width: '100vw', height: "100vh"}} src="HTML/index.html"></iframe>
// }

const Home = () => {
  return (
    <>
      <Navbar />
      <div style={{ width: "100vw", overflowX: "hidden" }}>
        <Banner />
        <TitleContainer />
        <FeatureSection />
        <FeaturedCourses />
        <Introduction />
        <Committe />
        <InternalCommitee />
        <FAQS />
        <RequestForm />
        <NewLetter />
        <Footer />
      </div>
    </>
  );
};

const Banner = () => {
  return (
    <div>
      <div
        className="banner-container"
        style={{ height: "130vh", width: "100wh", position: "relative" }}
      >
        {/* <svg
        id="svgPath"
        viewBox="0 0 1438 693"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="clipPath" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.001390820584, 0.00144300144)"
              d="M153 598C56.6 601.2 56.5 630 0.5 660V0.5H1437.5V566C1413.05 580.421 1210.85 695.396 1066.5 692C913.885 688.409 817.872 566 758 566C641.5 566 550.202 680 465.5 680C341.5 680 273.5 594 153 598Z"
              stroke="black"
            />
          </clipPath>
        </defs>
      </svg> */}
        <div className="clip-container position-relative">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block coursel-img"
                src={lb1}
                alt="First slide"
              />
            </Carousel.Item>
            {/* <Carousel.Item>
              <img
                className="d-block coursel-img"
                src={lb2}
                alt="First slide"
              />
            </Carousel.Item> */}
          </Carousel>
          <Fade left>
            <div className="banner-title">
              <h1
                className=" text-white"
                style={{
                  textAlign: "center",
                  margin: "auto",
                  paddingTop: "5rem",
                }}
              >
                <h1 style={{ fontWeight: "bold" }}>
                  LEARN CONTINUALLY- THERE’S ALWAYS{" "}
                </h1>
                <i>
                  <b style={{ fontSize: "3rem" }}>“ONE MORE THING” </b>
                </i>{" "}
                TO LEARN.
              </h1>
            </div>
          </Fade>
        </div>
      </div>
      {/* <img
        className="wave"
        src={wave}
        style={{ width: "100%", position: "absolute", bottom: "0" }}
      /> */}
      {/* <div className="wave-container-banner ">
        <div className="wave"></div>
      </div> */}
    </div>
  );
};

const TitleContainer = () => {
  return (
    <div className="title-content">
      <Fade bottom>
        <p>
          Our training platform is a comprehensive learning management system
          for all professionals and individuals who work alongside people of
          determination. The Sphecho courses, which are constructed and
          incorporated into this system, aids in developing professionals into
          the finest in their field of telerehabilitation. Additionally, the
          system is built to offer webinars and educational sessions.
        </p>
      </Fade>
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

const FeatureSection = () => {
  return (
    <section style={{ position: "relative", marginBottom: "20rem" }}>
      <div style={{ position: "relative" }}>
        <Fade bottom>
          <img
            src={feature}
            style={{
              width: "100%",
              height: "45rem",
              objectFit: "cover",
              borderRadius: "0 20rem 0 20rem ",
            }}
          />
        </Fade>
        <Fade left>
          <div style={{ position: "absolute", top: "8rem", left: "6rem" }}>
            <h1
              style={{
                fontWeight: "800",
                marginBottom: "2rem",
                color: "black",
              }}
            >
              This below features are <br></br> currently available <br></br>
              only for Sphecho <br></br> Providers.
            </h1>
            <CButton title={"Know more"} onClick={() => {}} />
          </div>
        </Fade>
        <div style={{ position: "absolute", top: "40rem", left: "15rem" }}>
          <FeatureButtons />
        </div>
      </div>
    </section>
  );
};

const FeatureButtons = () => {
  return (
    <section
      className="container"
      style={{ marginTop: "-5rem", zIndex: "10999" }}
    >
      <Row>
        <Col sm={4}>
          <Fade bottom>
            <div
              style={{
                background: "white",
                width: "22rem",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "22rem",
                borderRadius: "3rem 0 3rem 0",
                boxShadow: "0 0 20px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
                My Blackboard
              </h2>
              <p className="text-center">
                My Blackboard provides users with one location to view and act
                on their capability development information. It aggregates
                information from across the learning system for a user.
              </p>
            </div>
          </Fade>
        </Col>
        {/* 2 */}
        <Col sm={4}>
          <Fade bottom>
            <div
              style={{
                background: "white",
                width: "22rem",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "22rem",
                borderRadius: "3rem 0 3rem 0",
                boxShadow: "0 0 20px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
                Courses
              </h2>
              <p className="text-center">
                My Blackboard provides users with one location to view and act
                on their capability development information. It aggregates
                information from across the learning system for a user.
              </p>
            </div>
          </Fade>
        </Col>
        {/* 3 */}
        <Col sm={4}>
          <Fade bottom>
            <div
              style={{
                background: "white",
                width: "22rem",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                height: "22rem",
                borderRadius: "3rem 0 3rem 0",
                boxShadow: "0 0 20px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
                My Blackboard
              </h2>
              <p className="text-center">
                The Sphecho Courses allow Providers and parents to access course
                materials online. A variety of free courses are available to
                promote development and resourcefulness.
              </p>
            </div>
          </Fade>
        </Col>
      </Row>
    </section>
  );
};

const FeaturedCourses = () => {
  return (
    <section
      className="bg-primary"
      style={{
        borderRadius: "0 20rem 0rem 0",
        marginRight: "1rem",
        marginBottom: "5rem",
      }}
    >
      <Fade left>
        <h1 style={{ marginLeft: "3rem", paddingTop: "2rem", color: "white" }}>
          Featured courses
        </h1>
      </Fade>
      <Fade left>
        <div className="" style={{ padding: "3rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              overflowX: "scroll",
            }}
          >
            <FeatureCourseCard
              img={c1}
              title="Facilitator Course"
              subTitle={"Online Training, Assessment, and Certification"}
              isCommingSoon={true}
            />
            <FeatureCourseCard
              img={c2}
              title="Telepractice Course"
              subTitle={"Online Training, Assessment, and Certification"}
              isCommingSoon={true}
            />
            <FeatureCourseCard
              img={c3}
              title="Provider Onboarding Course"
              subTitle={"Online Training, Assessment, and Certification"}
            />
          </div>
        </div>
      </Fade>
    </section>
  );
};

const FeatureCourseCard = ({
  img,
  title,
  subTitle,
  isCommingSoon,
}: {
  isCommingSoon?: boolean;
  title: string;
  img: string;
  subTitle: string;
}) => {
  return (
    <div
      style={{
        background: "white",
        width: "24rem",
        padding: "1rem",
        borderRadius: "2rem",
        minHeight: "28rem",
        boxShadow: "0px 0px 20px 10px rgba(0,0,0, 0.1)",
        margin: "0 2rem",
      }}
    >
      <img
        src={img}
        style={{
          width: "100%",
          height: "15rem",
          objectFit: "cover",
          borderRadius: ".8rem",
        }}
      />
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginTop: "2rem",
        }}
      >
        {title}
      </p>
      <p>{subTitle}</p>
      {isCommingSoon ? (
        <div
          className="text-primary"
          style={{
            padding: "1rem",
            borderRadius: "1rem",
            fontWeight: "500",
          }}
        >
          Comming soon
        </div>
      ) : null}
    </div>
  );
};

const CButton = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: "pointer",
        border: "none",
        padding: "1rem 2rem",
        borderRadius: ".8rem",
        background: "black",
        color: "white",
      }}
    >
      {title}
    </button>
  );
};

const Introduction = () => {
  const learingOutcomes = [
    "Enrich professional and clinical work experiences in pertinent fields.",
    "Adapt to virtual patient client care environment in context of Covid's rapid advancement of integrative technologies.",
    "Enhance existing prerequisite through solid understanding of telepractice.",
    "Strategically use telepractice as a teaching methodology to ensure clinical competency.",
    "Analyze how the current remote learning is affecting early intervention and education for people of determination.",
    "Recognize telepractice as a service delivery paradigm that enhances parent coaching.",
  ];

  return (
    <section
      style={{
        background: "#F1F0EE",
        padding: "5rem 1rem",
        borderRadius: "12rem 0rem 0 0",
        position: "relative",
        marginBottom: "10rem",
      }}
    >
      <div className="container">
        <div>
          <Fade bottom>
            <h1>Introduction</h1>
            <p style={{ marginBottom: "5rem", maxWidth: "60rem" }}>
              Among the many benefits of online learning, you'll find that
              virtual education allows you to enjoy a more flexible schedule and
              allows you to more easily develop your profession alongside
              furthering your education. We at Sphecho intend to add a number of
              courses to our Global Outreach Program in the forthcoming months.
              For the year, Sphecho will be focusing primarily on their Provider
              Onboarding Course to help professionals better comprehend online
              telepractice and to boost their effectiveness in telepractice
              through Sphecho platform participation.
            </p>
            <h1>Learning Outcomes</h1>
            <p style={{ paddingBottom: "5rem" }}>
              Upon completion of this course, learners will be able to:
            </p>
          </Fade>
        </div>
      </div>
      <div style={{ position: "absolute", top: "30rem", left: "5rem" }}>
        <Fade left>
          <div className="d-flex align-items-center gap-3">
            {learingOutcomes.map((title, idx) => {
              return <IntroCard key={idx} title={title} />;
            })}
          </div>
        </Fade>
      </div>
    </section>
  );
};

const IntroCard = ({ title }) => {
  return (
    <div
      style={{
        borderRadius: "0 3rem 0 3remf ",
        background: "#67b045",
        padding: "1rem",
        width: "15rem",
        minHeight: "15rem",
        boxShadow: "0 0 30 10px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      {title}
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
      content:
        "The SPHECHO certification program is intended to assess the knowledge, talents, and skills needed to carry out a certain job, and, upon passing a certification exam, to serve as a testament to an individual's level of professional competence.",
    },
    {
      id: 2,
      header: "Who verifies the SPHECHO credentials?",
      content:
        "Our credentials are governed and approved by our professional board that frequently reviews all policies and procedures of SPHECHO. The board is composed of a variety of specialists and experts, including clinical experts, therapists, special education professionals etc.",
    },
    {
      id: 3,
      header: "What is the value in becoming certified?",
      content: `Recognition for voluntarily meeting standards beyond professional and regional licensing requirements
      Enhancement of reputation and credibility`,
    },
    {
      id: 4,
      header: "What job can I get with this certification?",
      content:
        "SPHECHO does not guarantee employment or specific job roles, however many professionals can utilize SPHECHO credentials on their professional resume to assist them in standing out among other applicants. All SPHECHO providers are certified.",
    },
    {
      id: 5,
      header:
        "Once I register to begin my certification program, how long do I have to complete the training and exam?",
      content:
        "You will have to complete the coursework and final exam within 30 days.",
    },
    {
      id: 6,
      header: "Is the online learning available on demand?",
      content:
        "Yes, the SPHECHO learning management system is available 24/7 and is accessible as long as you have internet access. Once you have registered as a provider on the SPHECHO platform and paid for your program, you will be able to access the training modules online.",
    },
    {
      id: 7,
      header: "When do the courses start?",
      content:
        "Once you register and pay for your program, you will have access to your online profile and application. You then have 30 days to access the online training, complete your profile and application details, pass the exam, and submit for approval. ",
    },
    {
      id: 8,
      header:
        "After I complete my final exam and submit my application, how long will it be before I get my certification?",
      content:
        "Upon board approval, your certification packet will be prepared within 2-3 weeks. Once approved, you will have immediate access to the digital copy of your certificate and badge.",
    },
  ];

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
        <Accordion defaultActiveKey="0">
          {faqs.map((faq) => (
            <Accordion.Item
              key={faq.id}
              eventKey={`${faq.id}`}
              className="accordion-item"
            >
              <Accordion.Header className="accordin-h">
                <p className="accordin-title">{faq.header}</p>
              </Accordion.Header>
              <Accordion.Body
                className="accordin-content"
                style={{ fontSize: "1.2rem" }}
              >
                {faq.content}
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
            <p className="tiny text-white pt-2">
              This site is protected by SPHECHO privacy policy and its terms and
              conditions
            </p>
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
        <p className="text-center pt-2">
          By subscribing, you consent to us sharing updates with you.
        </p>
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

export default Home;
