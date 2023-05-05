import { useState, useEffect } from "react";
import api from "../../../../config/config";
import Loading from "../../../loadingAnimation/Loading";
import LoadingData from "../../../loadingAnimation/LoadingData";
import { Outlet, useNavigate, useOutlet } from "react-router";

const inputList = {
   width: "100%",
   height: "100%",
   maxHeight: "360px",
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
   height: "40px",
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
   lineHeight: "1.5rem",
   border: "none",
   background: "#fff",
   padding: "0 10px",
   fontSize: "1.5rem",
   outline: "none",
   color: "#444",
   marginLeft: "15px",
   display: "flex",
   alignItems: "center",
};

function Question({ questionObject }) {
   console.log(questionObject);
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
         key={questionObject.chapterId}
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
               <input
                  name="question"
                  type="text"
                  style={question}
                  placeholder="Câu hỏi"
                  title={questionObject.description}
                  defaultValue={questionObject.description}
               />
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
                     name={questionObject.id + "correct"}
                     className={questionObject.id + "correct"}
                     value="A"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <input
                     type="text"
                     defaultValue={questionObject.answerA}
                     style={answer}
                  />
               </div>
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     name={questionObject.id + "correct"}
                     className={questionObject.id + "correct"}
                     value="B"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <input
                     type="text"
                     defaultValue={questionObject.answerB}
                     style={answer}
                  />
               </div>
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     name={questionObject.id + "correct"}
                     className={questionObject.id + "correct"}
                     value="C"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <input
                     type="text"
                     defaultValue={questionObject.answerC}
                     style={answer}
                  />
               </div>
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     name={questionObject.id + "correct"}
                     className={questionObject.id + "correct"}
                     value="D"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <input
                     type="text"
                     defaultValue={questionObject.answerD}
                     style={answer}
                  />
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

function Bank() {
   const currentUser = localStorage.getItem("currentUser");
   const navigator = useNavigate();

   const [examChapter, setExamChapter] = useState([]);
   const [examQuestions, setExamQuestions] = useState([]);
   const [chapters, setChapters] = useState([]);
   const [lectureId, setLectureId] = useState("");
   const [questionArray, setQuestionArray] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [isLoadingData, setIsLoadingData] = useState(false);
   const Outlet = useOutlet();

   const easyElement = document.getElementById("easy");
   const hardElement = document.getElementById("hard");
   const totalElement = document.getElementById("totalQuestions");

   // window.onbeforeunload = preventFunc(e);

   window.addEventListener(
      "beforeunload",
      (e) => {
         e.preventDefault();
         window.confirm("warning");
      },
      false
   );

   // ----- Fetch API to get Chapters from Subject -----

   const getExamChapter = async () => {
      setIsLoadingData(true);
      setExamQuestions([]);
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

   // ----- Fetch API to get Questions from Chapters -----

   const getExamQuestions = async () => {
      setIsLoadingData(true);
      console.log(chapters);
      await fetch(
         `${api}/classes/841109222-12/chapters/questions?chapters=${chapters}`,
         {
            headers: {
               Authorization: "Bearer " + currentUser,
            },
         }
      )
         .then((data) => data.json())
         .then((data) => {
            console.log(data.data);
            setExamQuestions(data.data);
            setIsLoadingData(false);
         });
   };

   useEffect(() => {
      getExamQuestions();
   }, [chapters]);

   // ----- Handle when change question list -----

   useEffect(() => {
      console.log(examQuestions);
   }, [examQuestions]);

   return (
      <>
         {Outlet || (
            <>
               <div className="create-select-from-bank__layout">
                  <div className="bank-menu">
                     <button
                        className="add-new-question"
                        onClick={(e) => {
                           navigator("./addQuestion");
                        }}
                     >
                        Thêm câu hỏi
                     </button>
                     <button className="remove-question">
                        Xóa câu hỏi đã chọn
                     </button>
                  </div>
                  <form action="" method="POST" id="bank">
                     <div className="flex-center flex-direction-col info-box__select-from-bank">
                        <ul
                           className="flex-center flex-direction-col"
                           style={inputList}
                        >
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
                                 Mã môn học
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
                                       outline: "none",
                                       borderRadius: "4px",
                                       border: "solid 2px #BFBFBF",
                                    }}
                                    onChange={(e) =>
                                       setLectureId(e.target.value)
                                    }
                                 />
                                 <label
                                    htmlFor="examId"
                                    className="form-message"
                                 ></label>
                              </div>
                           </li>
                           {/* 
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
                                 Môn
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
                                    disabled="true"
                                    placeholder="Lập trình web"
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
                                 htmlFor="examId"
                                 style={label}
                                 className="form-label"
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
                                       flex: "1",
                                       height: "30px",
                                       outline: "none",
                                       borderRadius: "4px",
                                       border: "solid 2px #BFBFBF",
                                    }}
                                    onChange={(e) => {
                                       setChapters(
                                          e.target.value.split(" ")[1]
                                       );
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
                                 </select>
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
                                    disabled="true"
                                    type="text"
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
                                    disabled="true"
                                    type="text"
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

                        <button className="create-exam-btn-pc">Lưu</button>
                     </div>

                     <div className="question-list_container">
                        <ul
                           className="flex-center flex-direction-col question-list position-relative"
                           style={{
                              height: "100%",
                              overflowY: "scroll",
                              width: "100%",
                              paddingTop: "5px",
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
                        Lưu
                     </button>
                  </form>
               </div>
            </>
         )}
      </>
   );
}

export default Bank;
