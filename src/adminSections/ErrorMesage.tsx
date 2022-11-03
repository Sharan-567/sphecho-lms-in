import React from "react";
import { Alert, Button } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const ErrorMesage = ({ children, setError }: Props) => {
  return (
    <Alert
      style={{ borderRadius: "0rem" }}
      className="bg-danger text-white lh-0 d-flex align-items-center justify-content-between"
      variant="danger"
    >
      <p>{children}</p>
      <Button className="text-white lh-0" onClick={() => setError("")}>
        X
      </Button>
    </Alert>
  );
};

export default ErrorMesage;
