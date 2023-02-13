import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { BsFillPenFill } from "react-icons/bs";
import type { Patient, Doctor } from "./definations";

type Props = {
  title?: string;
  email?: string;
  contact?: string;
  update: () => void;
  addUserToCourseHandler: () => void;
  addStudentToCourseHandler: () => void;
};

const ListItem = ({
  title,
  email,
  contact,
  update,
  addUserToCourseHandler,
  addStudentToCourseHandler,
}: Props) => {
  return (
    <Row className="d-flex px-3 py-3 bg-graydark br-2 mb-2">
      <Col xs="10">
        <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>Name: {title}</p>
        <h4
          style={{
            fontSize: "1.1rem",
            marginTop: "-0.4rem",
            fontWeight: "light",
          }}
        >
          <b>Email: </b> {email ? email : "-----"}
        </h4>
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: "light",
          }}
        >
          <b>Contact: </b>
          {contact ? contact : "-----"}
        </h4>
      </Col>
      <Col xs={2} className="d-flex align-items-center justify-center">
        {/* <Button variant="primary" className="text-white me-1" onClick={update}>
          <BsFillPenFill className="text-white" size={15} />
        </Button> */}

        {/* <Button
          className="text-white me-1 tiny"
          variant={"adminsecondary"}
          onClick={addUserToCourseHandler}
        >
          update user to course
        </Button> */}
        <Button
          className="text-white me-1 tiny b-600"
          variant="adminteritory"
          onClick={addStudentToCourseHandler}
          style={{ minHeight: "3rem" }}
        >
          Add Course to User
        </Button>
      </Col>
    </Row>
  );
};

export default ListItem;
