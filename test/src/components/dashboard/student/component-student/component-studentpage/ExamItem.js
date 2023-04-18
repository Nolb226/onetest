

import { Link } from "react-router-dom";

function ExamItem({
  idExam,
  nameExam,
  subject,
  timeStart,
  totalQuestions,
  idStudent,
  nameStudent,
  classId,
}) {
  return (
    <ul class="row no-gutters flex-center table__content--item">
      <li class="col l-2">
        <h3>{idExam}</h3>
      </li>

      <li class="col l-2">
        <h3>{nameExam}</h3>
      </li>

      <li class="col l-2">
        <h3>{subject}</h3>
      </li>

      <li class="col l-2">
        <h3>{timeStart}</h3>
      </li>

      <li class="col l-2">
        <h3>{totalQuestions}</h3>
      </li>

      <li class="col l-5-1">
        <Link to={`../test/${classId}/${idExam}`}>
          <button class="inf-btn take-test">Làm bài</button>
        </Link>
      </li>
    </ul>
  );
}

export default ExamItem;
