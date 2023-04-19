import { useState, useEffect } from "react";
import api from "../../.././config/config.js";
import DetailInformation from "./DetailInformation.jsx";

function ManageAccount() {
   const [examData, setExamData] = useState([]);
   const currentUser = localStorage.getItem("currentUser");

   useEffect(() => {
      const getExamData = async () => {
         const userreq = await fetch(`${api}/classes/exams`, {
            headers: {
               Authorization: "Bearer " + currentUser,
            },
         });
         const data = await userreq.json();
         setExamData(data.data);
      };
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
            <button className="flex-center join-button">
               <i className="menu-icon fa-solid fa-plus"></i>
               <span>Tạo bài thi</span>
            </button>
         </div>
         <div className="table-zone grid">
            <header className="table__header">
               <h1 className="table__heading">danh sách tài khoản</h1>
               <div className="filter-box"></div>
            </header>
            <div className="grid table__content">
               <ul className="row no-gutters flex-center table__content--heading">
                  <li className="col l-1">
                     <h3>STT</h3>
                  </li>

                  <li className="col l-2">
                     <h3>Mã cá nhân</h3>
                  </li>

                  <li className="col l-3">
                     <h3>Họ và tên</h3>
                  </li>

                  <li className="col l-2">
                     <h3>Ngày tạo</h3>
                  </li>

                  <li className="col l-1">
                     <h3>Loại</h3>
                  </li>

                  <li className="col l-1">
                     <h3>Kích hoạt</h3>
                  </li>

                  <li className="col l-2">
                     <h3>Chỉnh sửa</h3>
                  </li>
               </ul>
               <div className="table__content--list">
                  {/* {examData.map((exam) => {
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
                  })} */}

                  <ul className="row no-gutters flex-center table__content--item">
                     <li className="col l-1">
                        <h3>01</h3>
                     </li>

                     <li className="col l-2">
                        <h3>3121410146</h3>
                     </li>

                     <li className="col l-3">
                        <h3>Nguyễn Thành Đạt</h3>
                     </li>

                     <li className="col l-2">
                        <h3>11/11/2023</h3>
                     </li>

                     <li className="col l-1">
                        <h3>SV</h3>
                     </li>

                     <li className="col l-1">
                        <input type="checkbox" name="" id="" />
                     </li>

                     <li
                        className="col l-2"
                        onClick={() => {
                           document.getElementById(
                              "detail-information"
                           ).style.display = "flex";
                        }}
                     >
                        <h3>Xem chi tiết</h3>
                        <DetailInformation />
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
}

export default ManageAccount;
