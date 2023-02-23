import React, { useCallback } from "react";
import {
  addUniqueIdsToList,
  customAxios,
  getOrderListFromTwoList,
  NormalizeProgressData,
  normalizeTopics,
} from "../../services/utils";
import { showToast } from "../../features/toast";
import { Button, Col, Row } from "react-bootstrap";
import {
  BsPenFill,
  BsFileTextFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import type { Topic, Module } from "../../definations/course";
import type { Assessment } from "../../definations/assessment";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./styles.scss";
import { motion } from "framer-motion";

const CourseContainer = ({}) => {
  const [topics, setTopics] = React.useState<(Topic | Assessment)[]>();

  const { courseId, courseName } = useParams();
  const dispatch = useDispatch();

  const getAllTopics = useCallback(() => {
    if (courseId) {
      customAxios
        .get(`student/get-course-details/${courseId}/`)
        .then((res) => {
          const { topics, assesements } = res.data;
          const orderTopics = getOrderListFromTwoList<Topic, Assessment>(
            topics,
            assesements
          );
          const orderTopicsWithCustomIds = addUniqueIdsToList<
            Topic | Assessment
          >(orderTopics);
          // const normalizedTopics = normalizeTopics(orderTopicsWithCustomIds);
          setTopics(orderTopicsWithCustomIds);
          console.log(orderTopicsWithCustomIds);
        })
        .catch((err) => {
          dispatch(
            showToast({
              type: "danger",
              message: err.message + " : while fetching all topics",
            })
          );
        });
    }
  }, [courseId]);

  React.useEffect(() => {
    getAllTopics();
  }, []);

  const updateOrder = () => {};

  const deleteModule = () => {};

  const createModule = () => {};

  return (
    <div>
      <div
        className="course-container"
        style={{
          maxWidth: "700px",
          margin: "auto",
          paddingTop: "3rem",
        }}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ marginBottom: "2rem" }}
        >
          <h2 className="title-container">Course: {courseName}</h2>
          <div>create module</div>
        </div>
        {(topics || []).map((t) => (
          <div key={t.id}>
            {t.module_title ? (
              <>
                <p
                  className="my-2 mt-4 b-600 text-center  pt-2 br-1"
                  style={{ height: "3rem", fontSize: "1.2rem" }}
                >
                  {t.module_title}
                </p>
              </>
            ) : (
              <motion.div
                className="add-module-line"
                style={{
                  height: "1.5rem",
                  overflow: "hidden",

                  cursor: "pointer",
                }}
              >
                <div
                  className="inside-line"
                  onClick={() => {
                    console.log("module create");
                  }}
                  style={{
                    height: 0,
                    background: "yellow",
                    color: "green",
                    transform: "translateY(-9rem)",
                  }}
                >
                  <p
                    className="px-5"
                    style={{ borderTop: "2px dashed #cccccc", zIndex: "-1" }}
                  ></p>
                  <div style={{ textAlign: "center" }}>
                    <BsFillPlusCircleFill
                      size="1.6rem"
                      style={{
                        zIndex: "100",
                        color: "black",
                        textAlign: "center",
                        marginTop: "-4rem",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <Row className="d-flex justify-content-between bg-graydark br-1">
              <Col sm={8} style={{ cursor: "pointer" }}>
                <div className="p-2 d-flex align-items-center">
                  <div
                    className="bg-gray d-flex align-items-center justify-content-center b-600"
                    style={{
                      borderRadius: "1rem",
                      marginRight: "1rem",
                      minWidth: "3.8rem",
                      height: "3.8rem",
                    }}
                  >
                    {t.order}
                  </div>
                  <p
                    className="mt-2 ps-2"
                    style={{
                      fontSize: "1.1rem",

                      wordWrap: "break-word",
                    }}
                  >
                    {t.name && t.name.charAt(0).toUpperCase() + t.name.slice(1)}{" "}
                    nter justify-content-center b-600
                  </p>
                </div>
              </Col>
              <Col
                style={{
                  minHeight: "100%",

                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  className="bg-graydark text-white me-1  btn-circle"
                  style={{
                    outline: "none",
                    border: "none",
                    borderRadius: "4rem",
                  }}
                >
                  <AiTwotoneDelete className="text-danger" size={22} />
                </Button>
              </Col>
            </Row>
          </div>
        ))}
        {/* {(modules || []).map((m) => (
          <div>
            <div>
              <Row className="d-flex justify-content-between bg-primary text-white br-1 my-4">
                <Col sm={8} style={{ cursor: "pointer" }}>
                  <div className="p-2">
                    <p className="mt-2 ps-2" style={{ fontSize: "1.1rem" }}>
                      {m.module_name &&
                        m.module_name.charAt(0).toUpperCase() +
                          m.module_name.slice(1)}
                    </p>
                  </div>
                </Col>
                <Col style={{ marginTop: "1rem" }}>
                  <div className="d-flex">
                    <div className="me-1">create topic</div>
                    <div>create assessment</div>
                  </div>
                </Col>
              </Row>
            </div>
            <>
              {m.topics.map((t) => (
                <Row className="d-flex justify-content-between bg-graydark br-1 mb-1 w-75">
                  <Col sm={8} style={{ cursor: "pointer" }}>
                    <div className="p-2">
                      <p className="mt-2 ps-2" style={{ fontSize: "1.1rem" }}>
                        {t.name &&
                          t.name.charAt(0).toUpperCase() + t.name.slice(1)}
                      </p>
                    </div>
                  </Col>
                  <Col style={{ marginTop: "1rem" }}>
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
                  </Col>
                </Row>
              ))}
            </>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default CourseContainer;
