import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./LandingSectionTwo.scss";

const LandingSectionTwo = (props) => {
  const {
    bottomImages,
    centerLogo,
    title,
    backgroundImg,
    logo,
    bottomIllustration,
    clickHandler,
  } = props;
  return (
    <div className="landing">
      <div
        className="landing__img-container"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <img src={centerLogo} alt="" className="landing__logo" />
        <h2 className="landing__title">{title}</h2>

        <div className="landing__bottom-btns">
          {bottomImages.map((item, i) => (
            <div key={i} className="position-relative">
              {item.href ? (
                <Link to={item.href}>
                  <img src={item.img} className="landing__bottom-btn" />
                  <h5 style={{ width: "100%" }}>{item.title}</h5>
                </Link>
              ) : (
                <button
                  onClick={item.clickHandler}
                  style={{ border: "none", borderRadius: "1.4rem" }}
                >
                  <img src={item.img} className="landing__bottom-btn" />
                  <h5 style={{ width: "100%" }}>{item.title}</h5>
                </button>
              )}
            </div>
          ))}
        </div>
        <img src={bottomIllustration} alt="" className="landing__illustrater" />
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
  bottomIllustration: PropTypes.object,
};

export default LandingSectionTwo;
