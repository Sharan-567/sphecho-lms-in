import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTopics, Topic } from "../../features/topics";
import {
  ListGroup,
  Spinner,
  Row,
  Col,
  Button,
  Container,
} from "react-bootstrap";
import {
  BsCheckCircleFill,
  BsFillFileEarmarkPdfFill,
  BsExclamationTriangle,
} from "react-icons/bs";

import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../../store";

const TopicsList = () => {
  const { loading, topics, err } = useAppSelector((state) => state.topics);
  const [currentTopic, setCurrentTopic] = useState<Topic>();
  const { courseId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof courseId === "string") {
      dispatch(fetchTopics(courseId));
    }
  }, [courseId]);

  useEffect(() => {
    if (topics.length > 0) {
      setCurrentTopic(topics[0]);
    }
  }, [loading, topics]);

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
                className="bg-graydark br-1"
                style={{ position: "sticky", top: "5%" }}
              >
                <h4 className="text-align-center ms-4 pt-3 b-600 text-blue">
                  Topics
                </h4>
                <ListGroup className="p-2 ">
                  {topics.map((topic, id) => {
                    return (
                      <ListGroup.Item
                        key={id}
                        style={{ borderRadius: ".5rem" }}
                        className={`d-flex align-items-center p-2 mb-3 ${
                          topic.id === currentTopic?.id && "bg-blue text-white"
                        }`}
                      >
                        <div className="me-2">
                          <BsCheckCircleFill
                            size={20}
                            className={` text-green ${
                              topic.id === currentTopic?.id && "text-white"
                            }`}
                          />
                        </div>
                        <button
                          className={`small ${
                            topic.id === currentTopic?.id &&
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
            <Col sm={9} className="p-2 ms-3" style={{ width: "73%" }}>
              <div className="p-3  br-1 bg-gray">
                <h4 className="b-700">{currentTopic?.name}</h4>
                <div className="p-4 margin-auto">
                  <ReactPlayer controls url={currentTopic?.video} />
                </div>
                <p className="p-3 my-1">{currentTopic?.content}</p>
                {currentTopic?.pdf && (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={currentTopic?.pdf}
                    className="d-flex align-items-center p-2 mb-2 bg-graydark round"
                  >
                    <BsFillFileEarmarkPdfFill color="red" size="24" />
                    <p className="ms-3 mt-2">{currentTopic?.pdf}</p>
                  </a>
                )}
                {currentTopic?.assement_required && (
                  <div className="d-flex align-items-center justify-content-between my-3 bg-graydark p-3 round">
                    <Link
                      to="/assessment"
                      state={{
                        id: currentTopic?.id,
                        name: currentTopic?.name,
                        min: currentTopic?.min_marks_to_qualify,
                        max: currentTopic?.max_marks,
                      }}
                    >
                      <Button variant="green" className="text-white ">
                        Take Assessment
                      </Button>
                    </Link>
                    <div className="ms-3 d-flex pt-2">
                      <p className="b-700 me-3">
                        Total Points: {currentTopic?.max_marks}
                      </p>
                      <p className="b-700">
                        Min points to qualify:{" "}
                        {currentTopic?.min_marks_to_qualify}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default TopicsList;
