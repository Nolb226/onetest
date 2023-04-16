
import api from "../../config/config.js";
import { useEffect, useState } from "react";
import SideMenu from "../dashboard/SideMenu";
import Student from "../dashboard/student/component-student/Student";
import Teacher from "../dashboard/teacher/Teacher";
import Admin from "../dashboard/admin/Admin.jsx";
import "./dashboard.css";
import { Outlet } from "react-router";
import logo from '../../image/logo-no-background.png'

function Dashboard() {

   const [info, setInfo] = useState([])

   useEffect(() => {
      const currentUser = localStorage.getItem('currentUser');
      fetch(`${api}/accounts`, {
        headers: {
          Authorization:
            "Bearer " + currentUser,
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
      <div id="main-layout" className="grid wide">
         <div className="row no-gutters layout--body">
            <SideMenu info={info} />

            <div id="dashboard-container" className="col l-11">
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

                           <li className="nav__item flex-center">
                              <i className="nav__icon fa-regular fa-bell"></i>
                           </li>

                           <li className="nav__item flex-center">
                              <i className="nav__icon fa-regular fa-user"></i>
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
                     >
                        {"<<"} Quay lại
                     </div>
                     <div className="code inf-children">
                        Mã cá nhân: {info.id || ''}
                     </div>
                     <div className="name inf-children">
                        Họ và tên: {info.fullname || ''}
                     </div>
                  </div>
               </div>

               <div className="content">
<<<<<<< HEAD
                  <Teacher />
                  <Student />
                  <Admin />
=======
                  <Outlet/>
                  {/* <Teacher /> */}
                  {/* <Student idStudent={info.id} nameStudent={info.fullname} /> */}
>>>>>>> aedafabaed266d482eb1b63a2788c4aa2042117f
               </div>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
