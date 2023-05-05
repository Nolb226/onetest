import { Link } from "react-router-dom";

function ExamButton({ classId, exam, isDone, isLock }) {
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
      console.log(status);

      return (
         <>
            <Link to={`../../../exams/${classId}/${exam}`}>
               <button class="exam-done view-btn">Xem</button>
            </Link>
         </>
      );
   }
   if (isDone && isLock) {
      status = "Lock";

      console.log(status);

      return <button class="inf-btn exam-lock">Đã khóa</button>;
   }
   return (
      <>
         <Link to={`../../../exam/${exam}`} state={{ classId }} relative="path">
            <button class="view-btn" style={{ backgroundColor: "#161f89" }}>
               Làm
            </button>
         </Link>
      </>
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
   return (
      <ul
         className="flex-center table__content--item"
         style={{
            display: "grid",
            gridTemplateColumns: "8% 14% 18% 20% 20% 10% 5% 5%",
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
            {/* <h3>{vietNamFomatter.format(new Date(timeStart))}</h3> */}
            <h3>{timeStart}</h3>
         </li>

         <li className="flex-center column-text">
            {/* <h3>{vietNamFomatter.format(new Date(timeEnd))}</h3> */}
            <h3>{timeEnd}</h3>
         </li>

         <li className="flex-center column-text">
            <h3>{time}</h3>
         </li>

         <li className="flex-center column-text">
            <ExamButton
               classId={classId}
               exam={exam}
               isDone={isDone}
               isLock={isLock}
            />
         </li>
      </ul>
   );
}

export default ExamItem;
export { ExamButton };
