import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Progress = {
  isPercentage?: boolean;
  title: string;
  Value: number | string;
  min?: number;
  max?: number;
};

const Progress = ({
  isPercentage = false,
  title,
  Value,
  min,
  max,
}: Progress) => {
  return (
    <div className="d-flex align-items-center me-3">
      <div className="b-600" style={{ width: 45, height: 45 }}>
        <CircularProgressbar
          minValue={min}
          maxValue={max}
          strokeWidth={13}
          styles={buildStyles({
            pathColor: "#0cae00",
            textSize: "2rem",
            textColor: "green",
          })}
          value={Value}
          text={`${isPercentage ? `${Value}%` : Value}`}
        />
      </div>
      <h6 className="b-600 ms-2">{title}</h6>
    </div>
  );
};

export default Progress;
