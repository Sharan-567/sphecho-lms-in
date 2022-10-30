import React from "react";
import { Form } from "react-bootstrap";

type FormType = {
  children: React.ReactNode;
  title?: string;
};

const FormContainer = ({ children, title }: FormType) => {
  return (
    <Form className="bg-white br-3 p-5 mb-3">
      {title && <h3 className="b-700">{title}</h3>}
      {children}
    </Form>
  );
};

export default FormContainer;
