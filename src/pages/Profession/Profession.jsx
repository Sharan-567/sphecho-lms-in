import React from "react";
import NavBar from "../../components/NavBar";
import LandingSectionTwo from "../../components/LandingSectionTwo";
import "./Profession.scss";

import btnG from "../../assets/btn-g.png";
import cLogo from "../../assets/logo-g.png";
import logo from "../../assets/s-logo.png";
import bgG from "../../assets/bg-p.jpg";
// content
const bottomImages = [
  {
    img: btnG,
    title: "Certification Program Registration",
    href: "/profession",
  },
];

const Profession = () => {
  return (
    <div>
      <NavBar />
      <LandingSectionTwo
        bottomImages={bottomImages}
        backgroundImg={bgG}
        title={"Professional Certification"}
        centerLogo={cLogo}
        logo={logo}
      />
      <div>p</div>
      <div>p</div>
      <div>p</div>
      <div>p</div>
      <div>p</div>
    </div>
  );
};

export default Profession;
