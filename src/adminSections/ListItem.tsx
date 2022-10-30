import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import type { Course } from "./../definations/course";

type ListItem = {
  title: string;
  subTitle?: String;
  course: Course;
  openModel: (c: Course, type: "update" | "delete" | "read") => void;
};

const ListItem = (props: ListItem) => {
  return (
    <div className="br-1 p-2 bg-graydark my-2">
      <Row className="d-flex justify-between  p-3">
        <Col sm={8}>
          <p className="">{props.title}</p>
          {props.subTitle && <p className="tiny">{props.subTitle}</p>}
        </Col>
        <Col>
          <Button
            className="bg-danger text-white me-1"
            onClick={() => props.openModel(props.course, "delete")}
          >
            Delete
          </Button>

          <Button
            className="bg-blue text-white me-1"
            onClick={() => props.openModel(props.course, "update")}
          >
            Update
          </Button>

          <Button
            className="bg-admingreen text-white"
            onClick={() => props.openModel(props.course, "read")}
          >
            Detail
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ListItem;
