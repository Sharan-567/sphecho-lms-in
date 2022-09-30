import React, { useEffect, useState } from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { Spinner, Row, Col, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAssessment } from "../../features/assessment";
import Question from "../../components/Question";

const Assessment = () => {
  const { loading, questions, err } = useSelector((state) => state.assessment);
  const location = useLocation();
  const dispatch = useDispatch();
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    dispatch(getAssessment());
  }, []);

  useEffect(() => {
    console.log(correctAnswers);
  }, [correctAnswers]);

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
    <div className="container p-3 w-75">
      {loading ? (
        <div className="w-100 d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="green" />
        </div>
      ) : (
        <Row className="p-3">
          <Row>
            <Col sm={9}>
              <h2 className="b-700 text-blue">Assessment</h2>
              <p>{location.state.name}</p>
            </Col>
            <Col sm={3}>
              <p className="small b-700">Total Questions: {questions.length}</p>
              <p className="small b-700 lh-0 text-green">
                Total Marks: {location.state.max}
              </p>
              <p className="small b-700 text-danger">
                Min marks to qualify: {location.state.min}
              </p>
            </Col>
          </Row>
          <Col className="p-3 bg-graydark round">
            {questions.map((q, id) => {
              return (
                <Question
                  q={q}
                  count={id + 1}
                  setCorrectAnswers={setCorrectAnswers}
                />
              );
            })}
            <Button variant="green" className="text-white">
              Submit Answers
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Assessment;

// id(pin):1
// marks(pin):1
// question(pin):"what is version control?"
// answer(pin):""
// solution_url(pin):null
// correct_option(pin):"1"
// option_01(pin):"option 1"
// option_02(pin):"option 2"
// option_03(pin):"option 3"
// option_04(pin):"option 4"
// option_05(pin):""
// match_a(pin):""
// match_1(pin):""
// match_b(pin):""
// match_2(pin):""
// match_c(pin):""
// match_3(pin):""
// match_d(pin):""
// match_4(pin):""
// match_e(pin):""
// match_5(pin):""
// match_f(pin):""
// match_6(pin):""
// cnt(pin):2
// topic(pin):3
// type(pin):1
