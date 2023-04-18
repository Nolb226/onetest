import React, { useEffect, useState } from "react";
import api from "../../../../config/config";

function StudentEdit(prop) {
  const [student, setStudent] = useState({});
  const [newStudent, setNewStudent] = useState(student)
  useEffect(() => {
    const currentUser = localStorage.getItem(`currentUser`);
    fetch(`${api}/students/${prop.studentId}/edit`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + currentUser,
      },
    })
      .then((res) => res.json())
      .then((info) => {
        console.log(info.data);
        setStudent(info.data);
        setNewStudent(info.data)
      });
  }, []);

  const handleSaveStudent = () =>{
    const currentUser = localStorage.getItem(`currentUser`);
    if(window.confirm("Bạn có muốn lưu không")){
        prop.setIsOpenModal(!prop.isOpenModal)
        prop.handleStudentList(student.id,newStudent)

        fetch(`${api}/students/${student.id}`, {
          method: "PUT",
          body: JSON.stringify({
            ...newStudent
          }),
          headers: {
            Authorization: "Bearer " + currentUser,
            "Content-type": "application/json",
          },
        })
        .then(() => {
        })
        .catch((err)=>{
            console.log(err)
            // alert('Thất bại')
        })
    }
  }

  const handleDeleteStudent = () => {
    const currentUser = localStorage.getItem(`currentUser`);
    if(window.confirm("Bạn có muốn xóa không")){
        prop.setIsOpenModal(!prop.isOpenModal)
        prop.handleStudentListDelete(student.id)

        fetch(`${api}/classes/${prop.classId}/students/${student.id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + currentUser,
            "Content-type": "application/json",
          },
        })
        .then(() => {
        })
        .catch((err)=>{
            console.log(err)
            // alert('Thất bại')
        })
    }
  }

  const handleChangeId = (value)=> {
        setNewStudent({
            ...newStudent,
            id:value
        })
  }
  const handleChangeName = (value)=> {
    setNewStudent({
        ...newStudent,
        fullname:value,
    })
  }

  const handleChangeDOB = (value)=> {
    console.log(value);
    setNewStudent({
        ...newStudent,
        dob:value
    })
  }

  return (
    
    <div
      class="flex-center class-edit-student"
      onClick={() => prop.setIsOpenModal(!prop.isOpenModal)}
    >
      <div>
        <form onSubmit={(e)=>e.preventDefault()}
          class="class-editpass-model class-editpass-header student-delete-form"
          onClick={(e) => e.stopPropagation()}
        >
          <div class="studen-info-inp ">
            <label for="" class="class-create-label">
              Mã sinh viên:
            </label>
            <input type="text" name="" id="" class="class-editpass-input" disabled value={newStudent?.id}  onChange={(e)=> handleChangeId(e.target.value)}/>
          </div>

          <div class="studen-info-inp">
            <label for="" class="class-create-label">
              Họ và tên:
            </label>
            <input type="text" name="" id="" class="class-editpass-input" value={newStudent?.fullname} onChange={(e)=> handleChangeName(e.target.value)} />
          </div>

          <div class="studen-info-inp">
            <label for="" class="class-create-label">
              Ngày sinh:
            </label>
            <input type="date" name="" id="" class="class-editpass-input" value={newStudent.dob} onChange={(e)=> handleChangeDOB(e.target.value)} />
          </div>

          <div class="flex-center" style={{ gridColumn: "1/-1" }}>
            <button class="list_btn student-update-btn" onClick={() => handleSaveStudent()}>Lưu</button>
            <button class="list_btn student-delete-btn" onClick={() => handleDeleteStudent()}>
              Xóa <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentEdit;
