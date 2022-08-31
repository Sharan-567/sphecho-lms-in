import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./LandingSectionTwo.scss";

const LandingSectionTwo = (props) => {
  const { bottomImages, centerLogo, title, backgroundImg, logo } = props;
  return (
    <div className="c-container">
      <div className="img-container">
        <img className="landing-image" src={backgroundImg} />
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
        <img className="position-absolute c-logo" src={centerLogo} />
        <h1 className="position-absolute c-title">{title}</h1>
        <img src={logo} className="position-absolute c-brand-logo" />
      </div>
    </div>
  );
};

LandingSectionTwo.prototypes = {
  bottomImages: PropTypes.arrayOf(PropTypes.object),
  centerLogo: PropTypes.object,
  title: PropTypes.string,
  backgroundImg: PropTypes.object.isRequired,
  logo: PropTypes.object,
};

export default LandingSectionTwo;
