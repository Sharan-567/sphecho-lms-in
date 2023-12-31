import React from "react";
import Lottie from "react-lottie-player";

import lottieJson from "../assets/Sphecho.json";
import "./main.scss";
import loading from "../assets/loading.gif";

// export default function Loading() {
//   return (
//     <div className="w-100 d-flex justify-content-center mt-5 lotte_container">
//       <Lottie
//         loop
//         animationData={lottieJson}
//         play
//         style={{ width: 400, height: 500 }}
//       />
//     </div>
//   );
// }

export default function Loading() {
  return (
    <div className="w-100 d-flex justify-content-center">
      <img src={loading} style={{ width: "30rem", marginTop: "-7rem" }} />
    </div>
  );
}
