import { useEffect, useState } from "react";
import Info from "../Info";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../../../../../config/config";

function Result() {
   const [data, setData] = useState({});
   const { examId } = useParams();
   const { state } = useLocation();
   const accessToken = localStorage.getItem("currentUser");
   useEffect(() => {
      fetch(`${api}/classes/${state?.classId}/exams/${examId}`, {
         headers: {
            Authorization: "Bearer " + accessToken,
         },
      })
         .then((response) => response.json())
         .then((data) => setData(data.data));
   }, []);

   return (
      <>
         <div className="content flex-center">
            <div className="result-container">
               <header className="result-header">
                  <div className="title flex-center">KẾT QUẢ</div>
                  <div className="score flex-center">
                     <p className="score1">Điểm đạt được:</p>
                     <p className="score2">{data?.grade?.toFixed(2)}/10</p>
                  </div>
               </header>
               <div className="result-subject flex-center">
                  {data?.lecture_name}: {data?.exam_id} - {data?.exam_name}
               </div>
               <div className="result-content">
                  <div className="contestant result-content-child">
                     <div className="result-content-child-title flex-center">
                        <i className="fa-regular fa-user"></i> Thí sinh:
                     </div>
                     <div className="result-content-child-value">
                        {data?.fullname}
                     </div>
                  </div>

                  <div className="time-test result-content-child">
                     <div className="result-content-child-title flex-center">
                        <i className="fa-regular fa-clock"></i> Thời gian làm
                        bài:
                     </div>
                     <div className="result-content-child-value">
                        {data?.duration}
                     </div>
                  </div>

                  <div className="right-answer result-content-child">
                     <div className="result-content-child-title flex-center">
                        <i className="fa-regular fa-circle-check"></i> Số câu
                        đúng:
                     </div>
                     <div className="result-content-child-value right">
                        {data?.correct}
                     </div>
                  </div>

                  <div className="wrong-answer result-content-child">
                     <div className="result-content-child-title flex-center">
                        <i className="fa-regular fa-circle-xmark"></i> Số câu
                        sai:
                     </div>
                     <div className="result-content-child-value wrong">
                        {data?.wrong}
                     </div>
                  </div>

                  <div className="total-answer result-content-child">
                     <div className="result-content-child-title flex-center">
                        <i class="fa-solid fa-exclamation"></i> Tổng số câu:
                     </div>
                     <div className="result-content-child-value">
                        {data?.totalQuestions}
                     </div>
                  </div>
               </div>
               <footer className="result-footer flex-center">
                  <Link
                     to={`../exam/${examId}`}
                     state={{ isDone: true, classId: state?.classId }}
                  >
                     <button className="see-detail-test">
                        Chi tiết bài làm
                     </button>
                  </Link>
               </footer>
            </div>
         </div>
      </>
   );
}

export default Result;
