import React, { useEffect } from "react";
import { Assessment, Question } from "../../definations/assessment";
import { showToast } from "../../features/toast";
import { customAxios } from "../../services/utils";
import { useAppDispatch } from "../../store";
import Loading from "../Loading";
import {
  BsFillFileEarmarkCheckFill,
  BsFillEmojiSmileUpsideDownFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";
import QuestionComp from "./Question";
import { motion, AnimatePresence } from "framer-motion";
import { updateProgress } from "../../features/progress";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../features/settings";
import { addAllprogress } from "../../features/progress";
import { NormalizeProgressData } from "../../services/utils";

type AssesmentProps = {
  assessment: Assessment;
  hideAssessmentPanel: () => void;
};

const AssessementPanel = ({
  assessment,
  hideAssessmentPanel,
}: AssesmentProps) => {
  const [currentQuestion, setCurrentQuestion] = React.useState<Question>();
  const [currentQuestionIdx, setCurrentQuestionIdx] = React.useState(0);
  const [questions, setQuestions] = React.useState<Question[]>([]);

  const [showSubmitSlide, setShowSubmitSlide] = React.useState<boolean>(false);
  const [showSummary, setShowSummary] = React.useState<boolean>(false);
  const [showSpinner, setShowSpinner] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [noOfCorrectAnswers, setNumberOfCorrectAnswers] = React.useState(0);
  const allSelectedOptions = React.useRef({});

  React.useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function (event) {
      window.history.go(1);
    };
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      var confirmationMessage =
        " if you stop your assessment session in the middle, it will be lost, and you will have to start again from the beginning";
      e.returnValue = confirmationMessage;
    });
  });

  React.useEffect(() => {
    setShowSpinner(true);
    customAxios
      .get(`/student/get-by-assesment-question/${assessment.id}`)
      .then((res) => {
        setQuestions(res.data.question);
        setCurrentQuestion(res.data.question[0]);
        setCurrentQuestionIdx(0);
        setShowSpinner(false);
      })
      .catch((err) => {
        setShowSpinner(false);
        dispatch(
          showToast({
            type: "danger",
            message:
              err.message + " : assessmentPanel : while fetching all question",
          })
        );
      });
  }, []);

  const handleQuestionOptions = (
    id: number,
    optionNo: 1 | 2 | 3 | 4 | 5 | undefined
  ) => {
    allSelectedOptions.current[id] = optionNo;
  };

  const goToAssesmentAgain = () => {
    setCurrentQuestionIdx(0);
    setCurrentQuestion(questions[0]);
    setShowSubmitSlide(false);
  };

  const sumbitAssessment = () => {
    let correctAnswers = 0;
    for (const [qId, selectedOption] of Object.entries(
      allSelectedOptions.current
    )) {
      for (let i = 0; i < questions.length; i++) {
        if (`${questions[i].id}` === `${qId}`) {
          if (`${questions[i].correct_option}` === `${selectedOption}`) {
            correctAnswers += 1;
          }
        }
      }
    }
    setNumberOfCorrectAnswers(correctAnswers);
    setShowSummary(true);
    setShowSubmitSlide(false);
  };

  const retryHandler = () => {
    setShowSummary(false);
    setShowSubmitSlide(false);
    setCurrentQuestionIdx(0);
    setCurrentQuestion(questions[0]);
    allSelectedOptions.current = {};
  };

  return (
    <div
      className="bg-primary"
      style={{
        width: "100%",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        zIndex: 1,
        padding: "2rem",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "white",
          borderRadius: "2.4rem",
          padding: "3rem",
          overflow: "hidden",
        }}
      >
        <h4 style={{ fontWeight: "medium", textTransform: "capitalize" }}>
          Assessment: {assessment.name}
        </h4>
        {showSubmitSlide || showSummary ? null : (
          <>
            <div
              className="text-primary b-600 mt-3"
              style={{ fontSize: "3rem" }}
            >
              {currentQuestionIdx + 1}/{questions.length}
            </div>
            <p
              className="text"
              style={{ marginTop: "-1rem", paddingLeft: ".5rem" }}
            >
              Question
            </p>
          </>
        )}
        <div>
          {showSpinner ? (
            <div>
              <Loading />{" "}
              <p className="m-auto text-center">
                Questions are loading please wait a moment
              </p>
            </div>
          ) : showSubmitSlide ? (
            <SumbitSlide
              questions={questions}
              goToAssesmentAgain={goToAssesmentAgain}
              sumbitAssessment={sumbitAssessment}
              attemptedQuestionCount={
                Object.keys(allSelectedOptions.current).length
              }
            />
          ) : showSummary ? (
            <SummaryPage
              noOfCorrectAnswers={noOfCorrectAnswers}
              totalQuestion={questions.length}
              assessmentId={assessment.id}
              retryHandler={retryHandler}
              hideAssessmentPanel={hideAssessmentPanel}
            />
          ) : (
            <div style={{ maxWidth: "60rem", margin: "auto" }}>
              {currentQuestion && (
                <QuestionComp
                  currentQuestion={currentQuestion}
                  handleQuestionOptions={handleQuestionOptions}
                  allSelectedOptions={allSelectedOptions}
                />
              )}
              <div className="d-flex justify-content-between mt-4">
                {currentQuestionIdx > 0 ? (
                  <button
                    className="bg-black text-white p-3 px-4 br-4"
                    style={{ border: "none", fontSize: ".8rem" }}
                    onClick={() =>
                      setCurrentQuestionIdx((prevIdx) => {
                        if (prevIdx > 0) {
                          setCurrentQuestion(questions[prevIdx - 1]);
                          return prevIdx - 1;
                        } else {
                          return prevIdx;
                        }
                      })
                    }
                  >
                    Previous question
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  className="bg-black text-white p-3 px-4 br-4"
                  style={{ border: "none", fontSize: ".8rem" }}
                  onClick={() =>
                    setCurrentQuestionIdx((p) => {
                      if (p + 1 === questions.length) {
                        setShowSubmitSlide(true);
                        return p;
                      } else {
                        setCurrentQuestion(questions[p + 1]);
                        return p + 1;
                      }
                    })
                  }
                >
                  {currentQuestionIdx + 1 === questions.length
                    ? "Next"
                    : "Next question"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SumbitSlide = ({
  questions,
  goToAssesmentAgain,
  sumbitAssessment,
  attemptedQuestionCount,
}) => {
  return (
    <motion.div
      key={"sumbit-page"}
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -25, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="d-flex justify-content-center w-100">
        <BsFillFileEarmarkCheckFill
          className="text-green text-center"
          style={{ fontSize: "8rem" }}
        />
      </div>
      <p className="text-center my-4" style={{ fontSize: "1.8rem" }}>
        Total {attemptedQuestionCount} questions attempted out of{" "}
        {questions.length}
      </p>
      <div className="d-flex align-items-center flex-column mt-5">
        <button
          className="bg-gray text-black p-3 px-4"
          style={{
            border: "none",
            fontSize: ".8rem",
            borderRadius: ".4rem",
          }}
          onClick={() => goToAssesmentAgain()}
        >
          Go to assessment again
        </button>
        <button
          className="bg-primary text-white p-3 px-4 my-3"
          style={{
            border: "none",
            fontSize: ".8rem",
            borderRadius: ".4rem",
          }}
          onClick={() => sumbitAssessment()}
        >
          Submit assessment
        </button>
      </div>
    </motion.div>
  );
};
export default AssessementPanel;

const SummaryPage = ({
  noOfCorrectAnswers,
  totalQuestion,
  assessmentId,
  retryHandler,
  hideAssessmentPanel,
}) => {
  const percentage = (noOfCorrectAnswers / totalQuestion) * 100;
  const dispatch = useAppDispatch();
  const isSucced = percentage >= 80;
  const { courseId } = useParams();
  const navigate = useNavigate();

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

  const updateAssessmentProgress = () => {
    if (isSucced) {
      if (courseId) {
        const formData = new FormData();
        formData.append("course", `${courseId}`);
        formData.append("assessment", `${assessmentId}`);
        customAxios
          .post(`${BASE_URL}/student/save-progress/`, formData)
          .then(() => {
            hideAssessmentPanel();
            getAllProgress();
          })
          .catch((err) => {
            dispatch(
              showToast({
                type: "danger",
                message:
                  err.message +
                  " : assessmentPanel : while upading assessment progress",
              })
            );
          });
      }
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={"summary-page"}
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -25, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="d-flex alignitems-center flex-column justify-content-center text-center m-auto br-2"
        style={{
          maxWidth: "60rem",
          minHeight: "30rem",
          //   background: isSucced ? "rgb(247, 251, 249)" : "rgb(253, 245, 245)",
        }}
      >
        {/* Congratulations! You passed! Grade received 100% To pass 76% or higher
        Try again once you are ready Grade received 20% To pass 80% or higher */}
        {isSucced ? (
          <div className="">
            <BsFillEmojiSmileFill
              style={{ fontSize: "7rem", color: "rgb(29, 124, 80)" }}
            />
            <h1>Congratulations!</h1>
            <p>
              You passed! Grade received
              <p style={{ fontSize: "2rem", color: "rgb(29, 124, 80)" }}>
                {percentage.toFixed(0)}%
              </p>
            </p>
            <p>To pass 80% or higher</p>
          </div>
        ) : (
          <div>
            <BsFillEmojiSmileUpsideDownFill
              style={{ fontSize: "7rem", color: "rgb(211, 0, 1)" }}
            />
            <h1 className="mt-2">Try again once you are ready </h1>
            <p>
              Grade received
              <p style={{ fontSize: "2rem", color: "rgb(211, 0, 1)" }}>
                {" "}
                {percentage.toFixed(0)}%
              </p>
            </p>
            <p> To pass 80% or higher</p>
          </div>
        )}
        {isSucced ? (
          <div
            className="bg-black text-white p-3 px-4 br-1"
            style={{
              border: "none",
              fontSize: ".8rem",
              cursor: "pointer",
              width: "13rem",
              margin: "auto",
            }}
            onClick={() => updateAssessmentProgress()}
          >
            Continue
          </div>
        ) : (
          <>
            <div
              className="bg-black text-white p-3 px-4 br-1"
              style={{
                border: "none",
                fontSize: ".8rem",
                cursor: "pointer",
                width: "13rem",
                margin: "auto",
              }}
              onClick={retryHandler}
            >
              Retry
            </div>
            <div
              className="bg-graydark text-black p-3 px-4 br-1"
              style={{
                border: "none",
                fontSize: ".8rem",
                cursor: "pointer",
                width: "13rem",
                margin: "auto",
              }}
              onClick={() => hideAssessmentPanel()}
            >
              Go to course
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
