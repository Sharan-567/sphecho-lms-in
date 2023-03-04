import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { addTopics, resetTopics } from "../../features/topics";
import { ListGroup, Spinner, Row, Col, Container } from "react-bootstrap";
import {
  BsCheckCircleFill,
  BsChevronDown,
  BsChevronUp,
  BsCircleFill,
} from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store";
import type { Topic, Module } from "../../definations/course";
import type { Assessment } from "../../definations/assessment";
import NotFound from "../NotFound";
import TopicContainer from "./Topic";
import {
  addUniqueIdsToList,
  customAxios,
  getOrderListFromTwoList,
  NormalizeProgressData,
  normalizeTopics,
} from "../../services/utils";
import { motion } from "framer-motion";
import { showToast } from "../../features/toast";
import { addAllprogress } from "../../features/progress";

const TopicsList = () => {
  const { orderTopics: modules } = useAppSelector((state) => state.topics);
  const {
    loading: progressLoading,
    progress,
    err: progressError,
  } = useAppSelector((state) => state.progress);
  const [currentTopic, setCurrentTopic] = useState<Topic | Assessment>();
  const { courseId } = useParams();
  const dispatch = useAppDispatch();
  const [dropDownId, setDropDownId] = useState<string>();

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
          const normalizedTopics = normalizeTopics(orderTopicsWithCustomIds);

          dispatch(
            addTopics({
              topics,
              assesements,
              orderTopics: normalizedTopics,
            })
          );
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

  const getAllProgress = () => {
    customAxios
      .get(`student/student-progress/`)
      .then((res) => {
        let progresses = NormalizeProgressData(res.data.progress);
        dispatch(addAllprogress(progresses));
      })
      .catch((err) => {
        dispatch(
          showToast({
            type: "danger",
            message: err.message + " : Topic - While fetching all Progress",
          })
        );
      });
  };

  useEffect(() => {
    getAllTopics();
    getAllProgress();
    return () => {
      dispatch(resetTopics());
    };
  }, [courseId]);

  useEffect(() => {
    let added = false;
    getAllProgress();
    if (modules && modules?.length > 0) {
      modules?.forEach((module) => {
        module?.topics.forEach((topic) => {
          if (!added && !isCompleted(topic)) {
            added = true;
            setDropDownId(module?.module_name);
            setCurrentTopic(topic);
          }
        });
      });
    }
  }, [modules]);

  const isCompleted = (topic: Topic | Assessment) => {
    if (courseId && `${courseId}` in progress) {
      if ("content" in topic && progress[courseId].topics.includes(topic.id)) {
        return true;
      } else if (progress[courseId].assesments.includes(topic.id)) {
        return true;
      }
    }
    return false;
  };

  const isModuleCompleted = (module: Module) => {
    if (module && module?.topics) {
      for (let i = 0; i < module?.topics.length; i++) {
        let completed = isCompleted(module?.topics[i]);
        if (!completed) {
          return false;
        }
      }
      return true;
    }
  };

  if (modules?.length === 0) {
    return (
      <div>
        <NotFound />
        <h3 className="b-600 text-center">
          No Topics Available for this Course.
        </h3>
        <p className="text-center">Please Try again later</p>
      </div>
    );
  }

  return (
    <div className="container p-4 w-100">
      {false ? (
        <div className="w-100 d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="green" />
        </div>
      ) : (
        <Container>
          <Row>
            <Col sm={3}>
              <div
                className="bg-white br-2 p-1"
                style={{ position: "sticky", top: "5%" }}
              >
                <h4 className="text-align-center ms-4 pt-3 b-600 text-blue">
                  Topics
                </h4>
                <ListGroup className="p-2 ">
                  {(modules || []).map((module, id) => {
                    return (
                      <div key={module?.module_name}>
                        <ListGroup.Item
                          onClick={() => {
                            if (dropDownId === module?.module_name) {
                              setDropDownId("");
                            } else {
                              setDropDownId(module?.module_name);
                            }
                          }}
                          key={id}
                          style={{
                            borderRadius: "1rem",
                            padding: "1.6rem 3rem",
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                          className={`d-flex align-items-center mb-3                           
                           bg-primary text-white
                        `}
                        >
                          <div className="me-2">
                            {isModuleCompleted(module) ? (
                              <BsCheckCircleFill
                                size={28}
                                className={`text-white`}
                              />
                            ) : (
                              <BsCircleFill
                                size={7}
                                style={{ marginTop: "-.4rem" }}
                                className="text-white"
                              />
                            )}
                          </div>
                          <button
                            className={`small
                            bg-primary text-white
                          `}
                            style={{
                              background: "none",
                              outline: "none",
                              border: "none",
                              textAlign: "left",
                              width: "100%",
                              fontSize: "1rem",
                              fontWeight: "bold",
                            }}
                          >
                            {module?.module_name}
                          </button>
                          <div className="ms-1">
                            {dropDownId === module?.module_name ? (
                              <BsChevronUp
                                size={20}
                                className={`b-600 text-white`}
                              />
                            ) : (
                              <BsChevronDown
                                size={20}
                                className={`b-600 text-white`}
                              />
                            )}
                          </div>
                        </ListGroup.Item>
                        <motion.div
                          animate={{
                            height:
                              dropDownId !== module?.module_name
                                ? "0px"
                                : "100%",
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          {(module?.topics || []).map((topic, id) => (
                            <ListGroup.Item
                              onClick={() => setCurrentTopic(topic)}
                              key={id}
                              style={{
                                borderRadius: "1rem",
                                padding: "1.012rem 3rem",
                                border: "none",
                                outline: "none",
                                cursor: "pointer",
                                background:
                                  topic.customId === currentTopic?.customId
                                    ? "#000000"
                                    : "#eeeeee",
                                color:
                                  topic.customId === currentTopic?.customId
                                    ? "white"
                                    : "black",
                              }}
                              className={`d-flex align-items-center mb-3 ${
                                topic.customId !== currentTopic?.customId &&
                                "topic-container"
                              }`}
                            >
                              <div className="me-2">
                                <BsCheckCircleFill
                                  size={28}
                                  className={`${
                                    isCompleted(topic)
                                      ? "text-green"
                                      : "text-white"
                                  }`}
                                />
                              </div>
                              <button
                                className={"small"}
                                style={{
                                  background: "none",
                                  outline: "none",
                                  border: "none",
                                  textAlign: "left",
                                  width: "100%",
                                  fontSize: "1rem",
                                  fontWeight: "normal",
                                  color:
                                    topic.customId === currentTopic?.customId
                                      ? "white"
                                      : "black",
                                }}
                              >
                                {topic.name}
                              </button>
                            </ListGroup.Item>
                          ))}
                        </motion.div>
                      </div>
                    );
                  })}
                </ListGroup>
              </div>
            </Col>
            <Col sm={9} className="px-5 py-2">
              <TopicContainer
                isCompleted={isCompleted}
                topic={currentTopic}
                courseId={courseId}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default TopicsList;
