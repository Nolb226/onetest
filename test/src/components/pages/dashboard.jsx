import api from "../../config/config.js";
import { useEffect, useState } from "react";
import SideMenu from "../dashboard/SideMenu";
import Student from "../dashboard/student/component-student/Student";
import Teacher from "../dashboard/teacher/Teacher";
import Admin from "../dashboard/admin/Admin.jsx";
import "./sideMenu.css";
import "../../css/dashboard/dashboard.css";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import logo from "../../image/logo-no-background.png";
import { Link } from "react-router-dom";

const UserMenu = ({ info, setIsOpenProfile, setType }) => {
   const type = info.account.type;
   let viewtype;
   if (type === "GV") {
      viewtype = "Giảng viên";
   }
   if (type === "SV") {
      viewtype = "Sinh viên";
   }
   return (
      <>
         <div className="user-menu" onClick={(e) => e.stopPropagation()}>
            <div className="info-box">
               <p className="info-box__text info-box__text--main  ">
                  {info.fullname}
               </p>
               <p className="info-box__text info-box__text--sub">{viewtype}</p>
            </div>
            <ul className="user-menu__list">
               <li
                  className="list-item"
                  onClick={() => {
                     setType("profile");
                     setIsOpenProfile(true);
                  }}
               >
                  <i class="fa-regular fa-user"></i>

                  <p class="info-box__text">Tài khoản</p>
               </li>
               <li
                  className="list-item"
                  onClick={(e) => {
                     setType("password");
                     setIsOpenProfile(true);
                  }}
               >
                  <i class="fa-solid fa-pen"></i>
                  <p class="info-box__text">Đổi mật khẩu</p>
               </li>
               <li
                  className="list-item logout"
                  onClick={() => {
                     localStorage.removeItem("currentUser");
                     window.location.href = "/";
                     // navigator('/', { replace: true });
                  }}
               >
                  <i class="fa-solid fa-power-off"></i>
                  <p class="info-box__text">Đăng xuất</p>
               </li>
            </ul>
         </div>
      </>
   );
};

const UserModel = ({ setIsOpenProfile, info, type }) => {
   const vietNamFomatter = new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
   });
   const date = new Date("2003", "9", "30");
   console.log(date);
   const isPasswordForm = type === "password";
   return (
      <>
         <div className="overlay" onClick={() => setIsOpenProfile(false)} />
         <form id="profile-form" className="user-form ">
            <header className="user-form__header">
               <div className="header__icon-box">
                  <i class="fa-regular fa-user"></i>
               </div>
               <div className="header__heading-box">
                  <p className="form-header__heading">
                     {/* <input
							type="text"
							disabled
							className=""
							value={'Nguyễn Trương Khánh Hoàng'}
						/> */}
                     {info.fullname}
                  </p>
               </div>
               <div className="header__box">
                  {!isPasswordForm ? (
                     <button className="btn btn-edit-profile">
                        <i class="fa-regular fa-pen-to-square"></i>
                     </button>
                  ) : (
                     <div className="green-dot" title="Online"></div>
                  )}
               </div>
               <div className="cross-btn-box">
                  <button
                     className="btn cross-btn-form"
                     onClick={() => setIsOpenProfile(false)}
                  >
                     <i class="fa-solid fa-xmark"></i>
                  </button>
               </div>
            </header>
            <body className="user-form__body">
               {!isPasswordForm ? (
                  <>
                     <label className="body__row">
                        <span className="row-text">Mã cá nhân:</span>
                        <span className="row-text"> {info.id}</span>
                     </label>
                     <label className="body__row">
                        <span className="row-text">Ngày sinh:</span>
                        <span className="row-text">
                           {vietNamFomatter.format(date)}
                        </span>
                     </label>
                  </>
               ) : (
                  <>
                     <label className="body__row">
                        <span className="row-text">Mật khẩu cũ :</span>
                        <input type="password" />
                     </label>
                     <label className="body__row">
                        <span className="row-text">Mật khẩu mới :</span>
                        <input type="password" />
                     </label>
                  </>
               )}
            </body>
            {isPasswordForm ? (
               <footer className="user-form__footer">
                  <button className="submit-profile">Xác nhận</button>
               </footer>
            ) : (
               ""
            )}
         </form>
      </>
   );
};

const Notification = () => {
   return (
      <>
         <div className="notification-panel">
            <header className="panel__header">
               <h1 className="panel__heading">Thông Báo</h1>
            </header>
            <body className="panel__body">
               <ul className="notification-list">
                  <li className="notification-item">
                     <p>Bạn có 1 bài tập mới từ lớp ABC123</p>
                  </li>
                  <li className="notification-item">
                     <p>Bạn có 1 bài tập mới từ lớp ABC123</p>
                  </li>
                  <li className="notification-item">
                     <p>Bạn có 1 bài tập mới từ lớp ABC123</p>
                  </li>
                  <li className="notification-item">
                     <p>Bạn có 1 bài tập mới từ lớp ABC123</p>
                  </li>
                  <li className="notification-item">
                     <p>Bạn có 1 bài tập mới từ lớp ABC123</p>
                  </li>
                  <li className="notification-item">
                     <p>Bạn có 1 bài tập mới từ lớp ABC123</p>
                  </li>
                  <li className="notification-item">
                     <p>Bạn có 1 bài tập mới từ lớp ABC123</p>
                  </li>
                  <li className="notification-item">
                     <p>Bạn có 1 bài tập mới từ lớp ABC123</p>
                  </li>
               </ul>
            </body>
         </div>
      </>
   );
};

function Dashboard() {
   const [info, setInfo] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const [type, setType] = useState("");
   const [isOpenProfile, setIsOpenProfile] = useState(false);
   const [isOpenNotifications, setIsOpenNotifications] = useState(false);
   useEffect(() => {
      const currentUser = localStorage.getItem("currentUser");
      fetch(`${api}/accounts`, {
         headers: {
            Authorization: "Bearer " + currentUser,
         },
      })
         .then((response) => response.json())
         .then((infoAPI) => {
            setInfo(infoAPI.data);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   return (
      <div
         id="main-layout"
         className="grid wide"
         // onClick={() => setIsOpen(false)}
      >
         <div className="layout--body">
            <SideMenu info={info} />

            <div id="dashboard-container">
               {/* {isConfig && <UserModel />} */}
               <div className="top-bar">
                  <header className="header flex-center position-relative">
                     <div className="header__logo">
                        <img
                           src="/image/BestOfTest.png"
                           alt="Logo Best of Test"
                        />
                     </div>
                     <div className="navigation flex-center">
                        <ul className="nav__list flex-center">
                           <li
                              className="nav__item flex-center"
                              alt="Viet Nam flag"
                              title="Viet Nam"
                           >
                              <img
                                 src=".././image/Flag_of_Vietnam.png"
                                 alt=""
                              />
                           </li>

                           <li
                              className="nav__item flex-center position-relative notify"
                              onClick={() => {
                                 setIsOpenNotifications(!isOpenNotifications);
                                 setIsOpen(false);
                              }}
                           >
                              <i className="nav__icon fa-regular fa-bell"></i>
                              {isOpenNotifications && (
                                 <Notification
                                    setIsOpenProfile={setIsOpenProfile}
                                    setIsOpenNotifications={
                                       setIsOpenNotifications
                                    }
                                 />
                              )}
                           </li>

                           <li
                              className="nav__item flex-center position-relative user-btn"
                              onClick={(e) => {
                                 e.stopPropagation();
                                 setIsOpen(!isOpen);
                                 setIsOpenNotifications(false);
                              }}
                           >
                              <i className="nav__icon fa-regular fa-user"></i>
                              {isOpen && (
                                 <UserMenu
                                    setType={setType}
                                    setIsOpenProfile={setIsOpenProfile}
                                    setIsOpenNotifications={
                                       setIsOpenNotifications
                                    }
                                    isOpenProfile={isOpenProfile}
                                    info={info}
                                 />
                              )}
                           </li>
                        </ul>
                     </div>
                  </header>
                  <div className="information flex-center">
                     <div
                        className="return"
                        style={{
                           color: "#999",
                           fontSize: "1.4rem",
                           fontWeight: "500",
                        }}
                        // onClick={() => navigator('../')}
                     >
                        <Link to={"../"} relative="path">
                           {"<<"} Quay lại
                        </Link>
                     </div>
                     <div className="code inf-children">
                        Mã cá nhân: {info.id || ""}
                     </div>
                     <div className="name inf-children">
                        Họ và tên: {info.fullname || ""}
                     </div>
                  </div>
               </div>

               <div className="content">
                  {isOpenProfile && (
                     <UserModel
                        info={info}
                        type={type}
                        setIsOpenProfile={setIsOpenProfile}
                     />
                  )}
                  <Outlet />
                  {/* <Teacher /> */}
                  {/* <Student idStudent={info.id} nameStudent={info.fullname} /> */}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
