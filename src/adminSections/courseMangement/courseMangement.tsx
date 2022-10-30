import React, { useEffect, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import FormContainer from "../FormContainer";
import ListItem from "../ListItem";
import type { Course } from "./../../definations/course";

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

const CourseMangement = () => {
  const dummyData: Course[] = [
    { id: 1, title: "something fun to play and games and sgring" },
    { id: 2, title: "something fun to play and games and sgring" },
    {
      id: 3,
      title:
        "something lorem and ipusma and cool and django and fun fun to play and games and sgring",
    },
  ];

  const userType = localStorage.getItem("userType");
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentSelectedId, selectedCourse] = useState<Course>();
  const [currentModal, setCurrentModal] = useState<
    "update" | "delete" | "read"
  >();
  // modal handlers
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModel = (course: Course, type: "delete" | "update" | "read") => {
    selectedCourse(course);
    setShow(true);
    setCurrentModal(type);
    console.log(type);
    console.log(course);
  };

  const deleteCourse = () => {};

  return (
    <Container className="p-4">
      {/* create Course */}
      {(userType === "doctor" || userType === "superadmin") && <AddCourse />}
      <div className="bg-white p-4 br-2">
        <h3 className="b-700">Courses</h3>
        {dummyData.map((c) => {
          return (
            <ListItem
              course={c}
              title={c.title}
              key={c.id}
              openModel={openModel}
            ></ListItem>
          );
        })}
      </div>
      <Modal show={show} onHide={handleClose}>
        {currentModal === "delete" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Delete Course</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </>
        )}
        {currentModal === "read" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Detail of Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}

        {currentModal === "update" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Update Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default CourseMangement;
