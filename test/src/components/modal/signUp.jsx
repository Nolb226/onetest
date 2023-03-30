import "./modal.css";
import { useState, useEffect } from "react";
import validator from "./validator.js";

function Options() {
  return <option>Công nghệ thông tin</option>;
}

function StudentSignUp() {
  validator("#form-register");

  return (
    <div id="student-sign-up">
      <div className="form-group">
        <input
          rules="require"
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Nhập họ và tên sinh viên"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div
        className="row flex-center flex-direction-row"
        style={{ width: "100%", height: "auto", margin: "0" }}
      >
        <div className="l-5 m-5 form-group position-relative">
          <input
            rules="require"
            id="date-of-birth"
            name="date-of-birth"
            type="date"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <div className="l-7 m-7 form-group position-relative">
          <select
            id="majors"
            name="majors"
            type="select"
            className="form-control"
          >
            <Options />
          </select>
          <span className="form-message"></span>
        </div>
      </div>

      <div className="form-group">
        <input
          rules="require|min:10|max:10"
          id="personalID"
          name="personalID"
          type="text"
          placeholder="Nhập mã sinh viên"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group position-relative">
        <input
          rules="require|min:8"
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group position-relative">
        <input
          rules="require"
          id="password-confirm"
          name="password-confirm"
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>
    </div>
  );
}

function TeacherSignUp() {
  validator("#form-register");

  return (
    <div id="teacher-sign-up">
      <div className="form-group">
        <input
          rules="require"
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Nhập họ và tên giảng viên"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div
        className="row flex-center flex-direction-row"
        style={{ width: "100%", height: "auto", margin: "0" }}
      >
        <div className="l-5 m-5 form-group position-relative">
          <input
            rules="require"
            id="date-of-birth"
            name="date-of-birth"
            type="date"
            className="form-control"
          />
          <span className="form-message"></span>
        </div>

        <div className="l-7 m-7 form-group position-relative">
          <select
            id="departments"
            name="departments"
            type="select"
            className="form-control"
          >
            <Options />
          </select>
          <span className="form-message"></span>
        </div>
      </div>

      <div className="form-group">
        <input
          rules="require|min:10|max:10"
          id="personalID"
          name="personalID"
          type="text"
          placeholder="Nhập mã cán bộ"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group position-relative">
        <input
          rules="require|min:8"
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>

      <div className="form-group position-relative">
        <input
          rules="require"
          id="password-confirm"
          name="password-confirm"
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="form-control"
        />
        <span className="form-message"></span>
      </div>
    </div>
  );
}

function TypeAccount({ setType }) {
  return (
    <div className="typeAccount flex-center position-absolute">
      <div
        className="student flex-center flex-direction-col"
        onClick={() => {
          setType.handleSetType("student");
        }}
      >
        <i className="fa-solid fa-user-graduate"></i>
        <span>Sinh viên</span>
      </div>

      <div
        className="teacher flex-center flex-direction-col"
        onClick={() => {
          setType.handleSetType("teacher");
        }}
      >
        <i className="fa-solid fa-user-tie"></i>
        <span>Giảng viên</span>
      </div>
    </div>
  );
}

function SignUpModal({ toggle1, toggle2 }) {
  const [type, setType] = useState("true");

  function handleSetType(string) {
    setType(string);
  }

  useEffect(() => {
    validator("#form-register");
  }, [type]);
  return (
    <div
      className="modal-layer flex-center"
      onClick={() => {
        toggle2.handleSignUp();
      }}
    >
      <div
        className="sign-up--modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form action="" method="POST" id="form-register">
          <div className="modal__header position-relative">
            <div className="modal__content flex-center flex-direction-col">
              <h3 className="modal--heading">Đăng ký</h3>
              <span className="modal--subheading">
                Nhập đầy đủ thông tin và tạo tài khoản miễn phí!
              </span>
            </div>
            <div className="tool-box flex-center position-absolute">
              <div
                className="modal__back--btn"
                onClick={() => {
                  setType("true");
                }}
              >
                <i className="fa-solid fa-angle-left"></i>
              </div>
              <div
                className="modal__close--btn"
                onClick={() => {
                  toggle2.handleSignUp();
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>

          <div
            id="modal__body"
            className="modal__body flex-center flex-direction-col position-relative"
          >
            {type == "true" && <TypeAccount setType={{ handleSetType }} />}
            {type == "student" && <StudentSignUp />}

            {type == "teacher" && <TeacherSignUp />}

            <div className="flex-center form-group accept">
              <input id="accept-input" name="accept" type="radio" />
              <span>
                Tôi đồng ý với<a href="#">&nbsp;điều khoản sử dụng</a>
                &nbsp;và<a href="#">&nbsp;chính sách bảo mật</a>
                &nbsp;của Best Of Test
              </span>
              {document
                .querySelectorAll(".accept > span  a")
                .forEach((item) => {
                  item.onClick = (event) => {
                    console.log(item);
                    alert(
                      "Chính sách bảo mật và điều khoản sử dụng đang được cập nhật!"
                    );
                    event.preventDefault();
                  };
                })}
            </div>

            <button
              className="form-submit"
              onClick={() => {
                toggle2.handleSignUp();
              }}
            >
              Đăng ký
            </button>

            <div className="have-account">
              <span>Bạn đã có tài khoản? </span>
              <span
                className="click-to-sign-in"
                onClick={() => {
                  toggle2.handleSignUp();
                  toggle1.handleSignIn();
                }}
              >
                Đăng nhập ngay
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
