import React, { useEffect, useState } from "react";
import api from "../../../../config/config";

function StudentEdit(prop) {
  const [student, setStudent] = useState({});
  const [newStudent, setNewStudent] = useState(student);
  useEffect(() => {
    const currentUser = localStorage.getItem(`currentUser`);
    fetch(`${api}/accounts/${prop.studentId}/edit`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + currentUser,
      },
    })
      .then((res) => res.json())
      .then((info) => {
        console.log(info.data);
        setStudent({
          ...info.data,
          fullName: info.data.lastName + " " + info.data.firstName,
        });
        setNewStudent({
          ...info.data,
          fullName: info.data.lastName + " " + info.data.firstName,
        });
      });
  }, []);

  const handleSaveStudent = () => {
    const currentUser = localStorage.getItem(`currentUser`);
    if (window.confirm("Bạn có muốn lưu không")) {
      prop.setIsOpenModal(!prop.isOpenModal);
      prop.handleStudentList(student.id, newStudent);

      fetch(`${api}/accounts/${student.account_id}/edit`, {
        method: "PUT",
        body: JSON.stringify({
          ...newStudent,
        }),
        headers: {
          Authorization: "Bearer " + currentUser,
          "Content-type": "application/json",
        },
      })
        .then(() => {})
        .catch((err) => {
          console.log(err);
          // alert('Thất bại')
        });
    }
  };

  const handleDeleteStudent = () => {
    const currentUser = localStorage.getItem(`currentUser`);
    if (window.confirm("Bạn có muốn xóa không")) {
      prop.setIsOpenModal(!prop.isOpenModal);
      prop.handleStudentListDelete(student.id);

      fetch(`${api}/classes/${prop.classId}/students/${student.account_id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + currentUser,
          "Content-type": "application/json",
        },
      })
        .then(() => {})
        .catch((err) => {
          console.log(err);
          // alert('Thất bại')
        });
    }
  };

  const handleChangeId = (value) => {
    let lastName = "";
    for (let index = 0; index < value.split(" ").length - 1; index++) {
      if (index == value.split(" ").length - 2) {
        lastName += value.split(" ")[index];
      } else {
        lastName += value.split(" ")[index] + " ";
      }
    }
    setNewStudent({
      ...newStudent,
      id: value,
    });
  };
  const handleChangeName = (value) => {
    setNewStudent({
      ...newStudent,
      fullName: value,
      firstName: value.split(" ").at(-1),
    });
  };

  const handleChangeDOB = (value) => {
    console.log(value);
    setNewStudent({
      ...newStudent,
      dob: value,
    });
  };

  return (
    <div
      class="flex-center class-edit-student"
      onClick={() => prop.setIsOpenModal(!prop.isOpenModal)}
    >
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
          class="class-editpass-model class-editpass-header student-delete-form"
          onClick={(e) => e.stopPropagation()}
        >
          <div class="studen-info-inp ">
            <label for="" class="class-create-label">
              Mã sinh viên:
            </label>
            <input
              type="text"
              name=""
              id=""
              class="class-editpass-input"
              disabled
              value={newStudent?.account_id}
              onChange={(e) => handleChangeId(e.target.value)}
            />
          </div>

          <div class="studen-info-inp">
            <label for="" class="class-create-label">
              Họ và tên:
            </label>
            <input
              type="text"
              name=""
              id=""
              class="class-editpass-input"
              value={newStudent?.fullName}
              onChange={(e) => handleChangeName(e.target.value)}
            />
          </div>

          <div class="studen-info-inp">
            <label for="" class="class-create-label">
              Ngày sinh:
            </label>
            <input
              type="date"
              name=""
              id=""
              class="class-editpass-input"
              value={newStudent?.dob}
              onChange={(e) => handleChangeDOB(e.target.value)}
            />
          </div>

          <div class="flex-center" style={{ gridColumn: "1/-1" }}>
            <button
              class="list_btn student-update-btn"
              onClick={() => handleSaveStudent()}
            >
              Lưu
            </button>
            <button
              class="list_btn student-delete-btn"
              onClick={() => handleDeleteStudent()}
            >
              Xóa <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentEdit;
