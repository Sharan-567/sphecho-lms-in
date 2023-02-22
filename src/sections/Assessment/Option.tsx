import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { Question } from "../../definations/assessment";
import "./style.scss";

type Props = {
  currentSectedOption: number | undefined;
  title: string;
  setCurrentSelectionOption: React.Dispatch<
    React.SetStateAction<1 | 2 | 3 | 4 | 5 | undefined>
  >;
  optionNo: 1 | 2 | 3 | 4 | 5 | undefined;
  handleQuestionOptions: (
    arg1: number,
    arg2: 1 | 2 | 3 | 4 | 5 | undefined
  ) => void;
  questionId: number;
  allSelectedOptions: React.MutableRefObject<{}>;
};

const Option = ({
  currentSectedOption,
  title,
  setCurrentSelectionOption,
  handleQuestionOptions,
  optionNo,
  questionId,
  allSelectedOptions,
}: Props) => {
  return (
    <button
      className={`p-3 mb-2 d-flex align-items-center w-100 ${
        allSelectedOptions.current[questionId] === optionNo ? "" : "option-item"
      }`}
      style={{
        cursor: "pointer",
        border: "none",
        borderRadius: ".7rem",
        textAlign: "left",

        color:
          allSelectedOptions.current[questionId] === optionNo
            ? "white"
            : "black",
        background:
          allSelectedOptions.current[questionId] === optionNo
            ? "#6ab447"
            : "#eeeeee",
      }}
      onClick={() => {
        setCurrentSelectionOption(optionNo);
        handleQuestionOptions(questionId, optionNo);
      }}
    >
      <BsCircleFill
        size={10}
        className="me-3 mb-3"
        style={{
          color:
            allSelectedOptions.current[questionId] === optionNo
              ? "white"
              : "#6ab447",
        }}
      />
      <p
        className="pt-2"
        style={{
          display: "inline",
          width: "95%",
          wordWrap: "break-word",
        }}
      >
        {`${title}`}
      </p>
    </button>
  );
};

export default Option;
