// import Info from "../Info";
import api from "../../../../../config/config.js";
import ClassItem from "./ClassItem";
import { useEffect, useRef, useState } from "react";
import Empty from "../Empty";
import { useParams } from "react-router-dom";

function ViewClass() {
  const [classes, setClasses] = useState([]);

  const params = useParams();
  const { idStudent, nameStudent } = params;

  let isEmpty = useRef(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    fetch(`${api}/classes`, {
      headers: {
        Authorization:
          "Bearer " + currentUser,
      },
    })
      .then((response) => response.json())
      .then((classesAPI) => {
        setClasses(classesAPI.data.data);
        console.log(classesAPI.data.data);
        isEmpty.current = false;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div class="flex-center search-bar">
        <input type="text" class="search-input" placeholder="Nhập mã lớp" />
        <button class="flex-center join-button">
          <i class="menu-icon fa-solid fa-plus"></i>
          <span>Tìm kiếm</span>
        </button>
      </div>
      <div className="table-zone grid">
        <h1 className="table__heading">LỚP ĐÃ THAM GIA</h1>

        <div className="grid table__content">
          <ul className="row no-gutters flex-center table__content--heading">
            <li className="col l-5-4">
              <h3>Mã lớp</h3>
            </li>

            <li className="col l-5-4">
              <h3>Tên lớp</h3>
            </li>

            <li className="col l-5-4">
              <h3>Học kỳ</h3>
            </li>

            <li className="col l-5-4">
              <h3>Sĩ số</h3>
            </li>

            <li className="col l-5-1"></li>
          </ul>
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
      </div>
    </>
  );
}

export default ViewClass;
