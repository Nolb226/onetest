import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../image/class-icon.png";
import { useEffect } from "react";

const IconComponent = ({ icon }) => {
   const iconClass = icon;
   return (
      <>
         <i className={iconClass}></i>
      </>
   );
};

function SideMenu({ info }) {
   const navigator = useNavigate();
   const { pathname } = useLocation();

   useEffect(() => {
      console.log(pathname.includes("exam"));
   }, [pathname]);

   const teacherAccount = [
      {
         idPemission: 1,
         path: `../exam`,
         icon: "menu-icon fa-solid fa-file-lines",
         name: "Quản lí thi",
      },

      {
         idPemission: 2,
         path: `../class`,
         icon: "menu-icon fa-solid fa-chalkboard-user",
         name: "Quản lí lớp",
      },

      {
         idPemission: 3,
         path: `/statistics`,
         icon: "menu-icon fa-solid fa-chart-simple",
         name: "Thống kê",
      },
   ];

   const studentAccount = [
      {
         idPemission: 4,
         path: `student/viewclass/`,
         icon: "menu-icon fa-solid fa-file-pen",
         name: "Bài thi",
      },

      {
         idPemission: 5,
         path: `student/joinclass`,
         icon: "menu-icon fa-solid fa-plus",
         name: "Lớp học",
      },
   ];

   const adminAccount = [
      {
         idPemission: 6,
         path: `admin/manage-account`,
         icon: "menu-icon fa-solid fa-user-gear",
         name: "Người dùng",
      },
      {
         idPemission: 7,
         path: `admin/permission`,
         icon: "menu-icon fa-solid fa-gear",
         name: "Phân quyền",
      },
   ];

   const testAccount = [
      {
         idPemission: 1,
         path: `../exam`,
         icon: "../../image/exam-icon.png",
      },

      {
         idPemission: 2,
         path: `../class`,
         icon: "../../image/class-icon.png",
      },

      {
         idPemission: 3,
         path: `/statistics`,
         icon: "../../image/dashboard-icon.png",
      },
      {
         idPemission: 4,
         path: `student/viewclass/`,
         icon: "menu-icon fa-solid fa-file-pen",
      },

      {
         idPemission: 5,
         path: `student/joinclass`,
         icon: "menu-icon fa-solid fa-plus",
      },
      {
         idPemission: 6,
         path: `admin/manage-account`,
         icon: "menu-icon fa-solid fa-user-gear",
      },
      {
         idPemission: 7,
         path: `admin/permission`,
         icon: "menu-icon fa-solid fa-gear",
      },
   ];

   function activeButton(e) {
      let buttons = document.querySelectorAll(".menu-item");
      buttons.forEach((button) => {
         if (button.classList.contains("active"))
            button.classList.remove("active");
      });
      e.target.closest(".menu-item").classList.add("active");
   }

   return (
      <div id="left-menu" className="position-relative flex-center">
         <div className="left-menu__logo flex-center">
            <img src="../../image/logo-menu-header.svg" alt="" />
         </div>
         <div className="menu-list flex-center flex-direction-col">
            <ul>
               <h1>Học sinh</h1>
               {studentAccount.map((item) => {
                  return (
                     <li
                        className="menu-item flex-center"
                        onClick={(e) => {
                           navigator(`./`);
                           activeButton(e);
                        }}
                        key={item.idPemission}
                     >
                        <IconComponent icon={item.icon} />
                        <span className="menu-item__name">{item.name}</span>
                     </li>
                  );
               })}
            </ul>

            <ul style={{ width: "100%" }}>
               <h1>Quản lý</h1>
               {teacherAccount.map((item) => {
                  return (
                     <li
                        className="menu-item flex-center"
                        onClick={(e) => {
                           navigator(`./`);
                           activeButton(e);
                        }}
                        key={item.idPemission}
                     >
                        <IconComponent icon={item.icon} />
                        <span className="menu-item__name">{item.name}</span>
                     </li>
                  );
               })}
            </ul>

            <ul style={{ width: "100%" }}>
               <h1>Quản trị</h1>
               {adminAccount.map((item) => {
                  return (
                     <li
                        className="menu-item flex-center"
                        onClick={(e) => {
                           navigator(`./`);
                           activeButton(e);
                        }}
                        key={item.idPemission}
                     >
                        <IconComponent icon={item.icon} />
                        <span className="menu-item__name">{item.name}</span>
                     </li>
                  );
               })}
            </ul>
         </div>

         {/* <div className="themes flex-center position-absolute">
            <i className="menu-icon fa-solid fa-circle-half-stroke"></i>
            <ul className="themes-list"></ul>
         </div> */}
      </div>
   );
}

export default SideMenu;
