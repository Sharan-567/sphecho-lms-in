import React from "react";

import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  value: string;
  title: string;
};

const Counter = ({ Icon, value, title }: Props) => {
  return (
    <div className="p-4 br-1 bg-primary color-white">
      <div>
        <Icon
          color="primary"
          style={{ fontSize: "2rem", marginRight: ".5em", color: "white" }}
        />
        <b style={{ color: "white" }}>{title}</b>
      </div>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
          fontSize: "2.5rem",
          marginTop: "1.2rem",
        }}
      >
        {value}
      </h1>
    </div>
  );
};

export default Counter;
