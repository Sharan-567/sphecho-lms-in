import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { BsFillPenFill } from "react-icons/bs";
import type { Patient, Doctor } from "./definations";

type Props = {
  title?: string;
  update: () => void;
  addUserToCourseHandler: () => void;
  addStudentToCourseHandler: () => void;
};

const ListItem = ({
  title,
  update,
  addUserToCourseHandler,
  addStudentToCourseHandler,
}: Props) => {
  return (
    <Row className="d-flex px-3 py-3 bg-graydark br-2 mb-2">
      <Col xs="10">
        <p style={{ fontSize: "1.1rem" }}>{title}</p>
      </Col>
      <Col xs={2} className="d-flex">
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
        >
          Add Course to User
        </Button>
      </Col>
    </Row>
  );
};

export default ListItem;
