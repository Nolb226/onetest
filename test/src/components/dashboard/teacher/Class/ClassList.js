import { useState,useEffect } from "react";
import Student from "./Student";
import Paginator from "./Paginator";

function Classlist(prop) {
  const [studentList, setStudentList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const handleClassList = () => {
    fetch(
      `http://192.168.100.37:8080/classes/${prop.isClass.id}/students?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxNDQwMjYzLCJleHAiOjE2ODE2OTk0NjN9.hr6m-BXChJbTkSjPv5xEW6kDChuc5O1r927gV3YybWU",
        },
      }
    )
      .then((res) => res.json())
      .then((studentList) => {
        console.log(studentList.data);
        setStudentList(studentList.data.data);
        setTotalPage(Math.ceil(studentList.data.total / 10))
      });
  }

  useEffect(() => {handleClassList()}, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    console.log(newPage);
  };

  const array = ["test1", "test2"];

  // quay lại
  const returnBtn = document.querySelector(".return");
  returnBtn.addEventListener("click", () => {
    prop.handleClassList("");
  });

  return (
    <>
      <div class="flex-center search-bar">
        <input
          type="text"
          class="search-input"
          placeholder="Nhập mã sinh viên"
        />
      </div>

      <div class="table-zone grid position-relative">
        <h1 class="table__heading">Kỹ Thuật Lập Trình 04 </h1>

        <div class="grid table__content">
          <ul class="row no-gutters flex-center table__content--heading">
            <li className="col l-1 m-1">
              <h3>STT</h3>
            </li>

            <li class="col l-2 m-2">
              <h3>MSSV</h3>
            </li>

            <li class="col l-3 m-3">
              <h3>Họ và Tên</h3>
            </li>

            {array.map((value) => {
              return (
                <li class="col l-3 m-1">
                  <h3>{value}</h3>
                </li>
              );
            })}
          </ul>

          <div class="table__content--list">
            {studentList.length === 0 ? (
              <div className="flex-center" style={{ height: "100%" }}>
                <h1 class="noClass">Không có sinh viên</h1>
              </div>
            ) : (
              studentList.map((student,index) => {
                console.log(student);
                return (
                  <Student
                    key={student.id}
                    student={student}
                    index = {index}
                    numberOfTest = {2}
                    page = {page}
                  />
                );
              })
            )}
          </div>
          <Paginator handlePageChange={handlePageChange} page={page} totalPage = {totalPage} />
        </div>
      </div>
    </>
  );
}

export default Classlist;
import { useState, useEffect } from "react";
import Student from "./Student";
import api from "../../../../config/config.js";

function Classlist(prop) {
   const [studentList, setStudentList] = useState([]);

   useEffect(() => {
      fetch(`${api}/classes/${prop.isClass.id}/students`, {
         method: "GET",
         headers: {
            Authorization:
               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMDQ3ODg3LCJleHAiOjE2ODEzMDcwODd9.Y9dXoVfvWEFEPoVQHn9wKJAjH1Hfz6AiOCpSjGqtuxU",
         },
      })
         .then((res) => res.json())
         .then((studentList) => {
            console.log(studentList.data);
            setStudentList(studentList.data.data);
         });
   }, []);

   const array = ["test1", "test2"];

   return (
      <div>
         <div className="flex-center search-bar">
            <input
               type="text"
               className="search-input"
               placeholder="Nhập mã sinh viên"
            />
         </div>

         <div className="table-zone grid">
            <h1 className="table__heading">Kỹ Thuật Lập Trình 04 </h1>

            <div className="grid table__content">
               <ul className="row no-gutters flex-center table__content--heading">
                  <li className="col l-1 m-1">
                     <h3>STT</h3>
                  </li>

                  <li className="col l-2 m-2">
                     <h3>MSSV</h3>
                  </li>

                  <li className="col l-3 m-3">
                     <h3>Họ và Tên</h3>
                  </li>

                  {array.map((value) => {
                     return (
                        <li className="col l-3 m-1">
                           <h3>{value}</h3>
                        </li>
                     );
                  })}
               </ul>

               <div className="table__content--list">
                  {studentList.length === 0 ? (
                     <div className="flex-center" style={{ height: "100%" }}>
                        <h1 className="noClass">Không có sinh viên</h1>
                     </div>
                  ) : (
                     studentList.map((student, index) => {
                        console.log(student);
                        return (
                           <Student
                              key={student.id}
                              student={student}
                              index={index}
                              numberOfTest={2}
                           />
                        );
                     })
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Classlist;
