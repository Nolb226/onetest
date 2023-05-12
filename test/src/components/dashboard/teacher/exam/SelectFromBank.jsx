import { useState, useEffect } from "react";
import api from "../../../../config/config";
import handleType1 from "./HandleType1";
import handleType2_3 from "./HandleType2_3";
import Loading from "../../../loadingAnimation/Loading";
import LoadingData from "../../../loadingAnimation/LoadingData";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import ModalNotification from "../../../home/modal/modalNotification";

const inputList = {
   width: "100%",
   height: "100%",
   minHeight: "450px",
   justifyContent: "flex-start",
};

const label = {
   color: "#444444",
   fontSize: "1.4rem",
   fontWeight: "600",
   width: "150px",
   lineHeight: "3rem",
};

const question = {
   width: "690px",
   minHeight: "40px",
   border: "none",
   flex: "1",
   background: "#F0F0F0",
   padding: "0 10px",
   fontSize: "1.6rem",
   fontWeight: "600",
   lineHeight: "1.6rem",
   outline: "none",
   color: "#444",
   display: "flex",
   alignItems: "center",
   cursor: "default",
   overflow: "hidden",
};

const answer = {
   flex: "1",
   height: "32px",
   lineHeight: "3.2rem",
   border: "none",
   background: "#fff",
   padding: "0 10px",
   fontSize: "1.5rem",
   outline: "none",
   color: "#444",
   marginLeft: "15px",
   display: "inline-block",
   alignItems: "center",
   textOverflow: "ellipsis",
   whiteSpace: "nowrap",
   overflow: "hidden",
   cursor: "default",
};

function Question({ questionObject }) {
   useEffect(() => {
      const liElement = document.getElementById(`${questionObject.id}`);
      liElement.querySelectorAll("input[type=radio]").forEach((item) => {
         if (item.value === questionObject.correctAns) item.checked = true;
      });
   }, []);

   return (
      <li
         id={questionObject.id}
         className="question-box"
         style={{
            width: "100%",
            padding: "5px 0",
            borderBottom: "solid 1px #d5d5d5",
         }}
         // data-level={questionObject.level}
         // data-chapterId={questionObject.chapterId}
      >
         <div style={{ width: "100%" }}>
            <div className="flex-center" style={{ width: "100%" }}>
               <input
                  type="checkbox"
                  name=""
                  data-level={questionObject.level}
                  data-chapterid={questionObject.chapterId}
                  id={questionObject.id}
                  style={{
                     width: "18px",
                     height: "18px",
                     marginRight: "5px",
                  }}
               />
               <h1
                  name="question"
                  style={question}
                  placeholder="Câu hỏi"
                  title={questionObject.description}
               >
                  {questionObject.description}
               </h1>
            </div>

            <div
               className="flex-center flex-direction-col"
               style={{ marginTop: "15px", paddingLeft: "20px" }}
            >
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     disabled="true"
                     name={questionObject.id + "correct"}
                     className={questionObject.id + "correct"}
                     value="A"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <p style={answer} title={questionObject.answerA}>
                     {questionObject.answerA}
                  </p>
               </div>
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     disabled="true"
                     name={questionObject.id + "correct"}
                     className={questionObject.id + "correct"}
                     value="B"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <p style={answer} title={questionObject.answerB}>
                     {questionObject.answerB}
                  </p>
               </div>
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     disabled="true"
                     name={questionObject.id + "correct"}
                     className={questionObject.id + "correct"}
                     value="C"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <p style={answer} title={questionObject.answerC}>
                     {questionObject.answerC}
                  </p>
               </div>
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     disabled="true"
                     name={questionObject.id + "correct"}
                     className={questionObject.id + "correct"}
                     value="D"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <p style={answer} title={questionObject.answerD}>
                     {questionObject.answerD}
                  </p>
               </div>
            </div>
         </div>
      </li>
   );
}

const getParentElement = (childElement, parentSelector) => {
   while (childElement.parentElement) {
      if (childElement.parentElement.matches(parentSelector)) {
         return childElement.parentElement;
      }
      childElement = childElement.parentElement;
   }
};

function clearErrorMessage(selector) {
   let parentElement = getParentElement(
      document.querySelector(selector),
      ".form-group"
   );

   document.querySelector(selector).innerText = "";
   parentElement.classList.remove("invalid");
}

function validator(formSelector, setIsLoading, classId, navigate) {
   let formElement = document.querySelector(formSelector);

   let formRules = {};

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

      if (formSelector === "#selectFromBank") {
         formElement.onsubmit = (event) => {
            event.preventDefault();
            var isValid = true;
            let questionArray = [];
            let formData = new FormData();
            const currentUser = localStorage.getItem("currentUser");
            const type = formElement.querySelector("select[name=type]");
            const questionList = formElement.querySelector(".question-list");
            const chapterList =
               formElement.querySelectorAll("li[name=chapter]");
            const chapters = [];
            chapterList.forEach((chapter) => {
               console.log(chapter.id);
               chapters.push(chapter.id);
            });

            if (type.value === "1" || type.value === 1) {
               if (
                  questionList.querySelectorAll(
                     `input[type="checkbox"]:checked`
                  ).length === 0
               ) {
                  isValid = false;
                  // <ModalNotification
                  //    headingMessage="Tạo thành công !"
                  //    message="Click bất kì để quay lại trang chính"
                  //    handleClickModal
                  // />;
               } else {
                  questionList
                     .querySelectorAll(`input[type="checkbox"]:checked`)
                     .forEach((checkbox) => {
                        let question = {};
                        question["id"] = checkbox.id;
                        questionArray.push(question);
                     });
               }
            }

            inputs.forEach((input) => {
               if (!handelValidate({ target: input })) {
                  isValid = false;
               }
            });

            if (isValid) {
               const totalQuestions =
                  parseInt(formElement.querySelector("#easy").value) +
                  parseInt(formElement.querySelector("#hard").value);

               // Get data from exam information
               inputs.forEach((input) => {
                  formData.append(input.name, input.value);
               });

               // Get data from every question box

               formData.append("type", type.value);
               formData.append("totalQuestions", totalQuestions);
               formData.append("questions", JSON.stringify(questionArray));
            }

            // fetch(`${api}/test`, {
            //    body: formData,
            //    method: "POST",
            //    headers: {
            //       Authorization: "Bearer " + currentUser,
            //    },
            // });

            setIsLoading(true);

            fetch(
               `${api}/classes/${classId}/exams?chapters=${chapters.join(",")}`,
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
                  navigate(-1);
                  setIsLoading(false);
               }
            });
         };
      }
   }
}

function SelectFromBank() {
   const currentUser = localStorage.getItem("currentUser");
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   const [examChapter, setExamChapter] = useState([]);
   const [examQuestions, setExamQuestions] = useState([]);
   const [chapters, setChapters] = useState([]);
   const [type, setType] = useState(1);
   const [isLoadingData, setIsLoadingData] = useState(false);
   const [searchParams] = useSearchParams();
   const classId = searchParams.get("id");
   validator("#selectFromBank", setIsLoading, classId, navigate);

   const easyElement = document.getElementById("easy");
   const hardElement = document.getElementById("hard");
   // const totalElement = document.getElementById("totalQuestions");

   // console.log(examQuestions);

   const increase = (level) => {
      // totalElement.value = parseInt(totalElement.value) + 1;

      if (level == "0") easyElement.value = parseInt(easyElement.value) + 1;
      else hardElement.value = parseInt(hardElement.value) + 1;
   };

   const decrease = (level) => {
      // totalElement.value = parseInt(totalElement.value) - 1;
      if (level == "0") easyElement.value = parseInt(easyElement.value) - 1;
      else hardElement.value = parseInt(hardElement.value) - 1;
   };

   function getQuestionList(e) {
      const checkbox = e.target.closest("input[type='checkbox']");
      if (!checkbox) return;
      if (checkbox.checked === true) {
         increase(checkbox.dataset.level);
      } else if (checkbox.checked === false) {
         decrease(checkbox.dataset.level);
      }
   }

   // ----- Fetch API to get Chapters from Subject -----

   const getExamChapter = async () => {
      // setIsLoadingData(true);
      await fetch(`${api}/classes/${classId}/chapters`, {
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
   }, []);

   // ----- Fetch API to get Questions from Chapters -----

   const handleChapterGuide = (length) => {
      if (length === 0)
         document.querySelector(".chapter-guide").style.display = "flex";
      else document.querySelector(".chapter-guide").style.display = "none";
   };

   const getExamQuestions = async () => {
      setIsLoadingData(true);
      await fetch(
         `${api}/classes/841109222-12/chapters/questions?chapters=${chapters.join(
            ","
         )}`,
         {
            headers: {
               Authorization: "Bearer " + currentUser,
            },
         }
      )
         .then((data) => data.json())
         .then((data) => {
            setExamQuestions(data.data);
            setIsLoadingData(false);
         });
   };

   useEffect(() => {
      getExamQuestions();
      handleChapterGuide(chapters.length);
      easyElement
         ? (easyElement.value = 0)
         : console.log("first time get a chapter");
      hardElement
         ? (hardElement.value = 0)
         : console.log("first time get a chapter");

      document.querySelectorAll("input[type='checkbox']")
         ? document
              .querySelectorAll("input[type='checkbox']")
              .forEach((checkbox) => {
                 checkbox.checked = false;
              })
         : console.log("first time get a chapter");
   }, [chapters]);

   const handleRemoveChapter = (chapter) => {
      setChapters(chapters.filter((item) => item !== chapter));
   };

   useEffect(() => {
      let easy = 0;
      let hard = 0;
      examQuestions.forEach((question) => {
         console.log(question.level);
         question.level === 0 || question.level === "0"
            ? (easy += 1)
            : (hard += 1);
      });

      document.getElementById("easy").max = easy;
      document.getElementById("hard").max = hard;

      validator("#selectFromBank", setIsLoading, classId);
   }, [examQuestions]);

   // ----- Handle when select type of created-method -----

   useEffect(() => {
      const easyQuestion = document.getElementById("easy");
      const hardQuestion = document.getElementById("hard");
      if (type === 1 || type === "1") {
         // clearErrorMessage(".form-message.totalQuestions");
         clearErrorMessage(".form-message.easy");
         clearErrorMessage(".form-message.hard");

         handleType1(easyQuestion, hardQuestion);
      } else {
         handleType2_3(easyQuestion, hardQuestion);

         document
            .querySelectorAll("input[type='checkbox']")
            .forEach((checkbox) => {
               checkbox.checked = false;
               checkbox.disabled = true;
            });
      }
   }, [type]);

   const handleChapterMenu = (e) => {
      console.log(e.target);
      e.stopPropagation();
      document.querySelector(".chapter-menu").classList.toggle("display-flex");
      handleChapterGuide(chapters.length);
   };

   return (
      <>
         {/* {modal === "successful" && (
            <ModalNotification
               headingMessage="Tạo thành công !"
               message="Click bất kì để quay lại trang chính"
               handleClickModal={setModal("")}
            />
         )}
         {modal === "fail" && (
            <ModalNotification
               headingMessage="Tạo không thành công !"
               message="Click bất kì để quay lại trang chính"
               handleClickModal={setModal("")}
            />
         )} */}
         {isLoading && <Loading />}
         <div
            className="create-select-from-bank__layout"
            onClick={() => {
               document
                  .querySelector(".chapter-menu")
                  .classList.remove("display-flex");
            }}
         >
            <form
               action=""
               method="POST"
               id="selectFromBank"
               onClick={(e) => getQuestionList(e)}
            >
               <div className="flex-center flex-direction-col info-box__select-from-bank">
                  <ul
                     className="flex-center flex-direction-col"
                     style={inputList}
                  >
                     <li
                        className="flex-center form-group"
                        style={{
                           margin: "5px 0",
                           flexDirection: "row",
                           alignItems: "flex-start",
                           height: "40px",
                        }}
                     >
                        <label
                           htmlFor="type"
                           style={label}
                           className="form-label"
                        >
                           Hình thức tạo:
                        </label>
                        <select
                           name="type"
                           id="type"
                           style={{
                              flex: "1",
                              height: "25px",
                              textAlign: "center",
                              border: "solid 2px #BFBFBF",
                              borderRadius: "4px",
                           }}
                           onChange={(e) => setType(e.target.value)}
                        >
                           <option value="1">Tự chọn</option>
                           <option value="2">Ngẫu nhiên cho lớp</option>
                           <option value="3">Ngẫu nhiên</option>
                        </select>
                     </li>

                     <li
                        className="flex-center form-group"
                        style={{
                           width: "100%",
                           margin: "5px 0",
                           flexDirection: "row",
                           alignItems: "flex-start",
                           height: "40px",
                        }}
                     >
                        <label
                           htmlFor="name"
                           style={label}
                           className="form-label"
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
                                 flex: "1",
                                 height: "30px",
                                 outline: "none",
                                 borderRadius: "4px",
                                 border: "solid 2px #BFBFBF",
                              }}
                           />
                           <label
                              htmlFor="name"
                              className="form-message"
                           ></label>
                        </div>
                     </li>

                     <li
                        className="flex-center form-group"
                        style={{
                           width: "100%",
                           margin: "5px 0",
                           flexDirection: "row",
                           alignItems: "flex-start",
                           height: "40px",
                        }}
                     >
                        <label
                           htmlFor="examId"
                           style={label}
                           className="form-label"
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
                                 flex: "1",
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
                     </li>

                     <li
                        className="flex-center form-group"
                        style={{
                           width: "100%",
                           margin: "5px 0",
                           flexDirection: "row",
                           alignItems: "flex-start",
                           height: "40px",
                        }}
                     >
                        <label
                           htmlFor="duration"
                           style={label}
                           className="form-label"
                        >
                           Thời gian
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
                                 width: "150px",
                                 fontSize: "1.4rem",
                                 paddingLeft: "10px",
                                 flex: "1",
                                 height: "30px",
                                 outline: "none",
                                 borderRadius: "4px",
                                 border: "solid 2px #BFBFBF",
                                 textAlign: "center",
                              }}
                           />
                           <label
                              htmlFor="duration"
                              className="form-message"
                           ></label>
                        </div>
                     </li>

                     <li
                        className="flex-center form-group"
                        style={{
                           width: "100%",
                           margin: "5px 0",
                           flexDirection: "row",
                           alignItems: "flex-start",
                           height: "40px",
                        }}
                     >
                        <label
                           htmlFor="timeStart"
                           style={label}
                           className="form-label"
                        >
                           Thơi gian bắt đầu
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
                                 flex: "1",
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
                     </li>

                     <li
                        className="flex-center form-group"
                        style={{
                           width: "100%",
                           margin: "5px 0",
                           flexDirection: "row",
                           alignItems: "flex-start",
                           height: "40px",
                        }}
                     >
                        <label
                           htmlFor="timeEnd"
                           style={label}
                           className="form-label"
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
                              rules="require|timeEnd"
                              className="form-control"
                              type="datetime-local"
                              name="timeEnd"
                              id="timeEnd"
                              style={{
                                 fontSize: "1.4rem",
                                 paddingLeft: "10px",
                                 flex: "1",
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
                     </li>

                     {/* <li
                        className="flex-center form-group"
                        style={{
                           width: "100%",
                           margin: "5px 0",
                           flexDirection: "row",
                           alignItems: "flex-start",
                           height: "40px",
                        }}
                     >
                        <label
                           htmlFor="totalQuestions"
                           style={label}
                           className="form-label"
                        >
                           Số câu hỏi
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
                              disabled="true"
                              type="text"
                              name="totalQuestions"
                              id="totalQuestions"
                              style={{
                                 width: "150px",
                                 fontSize: "1.4rem",
                                 paddingLeft: "10px",
                                 flex: "1",
                                 height: "30px",
                                 outline: "none",
                                 borderRadius: "4px",
                                 border: "solid 2px #BFBFBF",
                                 textAlign: "center",
                              }}
                           />
                           <label
                              htmlFor="totalQuestions"
                              className="form-message totalQuestions"
                           ></label>
                        </div>
                     </li> */}

                     <li
                        className="flex-center form-group"
                        style={{
                           width: "100%",
                           margin: "5px 0",
                           flexDirection: "row",
                           alignItems: "flex-start",
                           height: "40px",
                        }}
                     >
                        <label
                           htmlFor="easy"
                           style={label}
                           className="form-label"
                        >
                           Dễ
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
                              type="number"
                              min="0"
                              max
                              name="easy"
                              id="easy"
                              style={{
                                 width: "150px",
                                 fontSize: "1.4rem",
                                 paddingLeft: "10px",
                                 flex: "1",
                                 height: "30px",
                                 outline: "none",
                                 borderRadius: "4px",
                                 border: "solid 2px #BFBFBF",
                                 textAlign: "center",
                              }}
                           />
                           <label
                              htmlFor="easy"
                              className="form-message easy"
                           ></label>
                        </div>
                     </li>

                     <li
                        className="flex-center form-group"
                        style={{
                           width: "100%",
                           margin: "5px 0",
                           flexDirection: "row",
                           alignItems: "flex-start",
                           height: "40px",
                        }}
                     >
                        <label
                           htmlFor="hard"
                           style={label}
                           className="form-label"
                        >
                           Khó
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
                              type="number"
                              min="0"
                              max
                              name="hard"
                              id="hard"
                              style={{
                                 width: "150px",
                                 fontSize: "1.4rem",
                                 paddingLeft: "10px",
                                 flex: "1",
                                 height: "30px",
                                 outline: "none",
                                 borderRadius: "4px",
                                 border: "solid 2px #BFBFBF",
                                 textAlign: "center",
                              }}
                           />
                           <label
                              htmlFor="hard"
                              className="form-message hard"
                           ></label>
                        </div>
                     </li>
                  </ul>

                  <button className="create-exam-btn-pc">Tạo</button>
               </div>

               <div className="question-list_container">
                  <div
                     className="flex-center"
                     style={{
                        position: "absolute",
                        top: "0",
                        zIndex: "98",
                        width: "100%",
                        padding: "0 10px",
                        marginBottom: "0px",
                        backgroundColor: "#fff",
                     }}
                     onClick={(e) => handleChapterMenu(e)}
                  >
                     <ul
                        style={{
                           flex: 1,
                           display: "flex",
                           flexWrap: "nowrap",
                           overflowX: "scroll",
                           width: "100%",
                           height: "50px",
                           whiteSpace: "nowrap",
                           justifyContent: "flex-start",
                        }}
                        className="flex-center list__selected-chapter"
                     >
                        <li
                           className="flex-center chapter-guide"
                           style={{
                              fontSize: "1.6rem",
                              color: "#777",
                              paddingLeft: "20px",
                           }}
                        >
                           Vui lòng chọn chương
                        </li>
                        {chapters.map((chapter) => (
                           <li
                              className=" flex-center chapter"
                              name="chapter"
                              id={chapter}
                              style={{
                                 width: "90px",
                                 color: "var(--primary-color)",
                                 borderColor: "var(--primary-color)",
                              }}
                              onClick={(e) => {
                                 e.stopPropagation();
                                 handleRemoveChapter(chapter);
                              }}
                           >
                              <span>Chương {chapter}</span>
                           </li>
                        ))}
                     </ul>
                     <div
                        id="select-chapter"
                        style={{
                           color: "##444444",
                           fontSize: "1.4rem",
                           fontWeight: "600",
                           width: "40px",
                           textAlign: "right",
                        }}
                     >
                        <i className="fa-solid fa-chevron-down"></i>
                     </div>
                     <ul
                        className="chapter-menu"
                        onClick={(e) => e.stopPropagation()}
                     >
                        {examChapter.map((chapter, index) => {
                           if (chapter.name !== "Chương chung") {
                              return (
                                 <li
                                    className="chapter flex-center"
                                    onClick={() => {
                                       if (
                                          chapters.find(
                                             (item) => item === index
                                          ) === undefined
                                       )
                                          setChapters((prev) => [
                                             ...prev,
                                             index,
                                          ]);
                                    }}
                                 >
                                    <span>Chương {index}</span>
                                 </li>
                              );
                           }
                        })}
                     </ul>
                  </div>

                  <ul
                     className="flex-center flex-direction-col question-list position-relative"
                     style={{
                        height: "100%",
                        overflowY: "scroll",
                        width: "100%",
                        paddingTop: "45px",
                        justifyContent: "flex-start",
                     }}
                  >
                     {examQuestions.map((item) => (
                        <Question questionObject={item} />
                     ))}
                     {isLoadingData && <LoadingData />}
                  </ul>
               </div>

               <button
                  className="create-exam-btn-tablet"
                  style={{ marginTop: "10px" }}
               >
                  Tạo
               </button>
            </form>
         </div>
      </>
   );
}

export default SelectFromBank;
