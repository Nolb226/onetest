
import Info from "../Info";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ExamItem from "./ExamItem";

function StudentPage() {
  const [exams, setExams] = useState([]);

  const params = useParams();
  const { idStudent, nameStudent, classId } = params;

  useEffect(() => {
    fetch(`https://bestoftest.herokuapp.com/classes/${classId}/exams`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTY4MTEwNzg5NywiZXhwIjoxNjgxMzY3MDk3fQ.jVSFbIFs94vr32Xtoak09Ss2pG4V-sWAAVxA20LH5uo",
      },
    })
      .then((response) => response.json())
      .then((examsAPI) => {
        setExams(examsAPI.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* <Info
        personalCode={idStudent}
        nameStudent={nameStudent}
        classId={classId}
        backHref={`/viewclass/${idStudent}/${nameStudent}`}
      /> */}
      <div class="content">
        <div class="empty-space"></div>

        <div class="table-zone grid">
          <header class="table__header">
            <h1 class="table__heading">DANH SÁCH BÀI THI</h1>

            <div class="filter-box">
              <div class="custom-select">
                <span class="selected-option">
                  Tất cả
                  <i class="fa-solid fa-chevron-down"></i>
                </span>
                <ul class="custom-select__option-list">
                  <li class="option checked flex-center">Tất cả</li>
                  <li class="option flex-center">Đã làm</li>
                  <li class="option flex-center">Chưa làm</li>
                </ul>
              </div>
            </div>
          </header>

          <div class="grid table__content">
            <ul class="row no-gutters flex-center table__content--heading">
              <li class="col l-2">
                <h3>Mã đề</h3>
              </li>

              <li class="col l-2">
                <h3>Tên đề</h3>
              </li>

              <li class="col l-2">
                <h3>Môn</h3>
              </li>

              <li class="col l-2">
                <h3>Thời gian làm bài</h3>
              </li>

              <li class="col l-2">
                <h3>Số câu hỏi</h3>
              </li>

              <li class="col l-5-1"></li>
            </ul>

            <div
              class="table__content--list"
              style={{ overflowY: "auto", height: 400 }}
            >
              {exams.map((item) => (
                <ExamItem
                  idExam={item.id}
                  nameExam={item.name}
                  subject={item.name}
                  timeStart={item.timeStart}
                  totalQuestions={item.totalQuestions}
                  idStudent={idStudent}
                  nameStudent={nameStudent}
                  classId={classId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentPage;
