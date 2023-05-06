import { useEffect, useState } from "react";
// import validator from '../../../home/modal/validator';
import api from "../../../../config/config";
import Loading from "../../../loadingAnimation/Loading";

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

function validator(formSelector, setIsLoading, setErrorLoading) {
   console.log("validate");
   let formElement = document.querySelector(formSelector);

   let formRules = {};

   const getParentElement = (childElement, parentSelector) => {
      while (childElement.parentElement) {
         if (childElement.parentElement.matches(parentSelector)) {
            return childElement.parentElement;
         }
         childElement = childElement.parentElement;
      }
   };

   var validatorRules = {
      require: (value) => {
         return value ? undefined : "Vui lòng nhập thông tin";
      },

      timeEnd: (value) => {
         const start = formElement.querySelector("#timeStart");
         const duration = formElement.querySelector("#duration");
         return new Date(value) - new Date(start.value) >=
            parseInt(duration.value, 10) * 60000
            ? undefined
            : "Thời gian kết thúc không hợp lệ";
      },
   };

   if (formElement) {
      var inputs = formElement.querySelectorAll("[name][rules]");

      const clearErrorMessage = (event) => {
         let parentElement = getParentElement(event.target, ".form-group");
         parentElement.classList.remove("invalid");
         parentElement.querySelector(".form-message").innerText = "";
      };

      // Lắng nghe sự kiện trên từng thẻ input
      const handelValidate = (event) => {
         var rules = formRules[event.target.name];
         var errorMessage;

         rules.find(function (rule) {
            errorMessage = rule(event.target.value);
            return errorMessage;
         });

         let parentElement = getParentElement(event.target, ".form-group");

         if (errorMessage) {
            parentElement.classList.add("invalid");
            parentElement.querySelector(
               ".form-message"
            ).innerText = `* ${errorMessage}`;
         }

         return !errorMessage;
      };

      // Lặp và gán function validator cho từng thẻ input
      inputs.forEach((input) => {
         var rules = input.getAttribute("rules").split("|");

         rules.forEach((rule) => {
            var ruleFunction;
            ruleFunction = validatorRules[rule];

            if (Array.isArray(formRules[input.name]))
               formRules[input.name].push(ruleFunction);
            else formRules[input.name] = [ruleFunction];
         });

         input.onblur = handelValidate;
         input.oninput = clearErrorMessage;
      });

      // Create handicraft exam

      console.log("validate for handily exam");
      formElement.onsubmit = (event) => {
         event.preventDefault();
         const currentUser = localStorage.getItem("currentUser");
         var isValid = true;
         let questionArray = [];
         let formData = new FormData();
         const questionList = formElement.querySelector(".question-list");
         let questionBoxes = questionList.querySelectorAll(".question-box");

         inputs.forEach((input) => {
            if (!handelValidate({ target: input })) {
               isValid = false;
            }
         });

         const start = formElement.querySelector("#timeStart");
         const end = formElement.querySelector("#timeEnd");

         if (start.value >= end.value) {
            isValid = false;
         } else {
         }

         if (isValid) {
            var easy = 0;
            var hard = 0;
            // Get data from exam information
            inputs.forEach((input) => {
               if (input.closest(".exam-information")) {
                  formData.append(input.name, input.value);
               }
            });

            // Get data from every question box
            questionBoxes.forEach((box) => {
               let question = {};

               // correct answer
               question["correctAns"] = box.querySelector(
                  `input[type="radio"]:checked`
               ).value;

               // level of question
               const level = box.querySelector("#level").value;
               question["level"] = level;

               level === "0" ? (easy += 1) : (hard += 1);

               // answers
               box.querySelectorAll("input[type=text]").forEach((item) => {
                  question[`${item.name}`] = item.value;
               });

               questionArray.push(question);
            });

            formData.append("totalQuestions", questionBoxes.length);
            formData.append("easy", easy);
            formData.append("hard", hard);
            formData.append("type", 0);
            formData.append("questions", JSON.stringify(questionArray));

            setIsLoading(true);

            fetch(`${api}/test`, {
               body: formData,
               method: "POST",
               headers: {
                  Authorization: "Bearer " + currentUser,
               },
            })
               .then((res) => {
                  if (!res.ok) {
                     setIsLoading(false);
                  }
               })
               .catch(() => {
                  setErrorLoading("Không thể tạo bài thi. Vui lòng thử lại !");
                  setIsLoading(false);
               });
         }

         // fetch(`${api}/classes/841109221-2/exams?type`, {
         //    body: formData,
         //    method: "POST",
         //    headers: {
         //       Authorization: "Bearer " + currentUser,
         //    },
         // });
      };
   }
}

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

function Handicraft({ classList }) {
   console.log(classList);
   const [isLoading, setIsLoading] = useState(false);
   const [errorLoading, setErrorLoading] = useState("");

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
      validator("#handicraft", setIsLoading, setErrorLoading);
   }, [questionListArray]);

   return (
      <>
         <div
            className="flex-center flex-direction-col create-handicraft position-relative"
            style={layout}
         >
            {errorLoading && (
               <div
                  className="flex-center"
                  style={{
                     width: "100%",
                     height: "100%",
                     fontSize: "1.6rem",
                     color: "#777",
                  }}
               >
                  {errorLoading}
               </div>
            )}
            {isLoading && <Loading />}
            <form
               action=""
               method="POST"
               id="handicraft"
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
                        Mã đề
                     </label>

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
                        Tên bài thi
                     </label>

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
                           borderRadius: "5px",
                           border: "solid 2px #BFBFBF",
                           width: "100%",
                        }}
                     />
                     <label
                        htmlFor="name"
                        className="form-message"
                        style={{ height: "16px" }}
                     ></label>
                  </div>

                  <div className="info-item form-group">
                     <label
                        className="form-label"
                        htmlFor="timeStart"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Thời gian bắt đầu
                     </label>

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
                           borderRadius: "5px",
                           border: "solid 2px #BFBFBF",
                           width: "100%",
                        }}
                     />
                     <label
                        htmlFor="timeStart"
                        className="form-message"
                        style={{ height: "16px" }}
                     ></label>
                  </div>

                  <div className="info-item form-group">
                     <label
                        className="form-label"
                        htmlFor="timeEnd"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Thời gian kết thúc
                     </label>

                     <input
                        rules="require|timeEnd"
                        className="form-control"
                        type="datetime-local"
                        name="timeEnd"
                        id="timeEnd"
                        style={{
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           height: "30px",
                           outline: "none",
                           borderRadius: "5px",
                           border: "solid 2px #BFBFBF",
                           width: "100%",
                        }}
                     />
                     <label
                        htmlFor="timeEnd"
                        className="form-message"
                        style={{ height: "16px" }}
                     ></label>
                  </div>

                  <div className="info-item form-group">
                     <label
                        className="form-label"
                        htmlFor="duration"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Thời gian làm bài
                     </label>

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
                           borderRadius: "5px",
                           border: "solid 2px #BFBFBF",
                           width: "100%",
                        }}
                     />
                     <label
                        htmlFor="duration"
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

export default Handicraft;
