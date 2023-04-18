import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "../style.css";
import Test from "./component-testpage/Test";
import ViewClass from "./component-joinclasspage/ViewClass";
import JoinClass from "./component-joinclasspage/JoinClass";
import StudentPage from "./component-studentpage/StudentPage";
import Result from "./component-testpage/Result";

import { useParams } from "react-router-dom";
import { Outlet } from "react-router";


function Student({ idStudent, nameStudent }) {
  //  const student = {
  //     id: "3121410417",
  //     name: "Nguyễn Ngọc Sang",
  //  };

  //  const leftMenuItems = () => {
  //     return document.getElementsByClassName("menu-item");
  //  };

  //  const handleLeftMenu = (el) => {
  //     const list = leftMenuItems();
  //     for (let i = 0; i < list.length; i++) {
  //        list[i].classList.remove("active");
  //     }
  //     el.closest("li").classList.add("active");
  //  };

  const { type, id, name } = useParams();

  return (
    <>
      {/* {type === `viewclass` && id === idStudent && name === nameStudent && <ViewClass />}
         {type === "joinclass" && <JoinClass />}
         {type === "studentpage" && <StudentPage />}
         {type === "test" && <Test />}
         {type === "result" && <Result />} */}
        {/* <Route
          path=":idStudent/:nameStudent"
         //  path="dashboard/viewclass/"
          element={<ViewClass />}
        /> */}
        {/* <Route
          path="/joinclass/:idStudent/:nameStudent"
          element={<JoinClass />}
        /> */}
        {/* <Route
          path="/studentpage/:idStudent/:nameStudent/:classId"
          element={<StudentPage />}
        /> */}
        {/* <Route
          path="/test/:idStudent/:nameStudent/:classId"
          element={<Test />}
        /> */}
        {/* <Route path="/result" element={<Result />} /> */}

      <Outlet/>

    </>

    // <div id="main-layout" className="grid wide main-layout">
    //    <div className="row no-gutters layout--body main-body">
    //       <div id="left-menu" className="position-relative col l-1">
    //          <ul className="menu-list flex-center flex-direction-col">
    //             <Link to={`/viewclass/${student.id}/${student.name}`}>
    //                <li
    //                   className={`menu-item ${
    //                      window.location.pathname.includes("joinclass")
    //                         ? ""
    //                         : "active"
    //                   } flex-center`}
    //                   onClick={(e) => {
    //                      handleLeftMenu(e.target);
    //                   }}
    //                >
    //                   <i className="menu-icon fa-solid fa-file-pen"></i>
    //                </li>
    //             </Link>

    //             <Link to={`/joinclass/${student.id}/${student.name}`}>
    //                <li
    //                   className={`menu-item ${
    //                      window.location.pathname.includes("joinclass")
    //                         ? "active"
    //                         : ""
    //                   } flex-center`}
    //                   onClick={(e) => {
    //                      handleLeftMenu(e.target);
    //                   }}
    //                >
    //                   <i className="menu-icon fa-solid fa-plus"></i>
    //                </li>
    //             </Link>
    //          </ul>

    //          <div className="themes flex-center position-absolute">
    //             <i className="menu-icon fa-solid fa-circle-half-stroke"></i>

    //             <ul className="themes-list"></ul>
    //          </div>
    //       </div>

    //       <div id="container" className="col l-11">
    //          <div className="top-bar">
    //             <header className="header flex-center position-relative">
    //                <div className="header__logo">
    //                   <img
    //                      src="../../../image/BestOfTest.png"
    //                      alt="Logo Best of Test"
    //                   />
    //                </div>
    //                <div className="navigation flex-center">
    //                   <ul className="nav__list flex-center">
    //                      <li
    //                         className="nav__item flex-center"
    //                         alt="Viet Nam flag"
    //                         title="Viet Nam"
    //                      >
    //                         <img
    //                            src="../../../image/Flag_of_Vietnam.png"
    //                            alt="VietNam"
    //                         />
    //                      </li>

    //                      <li className="nav__item flex-center">
    //                         <i className="nav__icon fa-regular fa-bell"></i>
    //                      </li>

    //                      <li className="nav__item flex-center">
    //                         <i className="nav__icon fa-regular fa-user"></i>
    //                      </li>
    //                   </ul>
    //                </div>
    //             </header>
    //          </div>
    //          {/* <Routes>
    //             <Route
    //                path="/viewclass/:idStudent/:nameStudent"
    //                element={<ViewClass />}
    //             />
    //             <Route
    //                path="/joinclass/:idStudent/:nameStudent"
    //                element={<JoinClass />}
    //             />
    //             <Route
    //                path="/studentpage/:idStudent/:nameStudent/:classId"
    //                element={<StudentPage />}
    //             />
    //             <Route
    //                path="/test/:idStudent/:nameStudent/:classId"
    //                element={<Test />}
    //             />
    //             <Route path="/result" element={<Result />} />
    //          </Routes> */}
    //       </div>
    //    </div>
    // </div>
    
  );
}

export default Student;
