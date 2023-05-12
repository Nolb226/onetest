import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

function ExamButton({ classId, exam, isDone, isLock, timeStart }) {
   const navigate = useNavigate();

   /* 
		Button_Status :
		- "Done" but not "Lock"
		- "Lock" but not "Done"
		- "Done" and "Lock"
		------------------------
		1. isDone & isLock => Disable button
		2. !isDone & isLock => Normal button
		3. isDone & !isLock => Enable button
	*/

   let status;
   if (isDone && !isLock) {
      status = "Done";

      return (
         <>
            <Link
               to={`../../../exam/${exam}`}
               state={{ classId, isDone: true }}
               relative="path"
            >
               <button class="exam-done view-btn">Xem</button>
            </Link>
         </>
      );
   }
   if (isDone && isLock) {
      status = "Lock";

      return <button class="inf-btn exam-lock">Đã khóa</button>;
   }

   function handleTime(e, exam) {
      // navigate(`../${classId}/exam/${exam}`);

      const date = new Date();
      const start = new Date(timeStart);
      if (date - start <= 0) {
         // e.stopPropagation();
         alert("Chưa tới thời gian làm bài");
      } else {
         navigate(`../../../exam/${exam}`, {
            replace: true,
            relative: "path",
            state: { classId, isDone: false },
         });
         console.log(123);
      }
   }

   return (
      <div>
         <div
            state={{ classId, isDone: false }}
            // relative="path"
            // to={`../../../exam/${exam}`}
         >
            <button
               class="view-btn"
               style={{ backgroundColor: "#161f89" }}
               onClick={(e) => {
                  // navigate("../");

                  handleTime(e, exam);
               }}
            >
               Làm
            </button>
         </div>
      </div>
   );
}

function ExamItem({
   idExam,
   nameExam,
   subject,
   time,
   timeStart,
   timeEnd,
   totalQuestions,
   isDone,
   classId,
   isLock,
   exam,
}) {
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
      <ul
         className="flex-center table__content--item"
         style={{
            display: "grid",
            gridTemplateColumns: "8% 14% 18% 20% 20% 10% 10%",
         }}
      >
         <li className="flex-center column-text">
            <h3>{idExam}</h3>
         </li>

         <li className="flex-center column-text">
            <h3>{nameExam}</h3>
         </li>

         <li className="flex-center column-text">
            <h3>{subject}</h3>
         </li>

         <li className="flex-center column-text">
            <h3>{vietNamFomatter.format(new Date(timeStart))}</h3>
            {/* <h3>{timeStart}</h3> */}
         </li>

         <li className="flex-center column-text">
            <h3>{vietNamFomatter.format(new Date(timeEnd))}</h3>
            {/* <h3>{timeEnd}</h3> */}
         </li>

         <li className="flex-center column-text">
            <h3>{time}</h3>
         </li>

         <li className="flex-center column-text">
            <ExamButton
               key={exam.id}
               classId={classId}
               exam={exam}
               isDone={isDone}
               isLock={isLock}
               timeStart={timeStart}
            />
         </li>
      </ul>
   );
}

export default ExamItem;
export { ExamButton };
