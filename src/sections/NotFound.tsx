import React from "react";
import Lottie from "react-lottie-player";

import lottieJson from "../assets/nofound.json";

export default function NotFound() {
  return (
    <div className="w-100 d-flex justify-content-center mt-5">
      <Lottie
        loop
        animationData={lottieJson}
        play
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
}
