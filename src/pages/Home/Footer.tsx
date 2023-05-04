import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import apple from "../../assets/apple.png";
import fb from "../../assets/fb.png";
import ig from "../../assets/ig.png";
import ins from "../../assets/in.png";
import playstore from "../../assets/playstore.png";
import tw from "../../assets/tw.png";
import yt from "../../assets/yt.png";
import colorLogo from "../../assets/colorlogo.png";

import {
  SCHOLAR_URL,
  SERVICE_URLS,
  SHOP_URL,
  QISH_URL,
} from "../../features/settings";

const Footer = () => {
  const isSmallScreen = window.screen.width < 480;

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
      link: `${QISH_URL}`,
    },
    {
      title: "Sphecho Service",
      link: `${QISH_URL}`,
    },
    {
      title: "Sphecho Shop",
      link: `${SHOP_URL}`,
    },
    {
      title: "Sphecho Scholar",
      link: `${SCHOLAR_URL}`,
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
                borderRadius: isSmallScreen ? "0" : "3rem 0 0 3rem ",
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
                    <a
                      key={l.title}
                      target="_blank"
                      className="link b-400"
                      href={l.link}
                    >
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
                    <a
                      key={l.title}
                      target="_blank"
                      className="link b-400"
                      href={l.link}
                    >
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
                    Certification Process
                  </a>
                  <Link to="/privacy" className="link b-400">
                    Privacy Policy
                  </Link>
                  <Link to="/tandc" className="link b-400">
                    Terms & Conditions
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
      <div
        style={{
          background: "black",
          color: "white",
          padding: "1rem",
          marginTop: ".5rem",
        }}
      >
        <div className="container">
          <p className="text-center" style={{ fontWeight: "500" }}>
            If you are in a life threatening situation - don’t use this site.
            Kindly contact your respective national helpline to get immediate
            assistance.
          </p>
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
              <Link
                style={{ margin: "0rem 1rem", cursor: "pointer" }}
                to="/tandc"
              >
                Terms & Conditions
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

export default Footer;
