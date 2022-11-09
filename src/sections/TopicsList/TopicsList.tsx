import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTopics } from "../../features/topics";
import { ListGroup, Spinner, Row, Col, Container } from "react-bootstrap";
import { BsCheckCircleFill, BsExclamationTriangle } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../store";
import type { Topic } from "../../definations/course";
import type { Assessment } from "../../definations/assessment";
import TopicContainer from "./Topic";

const TopicsList = () => {
  const {
    loading,
    orderTopics: topics,
    err,
  } = useAppSelector((state) => state.topics);
  const {
    loading: progressLoading,
    progress,
    err: progressError,
  } = useAppSelector((state) => state.progress);
  const [currentTopic, setCurrentTopic] = useState<Topic | Assessment>();
  const { courseId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof courseId === "string") {
      dispatch(fetchTopics(courseId));
    }
  }, [courseId]);

  useEffect(() => {
    if (topics && topics.length > 0) {
      setCurrentTopic(topics[0]);
    }
  }, [loading, topics]);

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

  if (err) {
    return (
      <div className="p-2 w-100 d-flex justify-content-center align-items-center">
        <BsExclamationTriangle className="me-4" size={40} />
        <div>
          <h5 className="m-auto text-danger">{err}</h5>
          <h2>Please try agian later.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-4 w-100">
      {loading ? (
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
                        key={id}
                        style={{ borderRadius: ".5rem" }}
                        className={`d-flex align-items-center p-2 mb-3 ${
                          topic.customId === currentTopic?.customId ?
                          "bg-blue text-white" : "bg-gray"
                        }`}
                      >
                        <div className="me-2">
                          <BsCheckCircleFill
                            size={20}
                            className={`${
                              isCompleted(topic)
                                ? "text-green"
                                : "text-graydark"
                            }`}
                          />
                        </div>
                        <button
                          className={`small ${
                            topic.customId === currentTopic?.customId &&
                            "bg-blue text-white"
                          }`}
                          style={{
                            background: "none",
                            outline: "none",
                            border: "none",
                            textAlign: "left",
                            width: "100%",
                          }}
                          onClick={() => setCurrentTopic(topic)}
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
