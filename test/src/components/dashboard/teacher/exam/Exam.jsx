// import "./style.css";
// import "./responsive.css";
import React, { useState, useEffect } from "react";
import CreateExamModal from "./CreateExamModal";

function Exam() {
   // function ExamList() {
   //    const [classes, setClasses] = useState();
   //    const getExamData = async () => {
   //       const request = await fetch(
   //          "https://bestoftest.herokuapp.com/classes/exams"
   //       ,{
   //          headers:{
   //             Authorization:"Bearer " + token
   //          }
   //       });
   //       const response = await request.json();
   //       if (response.data) {
   //          response.data.forEach((data) => {
   //             if (data.id === "a111") setClasses(data);
   //          });
   //       }
   //    };

   //    useEffect(() => {
   //       getExamData();
   //    }, []);

   //    return (
   //       <>
   //          {classes.exams.map((item) => {
   //             return (
   //                <ul className="row no-gutters flex-center table__content--item">
   //                   <li className="col l-3">
   //                      <h3>
   //                         {item.name} - {item.id}
   //                      </h3>
   //                   </li>
   //                   <li className="col l-1">
   //                      <h3>40</h3>
   //                   </li>
   //                   <li className="col l-2">
   //                      <h3>information</h3>
   //                   </li>
   //                   <li className="col l-2">
   //                      <h3>{item.classId}</h3>
   //                   </li>
   //                   <li className="col l-2">
   //                      <h3>information</h3>
   //                   </li>
   //                   <li className="col l-5-1">
   //                      <button className="export-btn">Xuất</button>
   //                   </li>
   //                </ul>
   //             );
   //          })}
   //       </>
   //    );
   // }

   return (
      <>
         {/* <div className="flex-center search-bar">
            <input
               type="text"
               className="search-input"
               placeholder="Nhập mã đề thi"
            />
            <button className="flex-center join-button">
               <i className="menu-icon fa-solid fa-plus"></i>
               <span>Tạo bài thi</span>
            </button>
         </div> */}

         {/* <div className="create-exam flex-center flex-direction-row">
            <div className="create-exam__option flex-center flex-direction-col">
               <i className="option-handicraft fa-solid fa-file-pen"></i>
               <h2 className="create-exam__option--title">Tạo đề thủ công</h2>
            </div>

            <div className="create-exam__option flex-center flex-direction-col">
               <i className="option-bank fa-solid fa-building-columns"></i>
               <h2 className="create-exam__option--title">
                  Chọn từ ngân hàng đề
               </h2>
            </div>
         </div> */}

         <CreateExamModal />

         {/* <header className="table__header">
            <h1 className="table__heading">bài thi đã tạo</h1>
            <div className="filter-box"></div>
         </header>
         <div className="grid table__content">
            <ul className="row no-gutters flex-center table__content--heading">
               <li className="col l-2">
                  <h3>Tên - Mã đề</h3>
               </li>
               <li className="col l-2">
                  <h3>Đã nộp</h3>
               </li>
               <li className="col l-2">
                  <h3>Môn</h3>
               </li>
               <li className="col l-2">
                  <h3>Đã giao cho</h3>
               </li>
               <li className="col l-2">
                  <h3>Xem đáp án</h3>
               </li>
               <li className="col l-2">
                  <h3>Xuất File điểm</h3>
               </li>
            </ul>
            <div className="table__content--list">{/* <ExamList /> }</div>
         </div> */}
      </>
   );
}

export default Exam;
