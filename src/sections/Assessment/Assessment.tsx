import React, { useEffect, useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Spinner, Row, Col, Button } from "react-bootstrap";
import { getAssessment } from "../../features/assessment";
import Question from "./Question";
import { useAppDispatch, useAppSelector } from "../../store";
import { updateProgress } from "../../features/progress";

type Props = {
  assessmentId: number;
};
const Assessment = ({ assessmentId }: Props) => {
  const { loading, questions, err } = useAppSelector(
    (state) => state.assessment
  );
  const dispatch = useAppDispatch();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isFailed, setIsFailed] = useState(false);
  const [isAttempted, setIsAttempted] = useState(false);

  const { courseId } = useParams();
  useEffect(() => {
    dispatch(getAssessment(assessmentId));
  }, []);

  const submitAnswers = () => {
    setIsAttempted(true);
    if (correctAnswers === questions.length) {
      if (courseId)
        dispatch(
          updateProgress({ course: courseId, assessment: assessmentId })
        );
      setIsFailed(false);
    } else {
      setIsFailed(true);
    }
  };

  if (err) {
    return (
      <div className="container p-2 w-100 d-flex justify-content-center align-items-center">
        <BsExclamationTriangle className="me-4" size={40} />
        <div>
          <h5 className="m-auto text-danger">{err}</h5>
          <h2>Please try agian later.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      {loading ? (
        <div className="w-100 d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="green" />
        </div>
      ) : (
        <Row className="p-3">
          <Row>
            <Col sm={9}>
              <h2 className="b-700 text-blue">Assessment</h2>
              {isFailed ? (
                <h5 className="text-danger">
                  Failed the Assessment Please re attempt later.
                </h5>
              ) : (
                isAttempted && (
                  <h5 className="text-green">You passed the assessment...</h5>
                )
              )}
            </Col>
            <Col sm={3}>
              <p className="small b-700">Total Questions: {questions?.length}</p>
              <p className="small b-700 lh-0 text-green"></p>
            </Col>
          </Row>
          <Col className="p-3 bg-graydark round">
            {(questions || []).map((q, id) => {
              return (
                <Question
                  key={q.id}
                  q={q}
                  count={id + 1}
                  setCorrectAnswers={setCorrectAnswers}
                />
              );
            })}
            <Button
              variant="green"
              className="text-white"
              onClick={() => submitAnswers()}
            >
              Submit Answers
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Assessment;
