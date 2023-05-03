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
               <ul
                  className="table__content--heading"
                  style={{
                     display: "grid",
                     gridTemplateColumns: "5% 15% 35% 10% 20% 10% 5%",
                  }}
               >
                  <li className="flex-center column-text">
                     <h3>STT</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Mã cá nhân</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Họ và tên</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Ngày tạo</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Nhóm quyền</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Kích hoạt</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Sửa</h3>
                  </li>
               </ul>
            </header>
            <div className="grid table__content">
               <div className="table__content--list">
                  <ul
                     className="flex-center table__content--item"
                     style={{
                        display: "grid",
                        gridTemplateColumns: "5% 15% 35% 10% 20% 10% 5%",
                     }}
                  >
                     <li className="flex-center column-text">
                        <h3>01</h3>
                     </li>

                     <li className="flex-center column-text">
                        <h3>3121410146</h3>
                     </li>

                     <li className="flex-center column-text">
                        <h3>Nguyễn Thành Đạt</h3>
                     </li>

                     <li className="flex-center column-text">
                        <h3>11/11/2023</h3>
                     </li>

                     <li className="flex-center column-text">
                        <h3>SV</h3>
                     </li>

                     <li className="flex-center column-text">
                        <input type="checkbox" name="" id="" />
                     </li>

                     <li
                        className="flex-center column-text"
                        onClick={() => {
                           if (document.getElementById("detail-information"))
                              document.getElementById(
                                 "detail-information"
                              ).style.display = "flex";
                        }}
                     >
                        <button class="list_btn list_btn_edit ">
                           <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   );
}

export default ManageAccount;
