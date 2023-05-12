import Info from "../Info";
import api from "../../../../../config/config.js";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ExamItem, { ExamButton } from "./ExamItem";
import ExamFilter from "./ExamFilter";
import socket from "../../../../../util/socket";
// import ExamButton from "./ExamItem";

function StudentPage() {
   const [exams, setExams] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [searchParams, setSearchParams] = useSearchParams({ sort: "all" });
   const params = useParams();
   const { classId } = params;
   useEffect(() => {
      const currentUser = localStorage.getItem("currentUser");
      fetch(
         `${api}/classes/${classId}/exams?sort=${
            searchParams.get("sort") === "all" ? "" : searchParams.get("sort")
         }`,
         {
            headers: {
               Authorization: "Bearer " + currentUser,
            },
         }
      )
         .then((response) => response.json())
         .then((examsAPI) => {
            setExams(examsAPI.data);
         })
         .catch((error) => {
            console.log(error);
         });
   }, [searchParams]);
   // console.log(searchParams);

   useEffect(() => {
      // socket.connect();
      socket.on("exam:lock", (examId, lockState) => {
         // console.log(exams, examId, lockState);
         const list = exams.map((exam) => {
            // console.log(exam.id);
            if (exam.id === examId) {
               return { ...exam, isLock: lockState };
            }
            return exam;
         });
         // console.log(list);
         setExams(list);
      });

      socket.on("exam:created", (exam, lecture_name) => {
         // console.log(lecture_name);

         // if (exams.length < 10) {
         const list = [
            ...exams,
            {
               ...exam,
               lecture_name,
               exam_id: exam.examId,
               exam_name: exam.name,
            },
         ];
         setExams(list);
         // }
      });
      return () => {
         socket.off("exam:created");
         socket.off("exam:lock");
         // socket.disconnect();
      };
   }, [exams]);

   const vietNamFomatter = new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "America/Los_Angeles",
   });
   return (
      <>
         <ExamFilter
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setSearchParams={setSearchParams}
         />
         <div
            class="table-zone"
            style={{
               borderRadius: "0",
               marginTop: "35px",
            }}
            onClick={() => setIsOpen(false)}
         >
            <header class="table__header">
               <ul
                  class="table__content--heading container__row container__row--header"
                  style={{
                     display: "grid",
                     gridTemplateColumns: "8% 14% 18% 20% 20% 10% 10%",
                  }}
               >
                  <li className="flex-center column-text">
                     <h3>Mã đề</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Tên đề</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Môn</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Thời gian bắt đầu</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Thời gian kết thúc</h3>
                  </li>

                  <li className="flex-center column-text">
                     <h3>Thời gian</h3>
                  </li>

                  <li className="flex-center column-text"></li>
               </ul>
            </header>

            <div class="grid table__content">
               <div
                  className="flex-container container--body"
                  style={{ overflowY: "auto", height: 400 }}
               >
                  {exams?.map(
                     (item, number) =>
                        (
                           <ExamItem
                              key={number}
                              exam={item.id}
                              idExam={item.exam_id}
                              nameExam={item.exam_name}
                              subject={item.lecture_name}
                              time={item.duration}
                              timeStart={item.timeStart}
                              timeEnd={new Date(item.timeEnd)}
                              totalQuestions={item.totalQuestions}
                              isDone={item.isDone}
                              isLock={item.isLock}
                              classId={classId}
                           />
                        ) || <span> Không có bài thi nào</span>
                  )}
               </div>
            </div>

            <div className="mobile-table-content">
               {exams?.map(
                  (item) =>
                     (
                        <div className="flex-center mobile-table-item">
                           <h3>{item.exam_id}</h3>
                           <h3>{item.exam_name}</h3>
                           <span>
                              {vietNamFomatter.format(new Date(item.timeStart))}
                           </span>
                           <span>
                              {vietNamFomatter.format(new Date(item.timeEnd))}
                           </span>
                           <span>
                              Thời gian:&nbsp;{item.duration}&nbsp;phút
                           </span>
                           <ExamButton
                              classId={classId}
                              exam={item.id}
                              isDone={item.isDone}
                              isLock={item.isLock}
                           />
                        </div>
                     ) || (
                        // <ExamItem
                        //    exam={item.id}
                        //    idExam={item.exam_id}
                        //    nameExam={item.exam_name}
                        //    subject={item.lecture_name}
                        //    time={item.duration}
                        //    timeStart={item.timeStart}
                        //    timeEnd={item.timeEnd}
                        //    totalQuestions={item.totalQuestions}
                        //    isDone={item.isDone}
                        //    isLock={item.isLock}
                        //    classId={classId}
                        // />
                        <span> Không có bài thi nào</span>
                     )
               )}
            </div>
         </div>
         <button
            className="position-absolute"
            style={{
               top: "-35px",
               color: "#cc2424",
               border: "none",
               backgroundColor: "transparent",
               fontSize: "1.4rem",
               fontWeight: "500",
               boxShadow: "none",
               cursor: "pointer",
            }}
         >
            Rời lớp
         </button>
      </>
   );
}

export default StudentPage;
