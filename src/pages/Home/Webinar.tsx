import * as React from "react";
import { Container, Row, Col } from "react-bootstrap";

// import wave from './assets/img/wave-cut.png';
import banner from "../../assets/lb2.jpg";
import lb1 from "../../assets/lb1.jpg";
import lb3 from "../../assets/lb3.png";
import lb4 from "../../assets/lb4.png";

import Fade from "react-reveal/Fade";
import Bounce from "react-reveal/Bounce";
import NavBarTop from "./Navbar";
import Footer from "./Footer";

import "./home.scss";
import { QISH_URL } from "../../features/settings";
import { Link } from "react-router-dom";

const Webinars = () => {
  const isTabScreen = window.screen.width < 999;
  const isSmallScreen = window.screen.width < 480;

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <NavBarTop />
      <div
        style={{ width: "100vw", overflowX: "hidden", marginTop: "-6.8rem" }}
      >
        <Banner isSmallScreen={isSmallScreen} />
        <ClientContact {...{ isSmallScreen }} />
        <WebinarJoin isSmallScreen={isSmallScreen} />
        <RecordedWebinars isSmallScreen={isSmallScreen} />
        <OnDemandWebinars isSmallScreen={isSmallScreen} />
        <StickyButton isSmallScreen={isSmallScreen} />
        <Footer />
      </div>
    </div>
  );
};

const StickyButton = ({ isSmallScreen }) => {
  return (
    <a
      className="stic-btn d-flex align-items-center justify-content-center"
      style={{
        height: "5rem",
        borderRadius: "20rem  0rem 0rem 20rem",
        color: "white",
        position: "fixed",
        top: "50vh",
        right: "-1rem",
        boxShadow: "0px 0px 20px 10px rgba(0,0,0,0.1)",
        cursor: "pointer",
        zoom: isSmallScreen ? "80%" : "100%",
        zIndex: 999,
        textDecoration: "none",
      }}
      href={`${QISH_URL}/clientLogin?newClient=no`}
      target="_blank"
    >
      <div
        style={{
          color: "white",
          fontSize: "700",
          fontFamily: "inter",
          textAlign: "center",
          padding: "0rem 2rem",
        }}
      >
        Join Our Membership
      </div>
    </a>
  );
};
export const Title = ({ title }) => {
  return (
    <div style={{ position: "relative" }}>
      <h1
        style={{
          fontWeight: "bold",
          color: "black",
          fontFamily: "inter",
          marginBottom: "2rem",
        }}
      >
        {title}
      </h1>
      {/* <p
        style={{
          width: lwidth || '6rem',
          height: '.3rem',
          background: '#712e9f',
          marginTop: '-.2rem',
          marginBottom: '2rem',
        }}
      ></p> */}
    </div>
  );
};

const ClientContact = ({ isSmallScreen }) => {
  return (
    <div
      style={{
        marginTop: "-12rem",
        marginBottom: "10rem",
        padding: isSmallScreen ? "1rem" : "0",
        zoom: isSmallScreen ? "90%" : "0",
      }}
    >
      <Container>
        <Row>
          <Col sm="4">
            <Bounce bottom>
              <div
                style={{
                  height: "20rem",
                  borderRadius: "4rem 0rem 4rem 0rem",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  background: "white",
                  boxShadow: "0px 0px 20px 10px rgba(0,0,0,0.1)",
                  marginBottom: isSmallScreen ? "2rem" : "0rem",
                }}
              >
                <h1
                  style={{
                    paddingBottom: "1rem",
                    color: "black",
                    fontFamily: "inter",
                    fontWeight: 600,
                  }}
                >
                  Up-coming live <br></br> webinars
                </h1>
              </div>
            </Bounce>
          </Col>
          <Col sm="4">
            <Bounce bottom>
              <div
                className="banner-item-div"
                style={{
                  height: "20rem",
                  borderRadius: "4rem 0rem 4rem 0rem",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  background: "white",
                  boxShadow: "0px 0px 20px 10px rgba(0,0,0,0.1)",
                  marginBottom: isSmallScreen ? "2rem" : "0rem",
                }}
              >
                <h1
                  style={{
                    paddingBottom: "1rem",
                    color: "black",
                    fontFamily: "inter",
                    fontWeight: 600,
                    textAlign: "center",
                  }}
                >
                  Recorded <br></br>webinars
                </h1>
              </div>
            </Bounce>
          </Col>
          <Col sm="4">
            <Bounce bottom>
              <div
                style={{
                  height: "20rem",
                  borderRadius: "4rem 0rem 4rem 0rem",
                  padding: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  background: "white",
                  boxShadow: "0px 0px 20px 10px rgba(0,0,0,0.1)",
                  marginBottom: isSmallScreen ? "2rem" : "0rem",
                }}
              >
                <h1
                  style={{
                    paddingBottom: "1rem",
                    color: "black",
                    fontFamily: "inter",
                    fontWeight: 600,
                  }}
                >
                  On-demand <br></br>webinars
                </h1>
              </div>
            </Bounce>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const WebinarJoin = ({ isSmallScreen }) => {
  return (
    <div
      style={{
        padding: "10rem 1rem",
        borderRadius: "0rem 14rem 0rem 14rem",
        background: "#69B447",
        marginBottom: "5rem",
      }}
    >
      <Container>
        <Row>
          <Col sm={6}>
            <Fade cascade left>
              <h1
                style={{
                  fontWeight: "900",
                  fontFamily: "inter",
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "white",
                  paddingTop: "3rem",
                }}
              >
                Upcoming live webinars<br></br>
              </h1>
              <p style={{ color: "white", marginBottom: "1rem" }}>
                Work virtually with clients and gain flexible hours and extra
                income <br></br>
                <br></br>The list of forthcoming webinars is shown below. You
                can <br></br>
                always watch the recording later and download the completion{" "}
                <br></br>
                certificate if you can't make the specified day or time.
                <br></br>
                <br></br>Joining the membership is the only way to take part in
                these webinars.<br></br>
                <br></br>
                <a
                  href={`${QISH_URL}/clientLogin?newClient=no`}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                  }}
                >
                  Join the Membership to Access the Webinars
                </a>
              </p>
            </Fade>
          </Col>
          <Col sm={6}>
            <img
              src={lb1}
              style={{
                width: isSmallScreen ? "100%" : "50rem",
                borderRadius: "2rem",
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const RecordedWebinars = ({ isSmallScreen }) => {
  return (
    <div
      style={{
        padding: "10rem 1rem",
        borderRadius: "0rem 14rem 0rem 14rem",
        background: "#F1F0EE",
        marginBottom: "5rem",
      }}
    >
      <Container>
        <Row>
          <Col sm={6}>
            <img
              src={lb3}
              style={{
                width: isSmallScreen ? "100%" : "50rem",
                borderRadius: "2rem",
              }}
            />
          </Col>
          <Col sm={6} style={{ background: "#F1F0EE" }}>
            <Fade cascade left>
              <h1
                style={{
                  fontWeight: "900",
                  fontFamily: "inter",
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#69B447",
                  paddingTop: "3rem",
                  paddingLeft: "4rem",
                }}
              >
                Recorded webinars
                <br></br>
              </h1>
              <p
                style={{
                  color: "black",
                  marginBottom: "1rem",
                  paddingLeft: "4rem",
                }}
              >
                We are aware that you don't always have time to join us in
                person for our scheduled webinars. Therefore, we archive all our
                webinars on the website so that you can obtain your certificate
                of completion at your convenience. The list of recent webinar
                recordings that are accessible in the Sphecho Learn membership
                section is provided below.
                <br></br>
                <br></br>
                <a
                  href={`${QISH_URL}/clientLogin?newClient=no`}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                  }}
                >
                  Join the Membership to Access the Webinars Recordings
                </a>
                <br></br>
                <br></br>
                Already a member?
                <br></br>
                <br></br>
                <Link
                  to={"/login"}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                  }}
                >
                  Click Here to Access the Webinar Recordings Listed
                </Link>
                <br></br>
                <br></br>
                <span className="b-700">Note on Continuing Education</span>
                <br></br> Our webinar recordings are NOT available for
                Certification Maintenance Hour (CMH) nor is it available for
                ASHA CEUs as we are not a certified partner of ASHA.
              </p>
            </Fade>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const OnDemandWebinars = ({ isSmallScreen }) => {
  return (
    <div
      style={{
        padding: "10rem 1rem",
        borderRadius: "0rem 14rem 0rem 14rem",
        background: "black",
        marginBottom: "5rem",
        color: "white",
      }}
    >
      <Container>
        <Row>
          <Col sm={6}>
            <Fade cascade left>
              <h1
                style={{
                  fontWeight: "900",
                  fontFamily: "inter",
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  color: "#69b447",
                  paddingTop: "3rem",
                }}
              >
                On-demand webinars
                <br></br>
              </h1>
              <h3>Do you have an idea for a webinar?</h3>

              <p
                style={{
                  color: "white",
                  marginBottom: "1rem",
                }}
              >
                Sphecho invites you to contribute to a great community of
                experts by providing trends, <br></br> best practices, and
                innovations on a broad range of topics that will inspire your
                colleagues <br></br> across the profession.
                <br></br>
                <br></br>
                <span className="b-700">Overview</span>
                <br></br>
                Proposals will be reviewed on an ongoing basis, and you will be
                notified within 30 days of your submission. Webinar proposals
                must relate directly to topics important to Sphecho services,
                specialization, and address skill areas identified within
                Sphecho.<br></br>
              </p>
              <ul className="pb-3">
                <li>Members are encouraged to submit proposals at any time.</li>
                <li>
                  Sphecho will develop a timeline and work with you to finalize
                  the program details.
                </li>
                <li>Webinars will be scheduled quarterly.</li>
                <li>
                  A dry run will be scheduled about a week before the live
                  broadcast to ensure a smooth production.
                </li>
                <li>
                  Sphecho will not accept webinar proposals intended solely to
                  promote commercial products.
                </li>
              </ul>
            </Fade>
            <a
              href="/contact"
              style={{
                padding: "1rem 2rem ",
                borderRadius: "5rem",
                background: "white",
                color: "black",
                cursor: "pointer",
                marginLeft: "1rem",
                textDecoration: "none",
              }}
            >
              Submit a request
            </a>
            <p className="pt-5 pl-4">
              For more information or questions regarding webinar proposals,
              please contact{" "}
              <a className="" href="mailto: support@sphecho.com">
                support@sphecho.com
              </a>
            </p>
          </Col>
          <Col sm={6}>
            <img
              src={lb4}
              style={{
                width: isSmallScreen ? "100%" : "50rem",
                borderRadius: "2rem",
              }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Banner = ({ isSmallScreen }) => {
  return (
    <div
      style={{
        height: "100vh",
        marginTop: "-4rem",
        position: "relative",
      }}
    >
      <img
        src={banner}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100vh",
          borderBottomLeftRadius: "15rem",
          objectPosition: isSmallScreen ? "right" : "center",
        }}
      />

      <Container
        style={{ position: "absolute", top: "18rem", left: "10%", zIndex: 100 }}
      ></Container>
    </div>
  );
};

const Detail = ({ isSmallScreen, isTabScreen }) => {
  return (
    <div
      style={{
        position: "relative",
        zoom: isSmallScreen ? "80%" : "100%",
      }}
    >
      <img
        style={{
          width: isSmallScreen ? "100%" : isTabScreen ? "100%" : "70%",
          height: "50rem",
          objectFit: "cover",
          borderRadius: "0rem 10rem 0rem 0rem",
          objectPosition: isSmallScreen ? "-35rem" : "inherit",
        }}
        src={lb1}
      />
      <div
        style={{
          position: "absolute",
          top: "18rem",
          right: "3rem",
          left: isSmallScreen ? "2rem" : "inherit",
        }}
      >
        <div>
          <Fade cascade bottom>
            <h1
              style={{
                fontWeight: "900",
                fontFamily: "inter",
                color: "black",
                fontSize: "3.3rem",
              }}
            >
              Want to know more about <br></br> our plan, pricing, benefits{" "}
              <br></br> and terms and conditions?{" "}
            </h1>
            <button
              style={{
                fontWeight: "bold",
                background: "#572e90",
                color: "white",
                padding: "1rem 2rem",
                border: "none",
                borderRadius: "2rem",
                marginTop: "2rem",
                cursor: "pointer",
              }}
            >
              Know more
            </button>
          </Fade>
        </div>
      </div>
    </div>
  );
};
export default Webinars;
