import { useEffect, useState } from "react";
import api from "../../../../config/config";
import { useNavigate } from "react-router";
import LoadingData from "../../../loadingAnimation/LoadingData";

function ExamList() {
   const currentUser = localStorage.getItem("currentUser");
   const navigator = useNavigate();
   const [examData, setExamData] = useState([]);
   const [isLoadingData, setIsLoadingData] = useState(false);
   const [errorLoadingData, setErrorLoadingData] = useState("");

   const getExamData = async () => {
      setIsLoadingData(true);
      await fetch(`${api}/classes/exams`, {
         headers: {
            Authorization: "Bearer " + currentUser,
         },
      })
         .then((data) => data.json())
         .then((data) => {
            setExamData(data.data);
            setIsLoadingData(false);
         })
         .catch(() => {
            setErrorLoadingData("Không thể lấy dữ liệu. Vui lòng thử lại !");
            setIsLoadingData(false);
         });
   };

   useEffect(() => {
      getExamData();
   }, []);

   const handleLock = (classID, exam) => {
      fetch(`${api}/classes/${classID}/exams/${exam.id}`, {
         method: "PATCH",
         body: JSON.stringify({
            isLock: !exam.isLock,
         }),
         headers: {
            Authorization: "Bearer " + currentUser,
            "Content-type": "application/json",
         },
      }).then((response) => response.json());

      setExamData(updateLockExam(classID, exam.id));
   };

   const updateLockExam = (classID, examID) => {
      return examData.map((exam) => {
         if (exam.class_id === classID && exam.id === examID) {
            exam.isLock = !exam.isLock;
            console.log(exam.isLock);
         }
         return exam;
      });
   };

   return (
      <>
         <div className="flex-center search-bar">
            <input
               type="text"
               className="search-input"
               placeholder="Nhập mã đề thi"
            />
            <button
               className="flex-center join-button"
               onClick={() => {
                  navigator("create", { relative: "path" });
               }}
            >
               <i className="fa-solid fa-plus"></i>
               <span>Tạo bài thi</span>
            </button>
         </div>
         <div className="table-zone manage-exam">
            <header className="table__header">
               <ul className="table__content--heading table__content-teacher--row">
                  <li className="flex-center column-text">
                     <h3>Đề thi</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Môn học</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Lớp</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Nộp</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Xem đáp án</h3>
                  </li>

                  <li className="flex-center column-text">Chi tiết</li>
               </ul>
               <div className="filter-box"></div>
            </header>
            <div className="grid table__content">
               <div className="table__content--list position-relative">
                  {errorLoadingData && (
                     <div
                        className="flex-center"
                        style={{
                           width: "100%",
                           height: "100%",
                           fontSize: "1.6rem",
                           color: "#777",
                        }}
                     >
                        {errorLoadingData}
                     </div>
                  )}
                  {isLoadingData && <LoadingData />}

                  {examData.map((exam) => {
                     return (
                        <ul
                           className="table__content-teacher--row table__content--item"
                           key={exam.id}
                        >
                           <li className="flex-center column-text exam-name">
                              <h3>
                                 {exam.name} - {exam.id}
                              </h3>
                           </li>

                           <li className="flex-center column-text">
                              <h3>{exam.lecture_name}</h3>
                           </li>

                           <li className="flex-center column-text">
                              <h3>{exam.class_id}</h3>
                           </li>

                           <li className="flex-center column-text test-done">
                              <h3>{exam.totals}</h3>
                           </li>

                           <li
                              className="flex-center column-text view-result"
                              onClick={() => {
                                 console.log(exam.isLock);
                                 handleLock(exam.class_id, exam);
                              }}
                           >
                              <input
                                 type="checkbox"
                                 name=""
                                 id=""
                                 checked={!exam.isLock}
                              />
                              <span class="checkmark"></span>
                           </li>
                           <li className="flex-center column-text">
                              <button className="view-btn">Xem</button>
                           </li>
                        </ul>
                     );
                  })}
               </div>
            </div>

            <div className="mobile-table-content">
               {examData.map((exam) => {
                  return (
                     <div className="flex-center mobile-table-item">
                        <h3>
                           {exam.name} - {exam.id}
                        </h3>
                        <span>Môn:&nbsp; {exam.lecture_name}</span>
                        <span>Lớp:&nbsp;{exam.class_id}</span>
                        <div
                           className="flex-center lock-exam"
                           onClick={() => {
                              console.log(exam.isLock);
                              handleLock(exam.class_id, exam);
                           }}
                        >
                           <label htmlFor="lock" style={{ color: "#555" }}>
                              Xem đáp án
                           </label>
                           <input
                              type="checkbox"
                              name=""
                              id=""
                              checked={!exam.isLock}
                           />
                        </div>
                        <button className="view-btn">Xem chi tiết</button>
                     </div>
                  );
               })}
            </div>
         </div>
      </>
   );
}

export default ExamList;
