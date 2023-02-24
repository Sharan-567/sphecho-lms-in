import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BsPenFill, BsFileTextFill, BsCheckCircleFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";
import "./listItem.scss";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  title?: string;
  subTitle?: String;
  sm?: number;
  id: number;
  idx?: number;
  select: boolean;
  setCurrent: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const SingleSelect = (props: Props) => {
  const [showSingleSelect, setShowSingleSelect] = React.useState(false);
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={props.title + "1"}
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -25, opacity: 0 }}
        transition={{ duration: 0.4, delay: props.idx ? props.idx * 0.1 : 0 }}
        className={`br-1 p-2 ${
          props.select
            ? "bg-primary text-white"
            : "bg-graydark text-black single-select"
        }  my-2`}
      >
        <Row className="d-flex justify-content-between ">
          <Col
            sm={props.sm || 10}
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (showSingleSelect && props.select) {
                setShowSingleSelect(false);
                props.setCurrent(undefined);
              } else {
                props.setCurrent(props.id);

                setShowSingleSelect(true);
              }
            }}
          >
            <div className="p-2">
              <p className="mt-2 ps-2" style={{ fontSize: "1.1rem" }}>
                {props.title &&
                  props.title.charAt(0).toUpperCase() +
                    props.title.slice(1)}{" "}
              </p>
              {props.subTitle && (
                <p className="tiny">
                  {props.subTitle.charAt(0).toUpperCase() +
                    props.subTitle.slice(1)}
                </p>
              )}
            </div>
          </Col>
          <Col style={{ marginTop: "1rem", height: "100%" }}>
            {props.select && (
              <BsCheckCircleFill className="text-white ms-auto" size="30" />
            )}
          </Col>
        </Row>
      </motion.div>
    </AnimatePresence>
  );
};

export default SingleSelect;
