import React, { useState } from "react";
import AnswerSelectItem from "./AnswerSelectItem";
import { Link } from "react-router-dom";
import QuestionItem from "./QuestionItem";
import api from "../../../../../config/config";

function QuestionsRender({
   questions,
   examId,
   classId,
   submitted,
   isOpen,
   setIsOpen,
   duration,
   history,
   answer,
   setAnswer,
}) {
   // console.log(answer);
   const handleAnswerQuestion = (question, value) => {
      const list = [
         ...answer.filter((questioninlist) => {
            if (questioninlist.id !== question.id) {
               return questioninlist;
            }
         }),
         {
            id: question.id,
            studentAns: value,
         },
      ];
      setAnswer(list);
   };
   console.log(classId);

   const handleSubmitAnswer = (e) => {
      e.preventDefault();

      const accesToken = localStorage.getItem("currentUser");
      fetch(`${api}/classes/${classId}/exams/${examId}`, {
         method: "POST",
         headers: {
            Authorization: "Bearer " + accesToken,
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ questions: answer }),
      }).catch((error) => console.log(error));

      // history.push('/class');
   };

   const handleOpenAnswerList = () => {
      document
         .querySelector(".answer-control > .answerform-mobile")
         .classList.toggle("display-grid");
   };

   return (
      <>
         <form name="questionlist" className="question-list">
            {questions?.map((question, index) => {
               const [value] = answer.filter((item) => item.id === question.id);

               return (
                  <QuestionItem
                     key={question.id}
                     question={question}
                     index={index}
                     setAnswer={setAnswer}
                     answer={answer}
                     isChecked={value?.studentAns}
                     // isChecked={valueSelect}
                     disabled={submitted.status}
                     handleAnswerQuestion={handleAnswerQuestion}
                  />
               );
            })}
         </form>
         <div className="answer-list">
            <div className="answer-header flex-center">BÀI LÀM</div>
            <form
               id="answerform"
               name="answerform"
               className="answer-grid"
               onSubmit={handleSubmitAnswer}
               // action=''
            >
               {questions?.map((question, index) => {
                  const [value] = answer.filter(
                     (item) => item.id === question.id
                  );

                  return (
                     <AnswerSelectItem
                        key={question.id}
                        question={question}
                        index={index}
                        valueSelected={answer}
                        setAnswer={setAnswer}
                        value={value}
                        handleAnswerQuestion={handleAnswerQuestion}
                        // color={valueSelect || null}
                        disabled={submitted.status}
                     />
                  );
               })}
            </form>
            <div className="time-test flex-center">
               {!submitted.status
                  ? `${duration?.hours} ${duration?.minutes} : ${duration?.seconds}`
                  : ""}
            </div>
            <div className="test-submit flex-center">
               {submitted.status ? (
                  <Link to={`../result/${examId}`}>
                     <button
                        className="test-submit-btn to-submit"
                        style={{
                           backgroundColor: "#5d68d8",
                           color: "#f5f5f7",
                        }}
                     >
                        Xem điểm
                     </button>
                  </Link>
               ) : (
                  <button
                     className="test-submit-btn to-submit"
                     // disabled={submitted.status}
                     onClick={() => setIsOpen(!isOpen)}
                  >
                     {submitted.text}
                  </button>
               )}
            </div>
         </div>
         <div className="answer-control">
            <button onClick={handleOpenAnswerList}>
               Bài làm
               <i
                  class="fa-solid fa-angle-up"
                  style={{ marginLeft: "10px" }}
               ></i>
            </button>

            <div className="time-test flex-center">
               {!submitted.status
                  ? `${duration?.hours} ${duration?.minutes} : ${duration?.seconds}`
                  : ""}
            </div>

            <div className="test-submit flex-center">
               {submitted.status ? (
                  <Link to={`../result/${examId}`}>
                     <button
                        className="test-submit-btn to-submit"
                        style={{
                           backgroundColor: "#5d68d8",
                           color: "#f5f5f7",
                        }}
                     >
                        Xem điểm
                     </button>
                  </Link>
               ) : (
                  <button
                     className="test-submit-btn to-submit"
                     // disabled={submitted.status}
                     onClick={() => setIsOpen(!isOpen)}
                  >
                     {submitted.text}
                  </button>
               )}
            </div>

            <form
               id="answerform"
               name="answerform"
               className="answer-grid answerform-mobile"
               onSubmit={handleSubmitAnswer}
               style={{ display: "none" }}
            >
               {questions?.map((question, index) => {
                  const [value] = answer.filter(
                     (item) => item.id === question.id
                  );

                  return (
                     <AnswerSelectItem
                        key={question.id}
                        question={question}
                        index={index}
                        valueSelected={answer}
                        setAnswer={setAnswer}
                        value={value}
                        handleAnswerQuestion={handleAnswerQuestion}
                        // color={valueSelect || null}
                        disabled={submitted.status}
                     />
                  );
               })}
            </form>
         </div>
      </>
   );
}

export default QuestionsRender;
