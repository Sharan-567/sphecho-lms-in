import React, { useState } from "react";
import { Form } from "react-bootstrap";

const Question = ({ q, setCorrectAnswers, count }) => {
  const [founCorrect, setFoundCorrect] = useState(false);

  const handleOption = (e) => {
    let value = e.target.value;
    if (!founCorrect && q.correct_option === value) {
      setCorrectAnswers((p) => p + 1);
      setFoundCorrect((s) => !s);
    } else if (founCorrect && q.correct_option !== value) {
      setCorrectAnswers((p) => p - 1);
      setFoundCorrect((s) => !s);
    }
  };

  return (
    <Form.Group className="bg-gray p-3 mb-3 round">
      <h4>
        {count}. {q.question}
      </h4>
      {q.option_01 && (
        <Form.Check
          type="radio"
          name={`id-${q.id}`}
          label={q.option_01}
          value={1}
          onChange={handleOption}
        />
      )}

      {q.option_02 && (
        <Form.Check
          name={`id-${q.id}`}
          type="radio"
          label={q.option_02}
          value={2}
          onChange={handleOption}
        />
      )}

      {q.option_03 && (
        <Form.Check
          name={`id-${q.id}`}
          type="radio"
          label={q.option_03}
          value={3}
          onChange={handleOption}
        />
      )}

      {q.option_04 && (
        <Form.Check
          name={`id-${q.id}`}
          type="radio"
          label={q.option_04}
          value={4}
          onChange={handleOption}
        />
      )}

      {q.option_05 && (
        <Form.Check
          name={`id-${q.id}`}
          type="radio"
          label={q.option_05}
          value={5}
          onChange={handleOption}
        />
      )}
    </Form.Group>
  );
};

export default Question;
