
import { memo } from "react";

function QuestionItem({ question, index, isChecked, disabled }) {
  return (
    <div className="question-item">
      <div className="question-item-content">
        Câu {index + 1}: {question.description}
      </div>
      <div className="question-item-suggest">
        <label
          className="ABCD"
          data-value={question.id}
          htmlFor={`A${question.id}`}
        >
          <div className="radio ABCD-children">
            <input
              className="ABCD-radio"
              type="radio"
              value="A"
              id={`A${question.id}`}
              name={question.id}
              checked={isChecked === "A"}
              disabled={disabled}
            />
            A.{" "}
          </div>
          <div className="content-suggest ABCD-children">
            {question.answerA}
          </div>
        </label>

        <label
          className="ABCD"
          data-value={question.id}
          htmlFor={`B${question.id}`}
        >
          <div className="radio ABCD-children">
            <input
              className="ABCD-radio"
              type="radio"
              value="B"
              id={`B${question.id}`}
              name={question.id}
              checked={isChecked === "B"}
              disabled={disabled}
            />
            B.{" "}
          </div>
          <div className="content-suggest ABCD-children">
            {question.answerB}
          </div>
        </label>

        <label
          className="ABCD"
          data-value={question.id}
          htmlFor={`C${question.id}`}
        >
          <div className="radio ABCD-children">
            <input
              className="ABCD-radio"
              type="radio"
              value="C"
              id={`C${question.id}`}
              name={question.id}
              checked={isChecked === "C"}
              disabled={disabled}
            />
            C.{" "}
          </div>
          <div className="content-suggest ABCD-children">
            {question.answerC}
          </div>
        </label>

        <label
          className="ABCD"
          data-value={question.id}
          htmlFor={`D${question.id}`}
        >
          <div className="radio ABCD-children">
            <input
              className="ABCD-radio"
              type="radio"
              value="D"
              id={`D${question.id}`}
              name={question.id}
              checked={isChecked === "D"}
              disabled={disabled}
            />
            D.
          </div>
          <div className="content-suggest ABCD-children">
            {question.answerD}
          </div>
        </label>
      </div>
    </div>
  );
}

export default memo(QuestionItem);
