import React from "react";
import { Button, Col, Row } from "react-bootstrap";

type ListItem<T> = {
  title: string;
  subTitle?: String;
  item: T;
  openModel: (c: T, type: "update" | "delete" | "read") => void;
  NoDelete?: boolean;
  sm?: number;
};

const ListItem = <T extends {}>(props: ListItem<T>) => {
  return (
    <div className="br-1 p-2 bg-graydark my-2">
      <Row className="d-flex justify-content-between  p-3">
        <Col sm={props.sm || 8}>
          <p style={{ fontSize: "1.1rem" }}>{props.title}</p>
          {props.subTitle && <p className="tiny">{props.subTitle}</p>}
        </Col>
        <Col>
          {!props.NoDelete && (
            <Button
              className="bg-danger text-white me-1 br-2"
              onClick={() => props.openModel(props.item, "delete")}
            >
              Delete
            </Button>
          )}

          <Button
            className="bg-adminsecondary text-white me-1 br-2"
            onClick={() => props.openModel(props.item, "update")}
          >
            Update
          </Button>

          <Button
            className="bg-admingreen text-white br-2"
            onClick={() => props.openModel(props.item, "read")}
          >
            Detail
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ListItem;
