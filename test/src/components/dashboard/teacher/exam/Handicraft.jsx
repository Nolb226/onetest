import { useEffect, useState } from "react";
import validator from "../../../home/modal/validator";

const layout = {
   width: "900px",
   height: "98%",
   margin: "17px auto",
   overflowY: "scroll",
   justifyContent: "flex-start",
};

const infoBox = {
   height: "280px",
   padding: "10px 0",
   borderRadius: "10px",
   backgroundColor: "#fff",
   width: "88.5%",
   marginRight: "11.1%",
};

const questionList = {
   marginTop: "20px",
   maxHeight: "290px",
   width: "100%",
   paddingRight: "100px",
};

const questionBox = {
   height: "280px",
   backgroundColor: "#fff",
   width: "100%",
   borderRadius: "10px",
   borderLeft: "solid 10px #1F2EC9",
   marginBottom: "15px",
   padding: "0 15px",
};

const questionInput = {
   width: "100%",
   height: "40px",
   border: "none",
   borderBottom: "2px solid #BFBFBF",
   background: "#F0F0F0",
   padding: "5px 10px",
   fontSize: "1.7rem",
   outline: "none",
   color: "#333",
};

const answer = {
   flex: "1",
   height: "40px",
   width: "100%",
   border: "none",
   borderBottom: "1px solid #BFBFBF",
   background: "#fff",
   padding: "0 10px",
   fontSize: "1.6rem",
   outline: "none",
   color: "#333",
   marginLeft: "15px",
};

const questionSideMenu = {
   width: "100%",
   height: "30px",
   margin: "2px",
   backgroundColor: "#FFFFFF",
   boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
   borderRadius: "2px",
   fontSize: "1.3rem",
};

function AnswerListInput({ answerArray, questionId }) {
   return answerArray.map((item) => (
      <div
         className="flex-center form-group"
         style={{
            width: "690px",
            height: "40px",
            flexDirection: "row",
         }}
      >
         <input
            type="radio"
            name={"correctAns" + questionId}
            id={"correct" + questionId}
            value={item.value}
            style={{ marginBottom: "16px" }}
         />
         <div
            className="flex-center"
            style={{
               flexDirection: "column",
               alignItems: "flex-start",
               width: "100%",
               height: "100%",
            }}
         >
            <input
               rules="require"
               type="text"
               name={item.id}
               // id={item.id}
               className="form-control"
               style={answer}
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
      <div
         className="flex-center flex-direction-col position-relative question-box"
         style={questionBox}
      >
         <ul
            className="flex-center flex-direction-col position-absolute"
            style={{
               right: "-98px",
               top: "0",
               width: "95px",
               borderRadius: "5px",
               backgroundColor: "#f0f0f0",
               height: "100px",
               padding: "4px",
            }}
         >
            <li className="flex-center" style={questionSideMenu}>
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
                  <option value="0">Mức độ: Dễ</option>
                  <option value="1">Mức độ: Khó</option>
               </select>
            </li>
            <li
               className="flex-center tool-btn"
               style={questionSideMenu}
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
               style={questionSideMenu}
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
         <div className="form-group" style={{ margin: "10px 0 0" }}>
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
            style={{ marginTop: "5px" }}
         >
            <AnswerListInput
               questionId={question.questionId}
               answerArray={question.answers}
            />
         </div>
      </div>
   );
}

function Handicraft() {
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

   console.log(questionListArray);

   return (
      <>
         <div
            className="flex-center flex-direction-col create-handicraft position-relative"
            style={layout}
         >
            <form
               action=""
               method="POST"
               id="form--create-exam"
               name="formcreateexam"
               style={{ width: "100%", paddingRight: "10px" }}
            >
               <div
                  className="flex-center flex-direction-col position-relative exam-information"
                  style={infoBox}
               >
                  <div
                     className=" form-group"
                     style={{
                        width: "89%",
                        margin: "0",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        height: "50px",
                     }}
                  >
                     <label
                        className="form-label"
                        htmlFor="examId"
                        style={{
                           color: "#222",
                           fontSize: "1.4rem",
                           fontWeight: "600",
                           width: "160px",
                           lineHeight: "30px",
                        }}
                     >
                        Mã đề
                     </label>
                     <div
                        style={{
                           flex: "1",
                           display: "flex",
                           flexDirection: "column",
                           justifyContent: "flex-start",
                        }}
                     >
                        <input
                           rules="require"
                           className="form-control"
                           type="text"
                           name="examId"
                           id="examId"
                           placeholder="Nhập mã đề"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                           }}
                        />
                        <label
                           htmlFor="examId"
                           className="form-message"
                        ></label>
                     </div>
                  </div>

                  <div
                     className=" form-group"
                     style={{
                        width: "89%",
                        margin: "0",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        height: "50px",
                     }}
                  >
                     <label
                        className="form-label"
                        htmlFor="name"
                        style={{
                           color: "#222",
                           fontSize: "1.4rem",
                           fontWeight: "600",
                           width: "160px",
                           lineHeight: "30px",
                        }}
                     >
                        Tên bài thi
                     </label>
                     <div
                        style={{
                           flex: "1",
                           display: "flex",
                           flexDirection: "column",
                           justifyContent: "flex-start",
                        }}
                     >
                        <input
                           rules="require"
                           className="form-control"
                           type="text"
                           name="name"
                           id="name"
                           placeholder="Nhập tên bài thi"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                           }}
                        />
                        <label htmlFor="name" className="form-message"></label>
                     </div>
                  </div>

                  <div
                     className=" form-group"
                     style={{
                        width: "89%",
                        margin: "0",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        height: "50px",
                     }}
                  >
                     <label
                        className="form-label"
                        htmlFor="timeStart"
                        style={{
                           color: "#222",
                           fontSize: "1.4rem",
                           fontWeight: "600",
                           width: "160px",
                           lineHeight: "30px",
                        }}
                     >
                        Thời gian bắt đầu
                     </label>
                     <div
                        style={{
                           flex: "1",
                           display: "flex",
                           flexDirection: "column",
                           justifyContent: "flex-start",
                        }}
                     >
                        <input
                           rules="require"
                           className="form-control"
                           type="datetime-local"
                           name="timeStart"
                           id="timeStart"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                           }}
                        />
                        <label
                           htmlFor="timeStart"
                           className="form-message"
                        ></label>
                     </div>
                  </div>

                  <div
                     className=" form-group"
                     style={{
                        width: "89%",
                        margin: "0",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        height: "50px",
                     }}
                  >
                     <label
                        className="form-label"
                        htmlFor="timeEnd"
                        style={{
                           color: "#222",
                           fontSize: "1.4rem",
                           fontWeight: "600",
                           width: "160px",
                           lineHeight: "30px",
                        }}
                     >
                        Thời gian kết thúc
                     </label>
                     <div
                        style={{
                           flex: "1",
                           display: "flex",
                           flexDirection: "column",
                           justifyContent: "flex-start",
                        }}
                     >
                        <input
                           rules="require"
                           className="form-control"
                           type="datetime-local"
                           name="timeEnd"
                           id="timeEnd"
                           placeholder="Nhập mã đề"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                           }}
                        />
                        <label
                           htmlFor="timeEnd"
                           className="form-message"
                        ></label>
                     </div>
                  </div>

                  <div
                     className=" form-group"
                     style={{
                        width: "89%",
                        margin: "0",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        height: "50px",
                     }}
                  >
                     <label
                        className="form-label"
                        htmlFor="duration"
                        style={{
                           color: "#222",
                           fontSize: "1.4rem",
                           fontWeight: "600",
                           width: "160px",
                           lineHeight: "30px",
                        }}
                     >
                        Thời gian làm bài
                     </label>
                     <div
                        style={{
                           flex: "1",
                           display: "flex",
                           flexDirection: "column",
                           justifyContent: "flex-start",
                        }}
                     >
                        <input
                           rules="require"
                           className="form-control"
                           type="text"
                           name="duration"
                           id="duration"
                           placeholder="Nhập số phút"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                           }}
                        />
                        <label
                           htmlFor="duration"
                           className="form-message"
                        ></label>
                     </div>
                  </div>
               </div>
               <div className="question-list" style={questionList}>
                  {questionListArray.map((questionItem) => (
                     <QuestionBox
                        key={questionItem.questionId}
                        question={questionItem}
                        setQuestionListArray={setQuestionListArray}
                        questionListArray={questionListArray}
                     />
                  ))}
               </div>
               <button
                  className="flex-center flex-direction-col position-absolute"
                  style={{
                     right: "15px",
                     top: "0",
                     width: "99px",
                     borderRadius: "5px",
                     backgroundColor: "var(--primary-color)",
                     color: "fff",
                     textTransform: "uppercase",
                     height: "30px",
                     padding: "4px",
                     fontWeight: "600",
                     letterSpacing: "1px",
                     boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px",
                  }}
               >
                  tạo đề
               </button>
            </form>
         </div>
      </>
   );
}

export default Handicraft;
