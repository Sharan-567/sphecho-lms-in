import React, { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import FormContainer from "../FormContainer";
import ListContainer from "../ListContainer";

const addCousreHandler = async () => {};

const removeCousreHandler = async () => {};

const AddCourse = () => {
  return (
    <FormContainer title="Add Course">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="admingreen" className="text-white" type="submit">
        Submit
      </Button>
    </FormContainer>
  );
};

const courseMangement = () => {
  const userType = localStorage.getItem("userType");
  return (
    <Container className="p-4">
      {(userType === "doctor" || userType === "superadmin") && <AddCourse />}
      <ListContainer title="Courses">
        <h1>snahtohss</h1>
      </ListContainer>
    </Container>
  );
};

export default courseMangement;
