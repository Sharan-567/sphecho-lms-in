import React from "react";

import { IconType } from "react-icons";

type Props = {
  Icon: IconType;
  value: string;
  title: string;
};

const Counter = ({ Icon, value, title }: Props) => {
  return (
    <div className="p-4 br-1 bg-graydark color-black mb-3">
      <div>
        <Icon
          color="primary text-primary"
          style={{ fontSize: "2rem", marginRight: ".5em", color: "#6ab447" }}
        />
        <b style={{ color: "black" }}>{title}</b>
      </div>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "black",
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
