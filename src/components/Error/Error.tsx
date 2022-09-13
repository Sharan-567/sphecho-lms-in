import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

const Error = (message) => {
  return (
    <div className="p-2 w-100 d-flex justify-content-center align-items-center">
      <BsExclamationTriangle />
      <div>
        <h5 className="m-auto text-danger">{message}</h5>
        <h1>Please try agian later.</h1>
      </div>
    </div>
  );
};

export default Error;
