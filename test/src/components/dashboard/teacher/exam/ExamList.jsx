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
               <i className="menu-icon fa-solid fa-plus"></i>
               <span>Tạo bài thi</span>
            </button>
         </div>
         <div className="table-zone grid">
            <header className="table__header">
               <h1 className="table__heading">bài thi đã tạo</h1>
               <div className="filter-box"></div>
            </header>
            <div className="grid table__content">
               <ul className="row no-gutters flex-center table__content--heading">
                  <li className="col l-3">
                     <h3>Tên - Mã đề</h3>
                  </li>

                  <li className="col l-3">
                     <h3>Môn</h3>
                  </li>

                  <li className="col l-2">
                     <h3>Đã giao cho</h3>
                  </li>

                  <li className="col l-1">
                     <h3>Đã nộp</h3>
                  </li>

                  <li className="col l-1">
                     <h3>Xem đáp án</h3>
                  </li>

                  <li className="col l-2">Xuất</li>
               </ul>
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
                           className="row no-gutters flex-center table__content--item"
                           key={exam.id}
                        >
                           <li className="col l-3">
                              <h3>
                                 {exam.name} - {exam.id}
                              </h3>
                           </li>

                           <li className="col l-3">
                              <h3>{exam.lecture_name}</h3>
                           </li>

                           <li className="col l-2">
                              <h3>{exam.class_id}</h3>
                           </li>

                           <li className="col l-1">
                              <h3>{exam.totals}</h3>
                           </li>

                           <li
                              className="col l-1"
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
                           </li>
                           <li className="col l-2">
                              <button className="export-btn">Xuất</button>
                           </li>
                        </ul>
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
}

export default ExamList;
