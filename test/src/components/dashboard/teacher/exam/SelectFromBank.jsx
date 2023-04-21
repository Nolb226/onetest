import { useState, useEffect } from "react";
import api from "../../../../config/config";

const selectFromBankLayout = {
   width: "100%",
   height: "100%",
   marginTop: "1px",
   padding: "2%",
   backgroundColor: "#fff",
   position: "absolute",
   right: "0",
   left: "0",
   alignItems: "flex-start",
   boxSizing: "border-box",
};

const inputList = {
   padding: "10% 0px 0px 12px",
   width: "100%",
   height: "100%",
   minHeight: "450px",
   justifyContent: "flex-start",
};

const label = {
   color: "##444444",
   fontSize: "1.4rem",
   fontWeight: "600",
   width: "120px",
};

const question = {
   width: "690px",
   height: "35px",
   border: "none",
   flex: "1",
   background: "#F0F0F0",
   padding: "0 10px",
   fontSize: "1.7rem",
   fontWeight: "600",
   lineHeight: "3.5rem",
   outline: "none",
   color: "#444",
};

const answer = {
   flex: "1",
   height: "20px",
   lineHeight: "2rem",
   border: "none",
   background: "#fff",
   padding: "0 10px",
   fontSize: "1.6rem",
   outline: "none",
   color: "#555",
   marginLeft: "15px",
};

function Question({ questionObject }) {
   useEffect(() => {
      const liElement = document.getElementById(`${questionObject.id}`);
      liElement.querySelectorAll("input[type=radio]").forEach((item) => {
         if (item.value === questionObject.correctAns) item.checked = true;
      });
   }, []);

   // const test = (item) => {
   //    console.log(item);
   // };

   return (
      <li
         id={questionObject.id}
         className="question-box"
         style={{
            width: "100%",
            padding: "5px 0",
            borderBottom: "solid 1px #d5d5d5",
         }}
      >
         <div style={{ width: "100%" }}>
            <div className="flex-center" style={{ width: "100%" }}>
               <input
                  type="checkbox"
                  name=""
                  id=""
                  style={{
                     width: "18px",
                     height: "18px",
                     marginRight: "5px",
                  }}
               />
               <h1 name="question" style={question} placeholder="Câu hỏi">
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
                     name="correct"
                     className={questionObject.id + "correct"}
                     value="A"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <p style={answer}>{questionObject.answerA}</p>
               </div>
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     name="correct"
                     className={questionObject.id + "correct"}
                     value="B"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <p style={answer}>{questionObject.answerB}</p>
               </div>
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     name="correct"
                     className={questionObject.id + "correct"}
                     value="C"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <p style={answer}>{questionObject.answerC}</p>
               </div>
               <div
                  className="flex-center"
                  style={{ width: "100%", height: "40px" }}
               >
                  <input
                     type="radio"
                     name="correct"
                     className={questionObject.id + "correct"}
                     value="D"
                     style={{
                        margin: "0",
                        width: "15px",
                        height: "15px",
                     }}
                  />
                  <p style={answer}>{questionObject.answerD}</p>
               </div>
            </div>
         </div>
      </li>
   );
}

function SelectFromBank() {
   const currentUser = localStorage.getItem("currentUser");

   const [examChapter, setExamChapter] = useState([]);
   const [examQuestions, setExamQuestions] = useState([]);
   const [chapters, setChapters] = useState([]);

   useEffect(() => {
      const getExamChapter = async () => {
         const userreq = await fetch(`${api}/classes/841109222-12/chapters`, {
            headers: {
               Authorization: "Bearer " + currentUser,
            },
         });
         const data = await userreq.json();
         setExamChapter(data.data);
      };
      getExamChapter();
   }, []);

   // console.log(examQuestions);
   useEffect(() => {
      const getExamQuestions = async () => {
         const userreq = await fetch(
            `${api}/classes/841109222-12/chapters/questions?chapters=${chapters.join(
               ","
            )}`,
            {
               headers: {
                  Authorization: "Bearer " + currentUser,
               },
            }
         );
         const data = await userreq.json();
         setExamQuestions(data.data);
      };
      getExamQuestions();
   }, [chapters]);

   const handleChapterMenu = () => {
      document.querySelector(".chapter-menu").classList.toggle("display-flex");
   };

   return (
      <div className="flex-center" style={selectFromBankLayout}>
         <form
            action=""
            method="POST"
            id="form--create-exam__selectFromBank"
            style={{ display: "flex", width: "100%", height: "100%" }}
         >
            <div
               className="flex-center position-relative"
               style={{
                  width: "450px",
                  maxHeight: "100%",
                  borderRight: "1px solid #d5d5d5",
                  paddingRight: "25px",
               }}
            >
               <h2
                  className="position-absolute"
                  style={{
                     top: "0px",
                     left: "0px",
                     fontWeight: "600",
                     fontSize: "1.6rem",
                     lineHeight: "2.1rem",
                     color: "#424242",
                  }}
               >
                  Chọn từ ngân hàng đề
               </h2>

               <ul className="flex-center flex-direction-col" style={inputList}>
                  <li
                     className="flex-center form-group"
                     style={{ width: "100%", margin: "5px 0" }}
                  >
                     <label htmlFor="name" style={label} className="form-label">
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
                           flex: "1",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                     <label htmlFor="name" className="form-message"></label>
                  </li>

                  <li
                     className="flex-center"
                     style={{ width: "100%", margin: "5px 0" }}
                  >
                     <label htmlFor="name" style={label}>
                        Mã đề
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
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
                     <label htmlFor="examId" className="form-message"></label>
                  </li>

                  <li
                     className="flex-center"
                     style={{ width: "100%", margin: "5px 0" }}
                  >
                     <label htmlFor="timeStart" style={label}>
                        Ngày bắt đầu
                     </label>
                     <input
                        type="datetime-local"
                        name="timeStart"
                        id="timeStart"
                        style={{
                           fontSize: "1.4rem",
                           padding: "0 15px 0 15px",
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
                  </li>

                  <li
                     className="flex-center"
                     style={{ width: "100%", margin: "5px 0" }}
                  >
                     <label htmlFor="timeEnd" style={label}>
                        Ngày kết thúc
                     </label>
                     <input
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
                     <label htmlFor="timeEnd" className="form-message"></label>
                  </li>

                  <li
                     className="flex-center"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        justifyContent: "space-between",
                     }}
                  >
                     <div className="flex-center">
                        <label htmlFor="duration" style={label}>
                           Thời gian
                        </label>
                        <input
                           type="text"
                           name="duration"
                           id="duration"
                           placeholder="...phút"
                           style={{
                              fontSize: "1.4rem",
                              width: "60px",
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

                  {/* <li
                     className="flex-center"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        justifyContent: "space-between",
                     }}
                  >
                     <div className="flex-center">
                        <label htmlFor="name" style={label}>
                           Tổng số câu
                        </label>
                        <input
                           type="text"
                           name="name"
                           id="name"
                           style={{
                              fontSize: "1.4rem",
                              width: "60px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                              textAlign: "center",
                           }}
                        />
                     </div>
                     <select
                        name="create"
                        id="create"
                        style={{
                           fontSize: "1.4rem",
                           width: "150px",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                           textAlign: "center",
                        }}
                     >
                        <option value="random">Ngẫu nhiên</option>
                        <option value="randomAll">Ngẫu nhiên tất cả</option>
                     </select>
                  </li>

                  <li
                     className="flex-center"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        justifyContent: "flex-start",
                     }}
                  >
                     <label htmlFor="name" style={label}>
                        Số câu dễ
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        style={{
                           textAlign: "center",
                           fontSize: "1.4rem",
                           height: "30px",
                           width: "60px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </li>

               

                  <li
                     className="flex-center"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        justifyContent: "flex-start",
                     }}
                  >
                     <label htmlFor="name" style={label}>
                        Số câu khó
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        style={{
                           fontSize: "1.4rem",
                           textAlign: "center",
                           height: "30px",
                           width: "60px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </li> */}
               </ul>
            </div>

            <div
               style={{
                  flex: "1",
                  height: "530px",
                  marginTop: "35px",
                  overflow: "hidden",
               }}
            >
               <div
                  className="position-absolute flex-center"
                  style={{
                     top: "2%",
                     right: "0",
                     width: "calc(100% - 450px)",
                     padding: "0 3%",
                     marginBottom: "10px",
                  }}
               >
                  <div
                     style={{
                        flex: 1,
                        display: "flex",
                        flexWrap: "nowrap",
                        overflowX: "scroll",
                        width: "100%",
                        height: "45px",
                        whiteSpace: "nowrap",
                     }}
                     className="list__selected-chapter"
                  >
                     {chapters.map((chapter) => (
                        <li
                           className=" flex-center chapter"
                           style={{ width: "90px" }}
                           // onClick={() =>
                           //    setChapters((prev) => [...prev, index])
                           // }
                        >
                           <span>Chương {chapter}</span>
                        </li>
                     ))}
                  </div>
                  <div
                     id="select-chapter"
                     style={{
                        color: "##444444",
                        fontSize: "1.4rem",
                        fontWeight: "600",
                        width: "40px",
                        textAlign: "right",
                     }}
                     onClick={() => handleChapterMenu()}
                  >
                     <i class="fa-solid fa-chevron-down"></i>
                  </div>

                  <ul className="chapter-menu">
                     {examChapter.map((chapter, index) => {
                        if (chapter.name !== "Chương chung") {
                           return (
                              <li
                                 className="chapter flex-center"
                                 onClick={() =>
                                    setChapters((prev) => [...prev, index])
                                 }
                              >
                                 <span>Chương {index}</span>
                              </li>
                           );
                        }
                     })}
                  </ul>
               </div>

               <ul
                  className="flex-center flex-direction-col question-list"
                  style={{
                     flex: "1",
                     height: "450px",
                     paddingLeft: "10px",
                     overflowY: "scroll",
                     paddingTop: "0",
                     justifyContent: "flex-start",
                  }}
               >
                  {examQuestions.map((item) => (
                     <Question questionObject={item} />
                  ))}
               </ul>
            </div>
            <button
               style={{
                  width: "125px",
                  height: "35px",
                  backgroundColor: "#1F2EC9",
                  borderRadius: "5px",
                  position: "absolute",
                  bottom: "-10px",
                  left: "auto",
                  right: "auto",
                  textTransform: "uppercase",
                  fontWeight: "600",
                  fontSize: "1.5rem",
                  letterSpacing: "1px",
               }}
            >
               Tạo
            </button>
         </form>
      </div>
   );
}

export default SelectFromBank;
