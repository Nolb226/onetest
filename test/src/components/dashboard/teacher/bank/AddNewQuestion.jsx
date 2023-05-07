import { useEffect, useState } from "react";
import api from "../../../../config/config";

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

function validator(formSelector, setIsLoading, chapters, lectureId) {
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

         Array.from(questionBoxes).every((questionBox) => {
            if (
               questionBox.querySelector(
                  `.form-group > input[type="radio"]:checked`
               ) === null
            ) {
               isValid = false;
               const boxContent = questionBox.querySelector(
                  ".question-box__content"
               );
               boxContent.style.borderColor = "red";

               alert("Vui lòng chọn đáp án đúng cho câu hỏi được tô đỏ !");
               return false;
            } else {
               isValid = true;
               const boxContent = questionBox.querySelector(
                  ".question-box__content"
               );
               boxContent.style.borderColor = "#1f2ec9";

               return true;
            }
         });

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

            formData.append("questions", JSON.stringify(questionArray));

            setIsLoading(true);

            fetch(
               `${api}/lectures/${lectureId}/chapters/${chapters}/questions`,
               {
                  body: formData,
                  method: "POST",
                  headers: {
                     Authorization: "Bearer " + currentUser,
                  },
               }
            ).then((res) => {
               if (!res.ok) {
                  setIsLoading(false);
                  alert("Tạo đề không thành công! Vui lòng thử lại.");
               } else if (res.ok) {
                  console.log("nav");
                  alert("Tạo đề thành công! Click để quay lại trang chính.");
                  setIsLoading(false);
               }
            });
         }
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

function AddNewQuestion({ classList }) {
   const [lectureId, setLectureId] = useState("");
   const currentUser = localStorage.getItem("currentUser");
   const [examChapter, setExamChapter] = useState([]);
   const [isLoadingData, setIsLoadingData] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [chapters, setChapters] = useState([]);

   const getExamChapter = async () => {
      setIsLoadingData(true);
      await fetch(`${api}/lectures/${lectureId}/chapters`, {
         headers: {
            Authorization: "Bearer " + currentUser,
         },
      })
         .then((data) => data.json())
         .then((data) => {
            setExamChapter(data.data);
            setIsLoadingData(false);
         });
   };

   useEffect(() => {
      getExamChapter();
   }, [lectureId]);

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
      validator("#addNewQuestion", setIsLoading, chapters, lectureId);
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
                  <div
                     className="info-item form-group"
                     style={{
                        flexDirection: "row",
                        height: "35px",
                        alignItems: "center",
                     }}
                  >
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
                        className="form-control"
                        type="text"
                        name="examId"
                        id="examId"
                        placeholder="Nhập mã môn học"
                        style={{
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           flex: "1",
                           height: "30px",
                           maxWidth: "70%",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                        onChange={(e) => setLectureId(e.target.value)}
                     />
                     <label htmlFor="examId" className="form-message"></label>
                  </div>

                  <li
                     className="flex-center form-group"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        flexDirection: "row",
                        alignItems: "center",
                        height: "40px",
                     }}
                  >
                     <label
                        htmlFor="examId"
                        className="form-label"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Chương
                     </label>
                     <div
                        style={{
                           flex: "1",
                           display: "flex",
                           flexDirection: "column",
                           justifyContent: "flex-start",
                        }}
                     >
                        <select
                           className="form-control"
                           type="text"
                           name="chapter"
                           id="chapter"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              maxWidth: "150px",
                              flex: "1",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                           }}
                           onChange={(e) => {
                              setChapters(e.target.value.split(" ")[1]);
                           }}
                        >
                           <option className="chapter flex-center">
                              <span>Chọn chương</span>
                           </option>
                           {examChapter?.map((chapter, index) => {
                              if (chapter.name !== "Chương chung") {
                                 return (
                                    <option
                                       className="chapter flex-center"
                                       key={index}
                                    >
                                       <span>Chương {index}</span>
                                    </option>
                                 );
                              }
                           })}
                           <option className="chapter flex-center">
                              <span>Chương mới</span>
                           </option>
                        </select>
                     </div>
                  </li>

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
