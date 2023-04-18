import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ConfirmModel from "./ConfirmModel";
import AnswerSelectItem from "./AnswerSelectItem";
import QuestionItem from "./QuestionItem";
import Info from "../Info";
import api from "../../../../../config/config";

function Test() {
  const [questions, setQuestions] = useState([]); //Chứa mảng câu hỏi
  const [isOpen, setIsOpen] = useState(false); //Bật tắt modal confirm
  const [answers, setAnswers] = useState([]); //Chứa câu trả lời của thí sinh
  const [submitted, setSubmitted] = useState({
    text: "Nộp bài",
    status: false,
  }); //Chứa trạng thái thí sinh đã nộp bài hay chưa

  const params = useParams();
  const { classId, examId } = params;

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    fetch(`${api}/classes/${classId}/exams/${examId}/details`, {
      headers: {
        Authorization: "Bearer " + currentUser,
      },
    })
      .then((response) => response.json())
      .then((questionsAPI) => {
        console.log(questionsAPI.data);
        setQuestions(questionsAPI.data);
        setAnswers(
          questionsAPI.data.map((item) => {
            return { id: item.id + "", value: "" };
          })
        );
        console.log(questions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(answers);

  const handleAnswer1 = (e) => {
    const obj = {
      id: e.target.name,
      value: e.target.value,
    };
    setAnswers((prev) => [
      ...prev.filter((answer) => answer.id !== obj.id),
      obj,
    ]);
  };

  const handleAnswer2 = (e) => {
    const obj = {
      id: e.target.dataset.value,
      value: e.target.value,
    };
    setAnswers((prev) => [
      ...prev.filter((answer) => answer.id !== obj.id),
      obj,
    ]);
  };

  const handleSubmit = () => {
    setSubmitted({
      text: "Xem điểm",
      status: true,
    });
  };

  return (
    <>
      {/* <Info
            personalCode={idStudent}
            nameStudent={nameStudent}
            subject={"Kỹ thuật lập trình"}
            test={"Test 2"}
            backHref={`/studentpage/${idStudent}/${nameStudent}/${classId}`}
         /> */}

      <div className="empty-space"></div>

      <div className="grid content-table">
        <div className="question-list" onChange={handleAnswer1}>
          {questions.map((question, index) => {
            const valueSelect = answers.filter((item) => {
              return item.id === question.id + "";
            })[0]?.value;

            return (
              <QuestionItem
                question={question}
                index={index}
                isChecked={valueSelect}
                disabled={submitted.status}
              />
            );
          })}
        </div>
        <div className="answer-list">
          <div className="answer-header flex-center">BÀI LÀM</div>
          <form name="answer" className="answer-grid" onChange={handleAnswer2}>
            {questions.map((question, index) => {
              const valueSelect = answers.filter((item) => {
                return item.id === question.id + "";
              })[0]?.value;

              return (
                <AnswerSelectItem
                  question={question}
                  index={index}
                  valueSelected={valueSelect || "."}
                  color={valueSelect || null}
                  disabled={submitted.status}
                />
              );
            })}
          </form>
          <div className="time-test flex-center">
            Thời gian làm bài còn 45 phút 30 giây
          </div>
          <div className="test-submit flex-center">
            {submitted.status ? (
              <Link to={`../result/${examId}`}>
                <button className="test-submit-btn to-submit">Xem điểm</button>
              </Link>
            ) : (
              <button
                className="test-submit-btn to-submit"
                onClick={() => setIsOpen(!isOpen)}
              >
                {submitted.text}
              </button>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <ConfirmModel
          isOpen
          setIsOpen={setIsOpen}
          result={answers}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default Test;
