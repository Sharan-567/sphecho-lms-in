import React from "react";
import { Carousel } from "react-bootstrap";
import "./LandingSection.scss";
import { Link } from "react-router-dom";

// images import
import logo from "../../assets/logo.png";
import sLogo from "../../assets/s-logo.png";
import cBg from "../../assets/c-bg.png";

const LandingSection = ({ config }) => {
  const { bottomImages, carouselImages } = config;
  return (
    <div className="position-relative overflow-hidden carousel-container">
      <Carousel indicators={false}>
        {carouselImages.map((item, i) => (
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
        {bottomImages.map(({ img, title, href }, id) => {
          return (
            <div className="position-relative" key={id}>
              <Link to={href}>
                <img className="me-4 c-btn-bottom" src={img} />
                <p className="position-absolute">{title}</p>
              </Link>
            </div>
          );
        })}
      </div>
      <img className="position-absolute c-logo" src={logo} />
      <img className="position-absolute s-logo" src={sLogo} />
      <img className="position-absolute c-bg" src={cBg} />
    </div>
  );
};

export default LandingSection;
