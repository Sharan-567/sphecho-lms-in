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
import {
  JOIN_OUR_NETWORK,
  QISH_HOST,
  SERVICE_URLS,
} from "../../features/settings";

import {
  AiOutlineUserAdd,
  AiOutlineFileDone,
  AiOutlineVideoCamera,
  AiOutlineQuestionCircle,
  AiOutlineCheckCircle,
  AiOutlineFileProtect,
} from "react-icons/ai";

// const Home = () => {
//   return <iframe style={{width: '100vw', height: "100vh"}} src="HTML/index.html"></iframe>
// }

export const LEARN_URL = "";
export const SERVICE_URL = "";
export const SHOP_URL = "";
export const SCHOLAR_URL = "";

const Home = () => {
  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <div
        style={{ width: "100vw", overflowX: "hidden", marginTop: "-6.8rem" }}
      >
        <Banner />
        <TitleContainer />
        <FeatureSection />
        <FeaturedCourses />
        <Introduction />
        <BenfitsOfCertification />
        <CertificationProcess />
        <FAQS />
        <RequestForm />
        <NewLetter />
        <TagLine />
        <Footer />
      </div>
      <StickyBar />
    </div>
  );
};

const StickyBar = () => {
  return (
    <a
      href={JOIN_OUR_NETWORK}
      target="__blank"
      style={{
        padding: "1.5rem 3rem",
        background: "black",
        color: "white",
        cursor: "pointer",
        position: "fixed",
        top: "45vh",
        right: "-1rem",
        zIndex: 999,
        borderRadius: "5rem 0 0 5rem",
        boxShadow: "0px 0px 20px 10px rgba(0,0,0,0.2)",
        textDecoration: "none",
      }}
    >
      Join our network
    </a>
  );
};

const Banner = () => {
  return (
    <div style={{ marginTop: 0 }}>
      <div
        className="banner-container"
        style={{
          height: "130vh",
          width: "100wh",
          position: "relative",
          marginTop: "",
        }}
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
        <div
          className=" position-relative"
          style={{ marginTop: "-5rem", zIndex: 1 }}
        >
          <Carousel>
            <Carousel.Item>
              <img className=" coursel-img" src={lb1} alt="First slide" />
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
          incorporated into this <br></br> system, aids in developing
          professionals into the finest in their field of telerehabilitation.
          <br></br>Additionally, the system is built to offer webinars and
          educational sessions.
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
    <div
      style={{
        background: "#F1F0EE",
        zIndex: 19,
        padding: "5rem 1rem",
        marginTop: "10rem",
        borderRadius: "0rem 0rem 20rem 0rem",
      }}
    >
      <h2 className="benefits-title bg-600 text-center mb-4">
        BENEFITS OF CERTIFICATION
      </h2>
      <Fade bottom>
        <Row className="mt-4 w-75 m-auto">
          {benifits.map((benfit) => (
            <Col key={benfit.id} sm="3" className="p-2 px-4 mb-3">
              <div
                className="bg-landingPrimary  p-2 text-center d-flex flex-column align-items-center justify-content-center"
                style={{
                  height: "18rem",
                  borderRadius: "0 7rem  0 0",
                  boxShadow: "0 0 20px 10px rgba(0,0,0,0.1)",
                }}
              >
                <img src={benfit.icon} style={{ width: "4rem" }} />
                <p className="text-center text-white b-600 mt-3">
                  {benfit.title}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Fade>
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
            <CButton title={"Join our network"} onClick={() => {}} />
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
                The Sphecho Courses allow Providers and parents to access course
                materials online. A variety of free courses are available to
                promote development and resourcefulness.
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
                Certifications and Badges
              </h2>
              <p className="text-center">
                Our digital certification and badging programs provide
                recognition of skills and achievements through secure and
                verifiable digital credentials.
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
      id="feature-courses"
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
              img={c3}
              title="Provider Onboarding Course"
              subTitle={"Online Training, Assessment, and Certification"}
              joinournetwork={true}
            />
            <FeatureCourseCard
              img={c2}
              title="Telepractice Course"
              subTitle={"Online Training, Assessment, and Certification"}
              isCommingSoon={true}
            />
            <FeatureCourseCard
              img={c1}
              title="Facilitator Course"
              subTitle={"Online Training, Assessment, and Certification"}
              isCommingSoon={true}
            />
          </div>
        </div>
      </Fade>
    </section>
  );
};

const TagLine = () => {
  return (
    <div className="container" style={{ margin: "7rem 0rem" }}>
      <h1 style={{ fontWeight: "900", color: "black", textAlign: "center" }}>
        REVERBERATING YOUR NEEDS
      </h1>
      <p className="text-center">THROUGH DETERMINATION</p>
    </div>
  );
};

const FeatureCourseCard = ({
  img,
  title,
  subTitle,
  isCommingSoon,
  joinournetwork,
}: {
  isCommingSoon?: boolean;
  title: string;
  img: string;
  subTitle: string;
  joinournetwork?: boolean;
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
      {joinournetwork ? (
        <a
          href={JOIN_OUR_NETWORK}
          target="__blank"
          className="text-black "
          style={{
            padding: "1rem",
            borderRadius: "1rem",
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          Join our network
        </a>
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
        borderRadius: "20rem 0rem 0 0",
        position: "relative",
        marginBottom: "15rem",
        zoom: "98%",
      }}
    >
      <div className="container">
        <div>
          <Fade left>
            <h1 className="text-center">Introduction</h1>
            <p
              className="text-center"
              style={{
                margin: "auto",
                paddingBottom: "5rem",
                maxWidth: "60rem",
              }}
            >
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
            <h1 className="text-center">Learning Outcomes</h1>
            <p className="text-center" style={{ paddingBottom: "3rem" }}>
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
        borderRadius: "0 3rem 0 3rem ",
        background: "white",
        padding: "1rem",
        width: "15rem",
        minHeight: "15rem",
        boxShadow: "0 0 30px 10px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "black ",
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
        The Sphecho certification procedures and content undergo various reviews
        and validation, pursuant to the professions that are eligible for
        certification, as well as standards established by content experts in
        the field across the globe. Please click on a topic below to view common
        questions. Once you have chosen your topic simply click any question to
        reveal the answer. Can’t find an answer to your question? Contact us
        today. Our board at Sphecho is commitied to ensuring the creation and
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

const CertificationProcess = () => {
  return (
    <section id="process" style={{ marginTop: "5rem", marginBottom: "10rem" }}>
      <div></div>
      <div className="container" style={{ maxWidth: "50rem" }}>
        <h1 className="text-center" style={{ fontWeight: "" }}>
          Certification Process
        </h1>
        <p className="text-center mb-5">
          The Sphecho Certification program for non-Sphecho Providers that is
          created in union with its board i.e., the Regional Advisory Panel
          Members and the Internal Review Committee consisting of clinical and
          subject matter experts is evidence-based and is due to be launched by
          January 2024.
        </p>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "5rem",
          }}
        >
          <CButton title={"Know more"} onClick={() => {}} />
        </div> */}
      </div>

      <Fade cascade bottom>
        <div
          className="d-flex gap-3 container justify-content-between"
          style={{ maxWidth: "80rem" }}
        >
          <div className="process-item">
            <AiOutlineUserAdd className="process_icon" />
            <p>Sign up online</p>
            <div className="triangle">▶</div>
          </div>
          <div className="process-item">
            <AiOutlineFileDone className="process_icon" />
            <p>Complete application</p>
            <div className="triangle">▶</div>
          </div>
          <div className="process-item">
            <AiOutlineVideoCamera className="process_icon" />
            <p>Online training</p>
            <div className="triangle">▶</div>
          </div>
          <div className="process-item">
            <AiOutlineQuestionCircle className="process_icon" />
            <p>Certification exam</p>
            <div className="triangle">▶</div>
          </div>
          <div className="process-item">
            <AiOutlineCheckCircle className="process_icon" />
            <p>Board approval</p>
            <div className="triangle">▶</div>
          </div>
          <div className="process-item">
            <AiOutlineFileProtect className="process_icon" />
            <p>Certification issued</p>
          </div>
        </div>
      </Fade>
    </section>
  );
};

const FAQS = () => {
  const faqs = [
    {
      id: 1,
      header: "What is the Sphecho Certification Program",
      content:
        "The Sphecho certification program is intended to assess the knowledge, talents, and skills needed to carry out a certain job, and, upon passing a certification exam, to serve as a testament to an individual's level of professional competence.",
    },
    {
      id: 2,
      header: "Who verifies the Sphecho credentials?",
      content:
        "Our credentials are governed and approved by our professional board that frequently reviews all policies and procedures of Sphecho. The board is composed of a variety of specialists and experts, including clinical experts, therapists, special education professionals etc.",
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
        "Sphecho does not guarantee employment or specific job roles, however many professionals can utilize Sphecho credentials on their professional resume to assist them in standing out among other applicants. All Sphecho providers are certified.",
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
        "Yes, the Sphecho learning management system is available 24/7 and is accessible as long as you have internet access. Once you have registered as a provider on the Sphecho platform and paid for your program, you will be able to access the training modules online.",
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
      id="faqs"
      className="container m-auto text-center"
      style={{ marginBottom: "5rem", zoom: "90%" }}
    >
      <div className="w-75 m-auto ">
        <h1 className="text-black my-4 b-600">FREQUENTLY ASKED QUESTIONS</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "6rem" }}>
          Please click on a topic below to view common questions. Once you have
          chosen your topic simply click any question to reveal the answer.
          Can’t find an answer to your question? Contact us today
        </p>

        <Accordion defaultActiveKey="0">
          {faqs.map((faq) => (
            <Fade bottom>
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
            </Fade>
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
            CONNECT WITH Sphecho TO LEARN MORE ABOUT CERTIFICATION
          </h2>
          <p className="text-white mb-3">
            Fill out the form below to find out more about your certification
            options
          </p>
          <div className="input-container">
            <Row>
              <Col sm="6" className="p-3">
                <input className="input px-2" placeholder="First name" />
              </Col>
              <Col sm={6} className="p-3">
                <input className="input px-2" placeholder="Last name" />
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
                <p className="text-white">Additional questions to discuss</p>
                <textarea className="input px-4" style={{ height: "6rem" }} />
              </Col>
            </Row>
            <Button className="bg-white text-black px-5 py-3 br-4">
              Sumbit
            </Button>
            <p className="tiny text-white pt-2">
              This site is protected by Sphecho privacy policy and its terms and
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
    <div
      className="mb-5 p-5 container"
      style={{ zoom: "90%", background: "#f1f0ee", borderRadius: "2rem" }}
    >
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

const Footer = ({ setCurrentContent }) => {
  const speechLinks = [
    {
      title: "Speech Therapy",
      link: SERVICE_URLS.speech,
    },
    {
      title: "Eduational Consultation",
      link: SERVICE_URLS.education,
    },
    {
      title: "Ocuupational Therapy",
      link: SERVICE_URLS.occupation,
    },
    {
      title: "Behavioral & Psychological",
      link: SERVICE_URLS.behavioral,
    },
    {
      title: "Physiotherapy",
      link: SERVICE_URLS.physiotherapy,
    },
    {
      title: "Counselling",
      link: SERVICE_URLS.counselling,
    },
    {
      title: "Audiology",
      link: SERVICE_URLS.audiology,
    },
  ];

  const usefullLinks = [
    {
      title: "Providers",
      link: `https://${QISH_HOST}`,
    },
    {
      title: "Sphecho Service",
      link: `https://${QISH_HOST}`,
    },
    {
      title: "Sphecho Shop",
      link: "http://Sphecho-shop.metahos.com",
    },
    {
      title: "Sphecho Scholar",
      link: "",
    },
  ];

  return (
    <footer className="footer-container" style={{ overflowX: "hidden" }}>
      <div
        style={{
          backgroundColor: "#EAEAEA",
        }}
      >
        <Row>
          <Col lg="3" style={{ paddingTop: "5rem" }}>
            <div className="d-flex flex-column align-items-center ">
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
          <Col lg="9" className="footer-custome">
            <div
              style={{
                backgroundImage: 'url("https://svgshare.com/i/pdj.svg")',
                backgroundColor: "black",
                borderRadius: "3rem 0 0 3rem ",
                backgroundRepeat: "no-repeat",
                backgroundSize: "123%",
                padding: "3rem 2rem",
              }}
              className="navlinks-container-footer"
            >
              <Row>
                <Col lg="2"></Col>
                <Col lg="4" className="p-2">
                  <h5
                    className="mb-2 link-header text-white"
                    style={{ fontWeight: "bold" }}
                  >
                    DEPARTMENTS
                  </h5>
                  {speechLinks.map((l) => (
                    <a key={l.title} className="link b-400" href={l.link}>
                      {l.title.charAt(0).toUpperCase() + l.title.slice(1)}
                    </a>
                  ))}
                </Col>
                <Col lg="3">
                  <h5
                    className="mb-2 link-header text-white"
                    style={{ fontWeight: "bold" }}
                  >
                    USEFUL LINKS
                  </h5>
                  {usefullLinks.map((l) => (
                    <a key={l.title} className="link b-400" href={l.link}>
                      {l.title}
                    </a>
                  ))}
                </Col>
                <Col lg="3">
                  <h5
                    className="mb-2 link-header text-white"
                    style={{ fontWeight: "bold" }}
                  >
                    ABOUT US
                  </h5>

                  <a href="#process" className="link b-400">
                    Certification process
                  </a>
                  <Link to="/privacy" className="link b-400">
                    Privacy Policy
                  </Link>
                  <a className="link b-400" href="#faqs">
                    FAQS
                  </a>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ background: "white", padding: ".5rem" }}>
        <div className="container" style={{ background: "white" }}>
          {/* <p className="text-center" style={{ fontWeight: '500' }}>
            If you are in a life threatening situation - don’t use this site.
            Kindly contact your respective national helpline to get immediate
            assistance.
          </p> */}
          <div
            className="d-flex justify-content-between"
            style={{ marginTop: "0rem" }}
          >
            <p>© 2023 All rights reserved. Teleoutreach Services Pvt. Ltd.</p>
            <div className="d-flex">
              <Link
                style={{ margin: "0rem 1rem", cursor: "pointer" }}
                to="/privacy"
              >
                Privacy Policy
              </Link>
              <a
                style={{ margin: "0rem 1rem", cursor: "pointer" }}
                href="#faqs"
              >
                FAQS
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Home;
