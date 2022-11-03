import React from "react";
import { Spinner as Spin } from "react-bootstrap";
const Spinner = () => {
  return (
    <div className="w-100 text-center">
      <Spin animation="grow" variant="adminsecondary" />
    </div>
  );
};

export default Spinner;
