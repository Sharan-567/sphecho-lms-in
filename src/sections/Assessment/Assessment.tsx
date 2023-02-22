import React, { useEffect, useState } from "react";
import { BsExclamationTriangle, BsFillInfoCircleFill } from "react-icons/bs";
import { Spinner, Row, Col, Button } from "react-bootstrap";
import { getAssessment } from "../../features/assessment";
import Question from "./Question";
import { useAppDispatch, useAppSelector } from "../../store";

import { Assessment } from "../../definations/assessment";
import AssessementPanel from "./AssessmentPanel";

type Props = {
  assessment: Assessment;
  isCompleted: (topic: TopicType | Assessment) => boolean;
};
const AssessmentComp = ({ assessment, isCompleted }: Props) => {
  const [showAssessmentPanel, setShowAssessmentPanel] = useState(false);

  const hideAssessmentPanel = () => {
    setShowAssessmentPanel(false);
  };

  return (
    <div className="p-3 bg-graydark">
      <div className="p-3">
        <div className="mt-3">
          <h3 style={{ fontWeight: "bold" }}>Assessment: {assessment.name}</h3>
          <p>Questions: {assessment.question.length}</p>
        </div>

        <div className="mt-3">
          <h4>Quiz</h4>
          <p>{assessment.question.length * 5} min</p>
        </div>

        <div className="mt-2">
          <h4>Receive grade</h4>
          <p>To Pass 80% or higher</p>
        </div>

        <div
          className="mt-4 pt-3 px-3 text-dark"
          style={{ borderTop: "1px solid gray" }}
        >
          <p className="text Primary">
            {" "}
            <>
              <BsFillInfoCircleFill
                style={{
                  color: "black",
                  fontSize: "1.6rem",
                  marginTop: "-.8rem",
                  marginRight: ".5rem",
                }}
              />
            </>{" "}
            Please note that if you stop your assessment session in the middle,
            it will be lost, and you will have to start again from the beginning
          </p>
        </div>
        {assessment.question.length > 0 ? (
          <Button
            variant="green"
            className="text-white py-3 px-4 w-100 mt-5 b-600"
            onClick={() => setShowAssessmentPanel(true)}
          >
            {isCompleted(assessment) ? "Try again" : "Start assessment"}
          </Button>
        ) : (
          <p className="p-3 b-600">
            No Question available for this assessment.
          </p>
        )}
        {/* <Col className="p-3 bg-graydark round">
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
          </Col> */}
      </div>

      <div>
        {showAssessmentPanel && (
          <div>
            <AssessementPanel
              assessment={assessment}
              hideAssessmentPanel={hideAssessmentPanel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentComp;
