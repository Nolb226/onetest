import ClassItem from "./ClassItem";
import { useState, useEffect } from "react";

function Classes(prop) {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch("https://bestoftest.herokuapp.com/classes", {
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
    
    const list = classes.map((classroom)=> {
        if(Class.id === classroom.id) {
            return {...classroom, isLock:!classroom.isLock}
        }
        return classroom
    })
    // console.log(Class);
    setClasses(list);
    // console.log(list);
  }

  const handleLock = (Class) => {
    // console.log(Class.isLock);
    // console.log(Class.id);
    fetch(`https://bestoftest.herokuapp.com/classes/${Class.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isLock: !Class.isLock,
      }),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMDQ3ODg3LCJleHAiOjE2ODEzMDcwODd9.Y9dXoVfvWEFEPoVQHn9wKJAjH1Hfz6AiOCpSjGqtuxU",
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
    //   .then((json) => console.log(json.data));

    update(Class);
  };

  return (
    <>
      <div class="flex-center search-bar">
        <input type="text" class="search-input" placeholder="Nhập mã lớp" />
        <button class="flex-center join-button" onClick={prop.handleCreateClass}>
          <i class="menu-icon fa-solid fa-plus"></i>
          <span>Tạo lớp mới</span>
        </button>
      </div>
      <div class="table-zone grid">
        <h1 class="table__heading">DANH SÁCH NHÓM LỚP</h1>

        <div class="grid table__content">
          <ul class="row no-gutters flex-center table__content--heading">
            <li class="col l-6-4">
              <h3>Mã Lớp</h3>
            </li>

            <li class="col l-6-4">
              <h3>Tên Lớp</h3>
            </li>

            <li class="col l-6-4">
              <h3>Môn</h3>
            </li>

            <li class="col l-6-4">
              <h3>Danh sách sinh viên</h3>
            </li>

            <li class="col l-6-2">
              <h3>Khóa Lớp</h3>
            </li>

            <li class="col l-6-2">
              <h3>Chỉnh sửa</h3>
            </li>
          </ul>

          <div class="table__content--list classes ">
            {classes.length === 0 ? (
             <div className="flex-center" style={{height: "100%"}}><h1 class = "noClass">Không có lớp</h1></div>  
            ) : (
              classes.map((Class) => {
                return (
                  <ClassItem
                    key={Class.id}
                    Class={Class}
                    handleLock={handleLock}
                    handleRePass = {prop.handleRePass}
                    handleClassList = {prop.handleClassList}
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
