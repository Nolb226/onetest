

import Info from "../Info";

import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../../../../config/config";

function JoinClass() {
  const params = useParams();
  const { idStudent, nameStudent } = params;

  const [undefinedClass, setUndefinedClass] = useState(false);
  const [findClass, setFindClass] = useState(false);
  const [inputFindClass, setInputFindClass] = useState("");
  const [inputJoinClass, setInputJoinClass] = useState("");
  const [falsePass, setFalsePass] = useState(false);
  const [resultClass, setResultClass] = useState([]);

  const handlefindClass = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (inputFindClass !== "") {
      fetch(`${api}/classes/${inputFindClass}`, {
        headers: {
          Authorization:
            "Bearer "+ currentUser,
        },
      })
        .then((response) => response.json())
        .then((classesAPI) => {
          if (classesAPI.data !== undefined) {
            setResultClass(classesAPI.data);
            setFindClass(!findClass);
          } else {
            setUndefinedClass(!undefinedClass);
            setInputFindClass('')
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleJoinClass = () => {
    const currentUser = localStorage.getItem('currentUser');
    fetch(
      `${api}/classes/${inputFindClass}/students`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + currentUser,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: inputJoinClass }),
      }
    ).then(response => {
      if (response.ok) {
        setFindClass(false);
        setUndefinedClass(false);
      } else {
        setFalsePass(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });
    
  };

  return (
    <>
      {/* <Info personalCode={idStudent} nameStudent={nameStudent} /> */}
      <div className="content flex-center">
        {undefinedClass || findClass || (
          <div className="joinclass-container find-class">
            <div className="joinclass-search joinclass-container-child flex-center">
              <label>Mã lớp:</label>
              <input
                type="text"
                className="joinclass-input"
                onChange={(e) => setInputFindClass(e.target.value)}
              />
            </div>
            <div className="joinclass-submit joinclass-container-child flex-center">
              <button className="joinclass-button" onClick={handlefindClass}>
                Tìm lớp
              </button>
            </div>
          </div>
        )}

        {undefinedClass && (
          <div className="joinclass-container find-class">
            <div className="joinclass-back">
              <p
                onClick={() => {
                  setUndefinedClass(!undefinedClass);
                }}
                style={{ cursor: "pointer" }}
              >
                &lt;&lt; Quay lại
              </p>
            </div>
            <div className="joinclass-undefine">
              <div className="line flex-center" style={{ width: "100%" }}>
                Không tìm thấy lớp!
              </div>
              <div className="line flex-center" style={{ width: "100%" }}>
                Vui lòng kiểm tra lại mã lớp
              </div>
            </div>
          </div>
        )}

        {findClass && (
          <div className="joinclass-container enter-class">
            <div className="joinclass-back">
              <p
                onClick={() => {
                  setFindClass(!findClass);
                }}
                style={{ cursor: "pointer" }}
              >
                &lt;&lt; Quay lại
              </p>
            </div>
            <div className="enter-class-child">
              <div className="enter-class-child-title">Môn: </div>
              <div className="enter-class-child-content">
                {resultClass.lecture.name}
              </div>
            </div>
            <div className="enter-class-child">
              <div className="enter-class-child-title">Mã môn học: </div>
              <div className="enter-class-child-content">
                {resultClass.lecture.id}
              </div>
            </div>
            <div className="enter-class-child">
              <div className="enter-class-child-title">Giảng viên: </div>
              <div className="enter-class-child-content">
                {resultClass.teacher.fullname}
              </div>
            </div>
            <div className="enter-class-child">
              <div className="enter-class-child-title">Nhóm môn học: </div>
              <div className="enter-class-child-content">
                {resultClass.id.split("-")[1].padStart(2, "0")}
              </div>
            </div>
            <div className="enter-class-child">
              <div className="enter-class-child-title">Mật khẩu: </div>
              <div className="enter-class-child-content">
                <input
                  type="text"
                  className="enter-password"
                  placeholder="Nhập mật khẩu lớp"
                  onChange={(e) => {
                    setInputJoinClass(e.target.value);
                  }}
                  style={
                    falsePass
                      ? { borderColor: "#FF0404" }
                      : { borderColor: "none" }
                  }
                />
                <p
                  style={{
                    lineHeight: "10px",
                    height: "10px",
                    fontSize: "10px",
                    color: "#FF0404",
                  }}
                >
                  {falsePass && "*Mật khẩu không chính xác"}
                </p>
              </div>
            </div>
            <div className="joinclass-enter-btn flex-center">
              <button className="joinclass-button" onClick={handleJoinClass}>
                Tham gia
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default JoinClass;
