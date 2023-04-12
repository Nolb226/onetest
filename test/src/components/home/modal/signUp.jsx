import "./modal.css";
// import "../../css/grid.css";
import { useState, useEffect } from "react";
import validator from "./validator.js";
import StudentSelect from "./studentSelect";
import Department from "./department";
// import Majors from "./major";

function StudentSignUp() {
   validator("#form-register");

   return (
      <div id="student-sign-up" className="type" name="SV">
         <div className="form-group">
            <label htmlFor="fullname" className="form-label">
               Họ và tên
            </label>
            <input
               rules="require"
               id="fullname"
               name="fullname"
               type="text"
               placeholder="Nhập họ và tên sinh viên"
               className="form-control"
            />
            <label htmlFor="fullname" className="form-message"></label>
         </div>

         <div
            style={{
               width: "100%",
               height: "auto",
               margin: "0",
               display: "grid",
               gridTemplateColumns: "49.5% 49.5%",
               gap: "1%",
            }}
         >
            <div className="form-group position-relative">
               <label htmlFor="dob" className="form-label">
                  Ngày tháng năm sinh
               </label>
               <input
                  rules="require"
                  id="dob"
                  name="dob"
                  type="date"
                  className="form-control"
               />
               <span className="form-message"></span>
            </div>

            <div className="form-group position-relative">
               <label htmlFor="username" className="form-label">
                  Mã sinh viên
               </label>
               <input
                  rules="require|min:10|max:10"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Nhập mã sinh viên"
                  className="form-control"
               />
               <span className="form-message"></span>
            </div>
         </div>

         <StudentSelect />

         <div className="form-group position-relative">
            <label htmlFor="password" className="form-label">
               Mật khẩu
            </label>
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
            <label htmlFor="password-confirm" className="form-label">
               Xác nhận mật khẩu
            </label>
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
      <div id="teacher-sign-up" className="type" name="GV">
         <div className="form-group">
            <label htmlFor="fullname" className="form-label">
               Họ và tên
            </label>
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
               <label htmlFor="dob" className="form-label">
                  Ngày tháng năm sinh:
               </label>
               <input
                  rules="dateOfBirth"
                  id="dob"
                  name="dob"
                  type="date"
                  className="form-control"
               />
               <span className="form-message"></span>
            </div>

            <Department />
         </div>

         <div className="form-group">
            <label htmlFor="username" className="form-label">
               Mã cán bộ
            </label>
            <input
               rules="require|min:10|max:10"
               id="username"
               name="username"
               type="text"
               placeholder="Nhập mã cán bộ"
               className="form-control"
            />
            <span className="form-message"></span>
         </div>

         <div className="form-group position-relative">
            <label htmlFor="password" className="form-label">
               Mật khẩu
            </label>
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
            <label htmlFor="password-confirm" className="form-label">
               Xác nhận mật khẩu
            </label>
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
               document.querySelector(".modal__footer").style.display = "flex";
               document.querySelector(".modal__back--btn > i").style.display =
                  "block";
            }}
         >
            <i className="fa-solid fa-user-graduate"></i>
            <span>Sinh viên</span>
         </div>

         <div
            className="teacher flex-center flex-direction-col"
            onClick={() => {
               setType.handleSetType("teacher");
               document.querySelector(".modal__footer").style.display = "flex";
               document.querySelector(".modal__back--btn > i").style.display =
                  "block";
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
      <div className="modal-layer flex-center">
         <div className="sign-up--modal">
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
                           document.querySelector(
                              ".modal__footer"
                           ).style.display = "none";
                           document.querySelector(
                              ".modal__back--btn > i"
                           ).style.display = "none";
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
                  {type == "true" && (
                     <TypeAccount setType={{ handleSetType }} />
                  )}
                  {type == "student" && <StudentSignUp />}

                  {type == "teacher" && <TeacherSignUp />}
               </div>
               <div className="modal__footer flex-center flex-direction-col">
                  <div className="flex-center form-group accept">
                     <input id="accept-input" name="accept" type="radio" />
                     <span>
                        Đồng ý với
                        <a href="#">&nbsp;điều khoản sử dụng</a>
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
                        // toggle2.handleSignUp();
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
