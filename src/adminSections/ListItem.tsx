import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BsPenFill, BsFileTextFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";

type ListItem<T> = {
  title: string;
  subTitle?: String;
  item: T;
  openModel: (c: T, type: "update" | "delete" | "read") => void;
  NoDelete?: boolean;
  NoEdit?: boolean;
  sm?: number;
};

const ListItem = <T extends {}>(props: ListItem<T>) => {
  return (
    <div className="br-1 p-2 bg-graydark my-2">
      <Row className="d-flex justify-content-between  p-3">
        <Col sm={props.sm || 8}>
          <p style={{ fontSize: "1.1rem" }}>
            {props.title.charAt(0).toUpperCase() + props.title.slice(1)}
          </p>
          {props.subTitle && (
            <p className="tiny">
              {props.subTitle.charAt(0).toUpperCase() + props.subTitle.slice(1)}
            </p>
          )}
        </Col>
        <Col>
          {!props.NoDelete && (
            <Button
              className="bg-graydark text-white me-1 br-2"
              style={{ outline: "none", border: "none" }}
              onClick={() => props.openModel(props.item, "delete")}
            >
              <AiTwotoneDelete className="text-danger" size={22} />
            </Button>
          )}

          {!props.NoEdit && (
            <Button
              className=" text-white me-1 bg-graydark"
              style={{ outline: "none", border: "none" }}
              onClick={() => props.openModel(props.item, "update")}
            >
              <BsPenFill className="text-adminsecondary" size="20" />
            </Button>
          )}

          <Button
            className="bg-graydark text-white"
            style={{ outline: "none", border: "none" }}
            onClick={() => props.openModel(props.item, "read")}
          >
            <BsFileTextFill className="text-primary" size="20" />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ListItem;
