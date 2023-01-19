import React from "react";
import Lottie from "react-lottie-player";

import lottieJson from "../assets/Sphecho.json";

export default function Loading() {
  return (
    <div className="w-100 d-flex justify-content-center mt-5">
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 400, height: 500 }}
      />
    </div>
  );
}
