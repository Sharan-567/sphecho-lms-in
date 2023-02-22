import React, { useState } from "react";
import { Form } from "react-bootstrap";
import type { Question as questionI } from "../../definations/assessment";
import Option from "./Option";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  currentQuestion: questionI;
  handleQuestionOptions: (
    arg1: number,
    arg2: 1 | 2 | 3 | 4 | 5 | undefined
  ) => void;
  allSelectedOptions: React.MutableRefObject<{}>;
};

const Question: React.FC<props> = ({
  currentQuestion,
  handleQuestionOptions,
  allSelectedOptions,
}) => {
  const [founCorrect, setFoundCorrect] = useState(false);
  const [currentSectedOption, setCurrentSelectionOption] = React.useState<
    1 | 2 | 3 | 4 | 5
  >();

  // const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let value = e.target.value;
  //   if (!founCorrect && q.correct_option === value) {
  //     setCorrectAnswers((p) => p + 1);
  //     setFoundCorrect((s) => !s);
  //   } else if (founCorrect && q.correct_option !== value) {
  //     setCorrectAnswers((p) => p - 1);
  //     setFoundCorrect((s) => !s);
  //   }
  // };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={currentQuestion.id}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ minHeight: "30rem" }}
      >
        <p
          className="mb-5"
          style={{ wordWrap: "break-word", fontSize: "1.3rem" }}
        >
          {currentQuestion.question}
        </p>
        {currentQuestion.option_01 && (
          <Option
            currentSectedOption={currentSectedOption}
            setCurrentSelectionOption={setCurrentSelectionOption}
            title={currentQuestion.option_01}
            optionNo={1}
            questionId={currentQuestion.id}
            handleQuestionOptions={handleQuestionOptions}
            allSelectedOptions={allSelectedOptions}
          />
        )}
        {currentQuestion.option_02 && (
          <Option
            currentSectedOption={currentSectedOption}
            setCurrentSelectionOption={setCurrentSelectionOption}
            title={currentQuestion.option_02}
            optionNo={2}
            questionId={currentQuestion.id}
            handleQuestionOptions={handleQuestionOptions}
            allSelectedOptions={allSelectedOptions}
          />
        )}

        {currentQuestion.option_03 && (
          <Option
            currentSectedOption={currentSectedOption}
            setCurrentSelectionOption={setCurrentSelectionOption}
            title={currentQuestion.option_03}
            optionNo={3}
            questionId={currentQuestion.id}
            handleQuestionOptions={handleQuestionOptions}
            allSelectedOptions={allSelectedOptions}
          />
        )}
        {currentQuestion.option_04 && (
          <Option
            currentSectedOption={currentSectedOption}
            setCurrentSelectionOption={setCurrentSelectionOption}
            title={currentQuestion.option_04}
            optionNo={4}
            questionId={currentQuestion.id}
            handleQuestionOptions={handleQuestionOptions}
            allSelectedOptions={allSelectedOptions}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Question;
