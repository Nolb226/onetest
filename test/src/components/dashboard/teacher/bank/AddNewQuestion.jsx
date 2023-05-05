import { useEffect, useState } from "react";
import validator from "../../../home/modal/validator";

const layout = {
   width: "100%",
   height: "600px",
   justifyContent: "flex-start",
};

const questionInput = {
   width: "100%",
   height: "35px",
   border: "none",
   borderBottom: "2px solid #BFBFBF",
   background: "#F0F0F0",
   padding: "5px 10px",
   fontSize: "1.7rem",
   outline: "none",
   color: "#333",
};

function AnswerListInput({ answerArray, questionId }) {
   console.log(questionId);
   return answerArray.map((item) => (
      <div
         className="flex-center form-group"
         style={{
            flexDirection: "row",
            margin: "0",
         }}
      >
         <input
            type="radio"
            name={"correctAns" + questionId}
            id={"correct" + questionId}
            value={item.value}
            style={{ marginBottom: "16px" }}
         />
         <div className="flex-center answer-item">
            <input
               rules="require"
               type="text"
               name={item.id}
               className="form-control"
               placeholder={"Đáp án " + item.value}
            ></input>
            <label
               htmlFor={item.id}
               className="form-message"
               style={{ height: "16px" }}
            ></label>
         </div>
      </div>
   ));
}

function QuestionBox({ question, questionListArray, setQuestionListArray }) {
   return (
      <div className=" question-box flex-direction-col position-relative question-box">
         <div
            className="question-box__content"
            style={{ display: "flex", flexDirection: "column" }}
         >
            <div
               className="form-group"
               style={{ margin: "10px 0 0", height: "50px" }}
            >
               <input
                  rules="require"
                  className="form-control"
                  type="text"
                  name="description"
                  id="description"
                  style={questionInput}
                  placeholder="Câu hỏi"
               ></input>
               <label htmlFor="description" className="form-message"></label>
            </div>

            <div
               className="flex-center flex-direction-col"
               style={{
                  marginTop: "5px",
                  flex: "1",
                  width: "100%",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
               }}
            >
               <AnswerListInput
                  questionId={question.questionId}
                  answerArray={question.answers}
               />
            </div>
         </div>
         <ul className="flex-center flex-direction-col question-side-menu ">
            <li className="flex-center tool-btn">
               <select
                  name="level"
                  id="level"
                  className="tool-btn"
                  style={{
                     width: "100%",
                     height: "100%",
                     border: "none",
                     outline: "none",
                     textAlign: "center",
                     borderRadius: "2px",
                  }}
               >
                  <option value="0">Dễ</option>
                  <option value="1">Khó</option>
               </select>
            </li>
            <li
               className="flex-center tool-btn"
               onClick={() => {
                  const lastIndex = questionListArray.length - 1;
                  let answer = {
                     questionId: questionListArray[lastIndex].questionId + 1,
                     answers: [
                        { value: "A", id: "answerA" },
                        { value: "B", id: "answerB" },
                        { value: "C", id: "answerC" },
                        { value: "D", id: "answerD" },
                     ],
                  };
                  setQuestionListArray((prev) => [...prev, answer]);
               }}
            >
               Thêm
            </li>
            <li
               className="flex-center tool-btn"
               onClick={(e) => {
                  setQuestionListArray(
                     questionListArray.filter(
                        (item) => item.questionId !== question.questionId
                     )
                  );
               }}
            >
               Xóa
            </li>
         </ul>
      </div>
   );
}

function AddNewQuestion({ classList }) {
   console.log(classList);
   const [questionListArray, setQuestionListArray] = useState([
      {
         questionId: 0,
         answers: [
            { value: "A", id: "answerA" },
            { value: "B", id: "answerB" },
            { value: "C", id: "answerC" },
            { value: "D", id: "answerD" },
         ],
      },
   ]);

   useEffect(() => {
      validator("#form--create-exam");
   }, [questionListArray]);

   return (
      <>
         <div
            className="flex-center flex-direction-col create-handicraft position-relative"
            style={layout}
         >
            <form
               action=""
               method="POST"
               id="addNewQuestion"
               name="formcreateexam"
               style={{
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  gridTemplateColumns: "25% 75%",
               }}
            >
               <div className="position-relative exam-information info-box__handicraft">
                  <div className="info-item form-group">
                     <label
                        className="form-label"
                        htmlFor="examId"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Mã môn
                     </label>

                     <input
                        rules="require"
                        className="form-control"
                        type="text"
                        name="examId"
                        id="examId"
                        placeholder="Nhập mã môn học"
                        style={{
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                           width: "100%",
                        }}
                     />
                     <label
                        htmlFor="examId"
                        className="form-message"
                        style={{ height: "16px" }}
                     ></label>
                  </div>

                  <div className="info-item form-group">
                     <label
                        className="form-label"
                        htmlFor="name"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Chương
                     </label>

                     <select
                        name="chapter"
                        id="chapter"
                        className="form-control"
                        style={{
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           height: "30px",
                           outline: "none",
                           borderRadius: "5px",
                           border: "solid 2px #BFBFBF",
                           width: "100%",
                        }}
                     ></select>
                     <label
                        htmlFor="name"
                        className="form-message"
                        style={{ height: "16px" }}
                     ></label>
                  </div>

                  <button>tạo</button>
               </div>
               <div className="question-list">
                  {questionListArray.map((questionItem) => (
                     <QuestionBox
                        key={questionItem.questionId}
                        question={questionItem}
                        setQuestionListArray={setQuestionListArray}
                        questionListArray={questionListArray}
                     />
                  ))}
               </div>
            </form>
         </div>
      </>
   );
}

export default AddNewQuestion;
