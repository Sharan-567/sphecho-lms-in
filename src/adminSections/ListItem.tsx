import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BsPenFill, BsFileTextFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import "./listItem.scss";
import { motion, AnimatePresence } from "framer-motion";

type ListItem<T> = {
  title?: string;
  subTitle?: String;
  item: T;
  openModel: (c: T, type: "update" | "delete" | "read") => void;
  NoDelete?: boolean;
  NoEdit?: boolean;
  sm?: number;
  isClickable?: boolean;
  titleOnClickHandler?: (arg: number) => void;
  id?: number;
  idx?: number;
};

const ListItem = <T extends {}>(props: ListItem<T>) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={props.title + "1"}
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -25, opacity: 0 }}
        transition={{ duration: 0.4, delay: props.idx ? props.idx * 0.1 : 0 }}
        className="br-1 p-2 bg-graydark my-2 item-container"
      >
        <Row className="d-flex justify-content-between">
          <Col
            sm={props.sm || 8}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (props.isClickable && props.titleOnClickHandler) {
                if (props.id) {
                  props.titleOnClickHandler(props.id);
                }
              }
            }}
          >
            <div className="p-2">
              <p
                className="mt-2 ps-2"
                style={{ fontSize: "1.1rem", wordBreak: "break-word" }}
              >
                {props.title &&
                  props.title.charAt(0).toUpperCase() + props.title.slice(1)}
              </p>
              {props.subTitle && (
                <p style={{ wordBreak: "break-word" }} className="tiny">
                  {props.subTitle.charAt(0).toUpperCase() +
                    props.subTitle.slice(1)}
                </p>
              )}
            </div>
          </Col>
          <Col style={{ marginTop: "1rem" }}>
            {!props.NoDelete && (
              <Button
                className="bg-graydark text-white me-1  btn-circle"
                style={{
                  outline: "none",
                  border: "none",
                  borderRadius: "4rem",
                }}
                onClick={() => props.openModel(props.item, "delete")}
              >
                <AiTwotoneDelete className="text-danger" size={22} />
              </Button>
            )}

            {!props.NoEdit && (
              <Button
                className=" text-white me-1 bg-graydark btn-circle"
                style={{
                  outline: "none",
                  border: "none",
                  borderRadius: "4rem",
                }}
                onClick={() => props.openModel(props.item, "update")}
              >
                <BsPenFill className="text-adminsecondary" size="20" />
              </Button>
            )}

            <Button
              className="bg-graydark text-white btn-circle"
              style={{ outline: "none", border: "none", borderRadius: "4rem" }}
              onClick={() => props.openModel(props.item, "read")}
            >
              <BsFileTextFill className="text-primary" size="20" />
            </Button>
          </Col>
        </Row>
      </motion.div>
    </AnimatePresence>
  );
};

export default ListItem;
