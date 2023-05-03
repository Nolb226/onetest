// import Info from "../Info";
import api from "../../../../../config/config.js";
import ClassItem from "./ClassItem";
import { useEffect, useRef, useState } from "react";
import Empty from "../Empty";
import {
   Outlet,
   useNavigate,
   useParams,
   useSearchParams,
} from "react-router-dom";
import Paginator from "../../../teacher/Class/Paginator";

function ViewClass() {
   const [classes, setClasses] = useState([]);
   const [total, setTotal] = useState(1);
   const [page, setPage] = useState(1);
   const [search, setSearch] = useState("");
   const [searchParams, setSearchParams] = useSearchParams({ search: "" });
   const params = useParams();
   const { idStudent, nameStudent } = params;
   const navigator = useNavigate();

   let isEmpty = useRef(true);

   const handleClass = () => {
      const currentUser = localStorage.getItem("currentUser");
      fetch(
         `${api}/classes?search=${
            searchParams.get("search") || ""
         }&page=${page}`,
         {
            headers: {
               Authorization: "Bearer " + currentUser,
            },
         }
      )
         .then((response) => response.json())
         .then((classesAPI) => {
            setClasses(classesAPI.data.data);
            setTotal(Math.ceil(classesAPI.data.total / 10));
            console.log(classesAPI.data.data);
            isEmpty.current = false;
         })
         .catch((error) => {
            console.log(error);
         });
   };

   const handlePageChange = (newPage) => {
      setPage(newPage);
      console.log(newPage);
   };
   useEffect(() => {
      // handleClass(page);
      handleClass(searchParams.get("search"));
   }, [page, searchParams]);

   return (
      <>
         <div class="flex-center search-bar">
            <form style={{ height: "100%" }}>
               <input
                  type="text"
                  class="search-input"
                  placeholder="Nhập mã lớp"
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                     e.preventDefault();
                     setSearchParams({ search });
                  }}
               />
               {/* <button
                  className="search-class-btn"
                  onClick={(e) => {
                     e.preventDefault();
                     setSearchParams({ search });
                  }}
               >
                  <i class="fa-solid fa-magnifying-glass"></i>
               </button> */}
            </form>
            <button
               className="flex-center join-button"
               onClick={() => {
                  navigator("./join", { relative: "path" });
               }}
            >
               <i className="fa-solid fa-plus"></i>
               <span>Lớp mới</span>
            </button>
         </div>
         <div className="table-zone grid position-relative">
            <header className="table__header">
               <ul
                  className="flex-center table__content--heading"
                  style={{
                     display: "grid",
                     gridTemplateColumns: "30% 30% 10% 10% 20%",
                  }}
               >
                  <li className="flex-center column-text">
                     <h3>Mã lớp</h3>
                  </li>
                  <li className="flex-center column-text">
                     <h3>Tên lớp</h3>
                  </li>
                  <li className="flex-center column-text">
                     <h3>Học kỳ</h3>
                  </li>
                  <li className="flex-center column-text">
                     <h3>Sĩ số</h3>
                  </li>
                  <li className="flex-center column-text">
                     <h3>Chi tiết</h3>
                  </li>
               </ul>
               <div className="filter-box"></div>
            </header>

            <div className="grid table__content">
               {isEmpty.current && (
                  <Empty content={"Bạn chưa tham gia lớp học nào"} />
               )}
               <div
                  className="table__content--list"
                  style={{ overflowY: "auto", height: 400 }}
               >
                  {classes.map((item) => (
                     <ClassItem
                        id={item.id}
                        nameClass={item.name}
                        semester={item.semester}
                        total={item.totalStudent}
                        idStudent={idStudent}
                        nameStudent={nameStudent}
                     />
                  ))}
               </div>
            </div>

            {/* <div className="grid table__content">
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
            </div> */}

            <Paginator
               handlePageChange={handlePageChange}
               page={page}
               totalPage={total}
            />
         </div>
      </>
   );
}

export default ViewClass;
