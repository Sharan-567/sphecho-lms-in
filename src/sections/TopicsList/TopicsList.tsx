import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { addTopics, resetTopics } from "../../features/topics";
import { ListGroup, Spinner, Row, Col, Container } from "react-bootstrap";
import { BsCheckCircleFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store";
import type { Topic } from "../../definations/course";
import type { Assessment } from "../../definations/assessment";
import NotFound from "../NotFound";
import TopicContainer from "./Topic";
import {
  addUniqueIdsToList,
  customAxios,
  getOrderListFromTwoList,
} from "../../services/utils";
import { showToast } from "../../features/toast";

const TopicsList = () => {
  const { orderTopics: topics } = useAppSelector((state) => state.topics);
  const {
    loading: progressLoading,
    progress,
    err: progressError,
  } = useAppSelector((state) => state.progress);
  const [currentTopic, setCurrentTopic] = useState<Topic | Assessment>();
  const { courseId } = useParams();
  const dispatch = useAppDispatch();

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
          dispatch(
            addTopics({
              topics,
              assesements,
              orderTopics: orderTopicsWithCustomIds,
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

  useEffect(() => {
    getAllTopics();
    return () => {
      dispatch(resetTopics());
    };
  }, [courseId]);

  useEffect(() => {
    if (topics && topics.length > 0) {
      setCurrentTopic(topics[0]);
    }
  }, [topics]);

  const isCompleted = (topic: Topic | Assessment): boolean => {
    if (courseId && `${courseId}` in progress) {
      if ("content" in topic && progress[courseId].topics.includes(topic.id)) {
        return true;
      } else if (progress[courseId].assesments.includes(topic.id)) {
        return true;
      }
    }
    return false;
  };

  if (topics.length === 0) {
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
                  {(topics || []).map((topic, id) => {
                    return (
                      <ListGroup.Item
                        onClick={() => setCurrentTopic(topic)}
                        key={id}
                        style={{
                          borderRadius: "1rem",
                          padding: ".8rem 3rem",
                          border: "none",
                          outline: "none",
                        }}
                        className={`d-flex align-items-center mb-3 ${
                          topic.customId === currentTopic?.customId
                            ? "bg-primary text-white"
                            : "bg-gray"
                        }`}
                      >
                        <div className="me-2">
                          <BsCheckCircleFill
                            size={23}
                            className={`${
                              isCompleted(topic) ? "text-green" : "text-white"
                            }`}
                          />
                        </div>
                        <button
                          className={`small ${
                            topic.customId === currentTopic?.customId &&
                            "bg-primary text-white"
                          }`}
                          style={{
                            background: "none",
                            outline: "none",
                            border: "none",
                            textAlign: "left",
                            width: "100%",
                            fontSize: "1.2rem",
                          }}
                        >
                          {topic.name}
                        </button>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </div>
            </Col>
            <Col sm={9} className="px-5 py-2">
              <TopicContainer topic={currentTopic} courseId={courseId} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default TopicsList;
