import ClassItem from "./ClassItem";
import { useState, useEffect } from "react";
import api from "../../../../config/config.js";

function Classes(prop) {
   const [classes, setClasses] = useState([]);

   useEffect(() => {
      fetch(`${api}/classes`, {
         method: "GET",
         headers: {
            Authorization:
               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMDQ3ODg3LCJleHAiOjE2ODEzMDcwODd9.Y9dXoVfvWEFEPoVQHn9wKJAjH1Hfz6AiOCpSjGqtuxU",
         },
      })
         .then((res) => res.json())
         .then((classes) => {
            // console.log(classes);
            setClasses(classes.data.data);
         });
   }, []);

   function update(Class) {
      const list = classes.map((classroom) => {
         if (Class.id === classroom.id) {
            return { ...classroom, isLock: !classroom.isLock };
         }
         return classroom;
      });
      // console.log(Class);
      setClasses(list);
      // console.log(list);
   }

   const handleLock = (Class) => {
      // console.log(Class.isLock);
      // console.log(Class.id);
      fetch(`${api}/classes/${Class.id}`, {
         method: "PATCH",
         body: JSON.stringify({
            isLock: !Class.isLock,
         }),
         headers: {
            Authorization:
               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMDQ3ODg3LCJleHAiOjE2ODEzMDcwODd9.Y9dXoVfvWEFEPoVQHn9wKJAjH1Hfz6AiOCpSjGqtuxU",
            "Content-type": "application/json",
         },
      }).then((response) => response.json());
      //   .then((json) => console.log(json.data));

      update(Class);
   };

   return (
      <>
         <div className="flex-center search-bar">
            <input
               type="text"
               className="search-input"
               placeholder="Nhập mã lớp"
            />
            <button
               className="flex-center join-button"
               onClick={prop.handleCreateClass}
            >
               <i className="menu-icon fa-solid fa-plus"></i>
               <span>Tạo lớp mới</span>
            </button>
         </div>
         <div className="table-zone grid">
            <h1 className="table__heading">DANH SÁCH NHÓM LỚP</h1>

            <div className="grid table__content">
               <ul className="row no-gutters flex-center table__content--heading">
                  <li className="col l-6-4">
                     <h3>Mã Lớp</h3>
                  </li>

                  <li className="col l-6-4">
                     <h3>Tên Lớp</h3>
                  </li>

                  <li className="col l-6-4">
                     <h3>Môn</h3>
                  </li>

                  <li className="col l-6-4">
                     <h3>Danh sách sinh viên</h3>
                  </li>

                  <li className="col l-6-2">
                     <h3>Khóa Lớp</h3>
                  </li>

                  <li className="col l-6-2">
                     <h3>Chỉnh sửa</h3>
                  </li>
               </ul>

               <div className="table__content--list classes ">
                  {classes.length === 0 ? (
                     <div className="flex-center" style={{ height: "100%" }}>
                        <h1 className="noClass">Không có lớp</h1>
                     </div>
                  ) : (
                     classes.map((Class) => {
                        return (
                           <ClassItem
                              key={Class.id}
                              Class={Class}
                              handleLock={handleLock}
                              handleRePass={prop.handleRePass}
                              handleClassList={prop.handleClassList}
                           />
                        );
                     })
                  )}
               </div>
            </div>
         </div>
      </>
   );
}

export default Classes;

// Classes.map(Class => (<ClassItem key={Class.id} Class = {Class} />)) }
