import React from "react";
import { Alert, Button } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
};

const successMessage = ({ children, setSuccess }: Props) => {
  return (
    <Alert
      style={{
        borderRadius: "0rem",
        borderTopLeftRadius: ".6rem",
        borderTopRightRadius: ".6rem",
      }}
      className="bg-green text-white d-flex align-items-center justify-content-between"
      variant="green"
    >
      <p className="" style={{ marginBottom: "-0.27rem" }}>
        {children}
      </p>
      <Button className="text-white" onClick={() => setSuccess("")}>
        X
      </Button>
    </Alert>
  );
};

export default successMessage;
