import React, { useEffect, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import FormContainer from "../FormContainer";
import ListItem from "../ListItem";
import type { Course, Topic } from "../../definations/course";

const AddTopic = () => {
  return (
    <FormContainer title="Add Topic">
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

const AssessmentMangement = () => {
  const dummyData: Topic[] = [
    { id: 1, title: "something fun to play and games and sgring" },
    { id: 2, title: "something fun to play and games and sgring" },
    {
      id: 3,
      title:
        "something lorem and ipusma and cool and django and fun fun to play and games and sgring",
    },
  ];

  const userType = localStorage.getItem("userType");
  const [courses, setSelectedItem] = useState<Topic[]>([]);
  const [currentSelectedId] = useState<Topic>();
  const [currentModal, setCurrentModal] = useState<
    "update" | "delete" | "read"
  >();
  // modal handlers
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModel = (item: Topic, type: "delete" | "update" | "read") => {
    setSelectedItem(item);
    setShow(true);
    setCurrentModal(type);
    console.log(type);
    console.log(item);
  };

  const deleteTopic = () => {
    console.log("topic deleted");
    handleClose();
  };

  const updateTopic = () => {
    console.log("topic update");
    handleClose();
  };

  return (
    <Container className="p-4">
      {/* create topic */}
      {(userType === "doctor" || userType === "superadmin") && <AddTopic />}
      <div className="bg-white p-5 br-2">
        <h3 className="b-700">Topic</h3>
        {dummyData.map((item) => {
          return (
            <ListItem
              item={item}
              title={item.title}
              key={item.id}
              openModel={openModel}
            ></ListItem>
          );
        })}
      </div>
      <Modal show={show} onHide={handleClose}>
        {currentModal === "delete" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Delete Toopic</Modal.Title>
            </Modal.Header>
            <Modal.Body></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="danger text-white" onClick={deleteTopic}>
                delete
              </Button>
            </Modal.Footer>
          </>
        )}
        {currentModal === "read" && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Detail of Topic</Modal.Title>
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
              <Modal.Title>Update Topic</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="admingreen text-white" onClick={updateTopic}>
                update
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default AssessmentMangement;
