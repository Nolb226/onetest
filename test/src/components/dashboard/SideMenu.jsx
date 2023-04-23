import { Link } from "react-router-dom";
import "../../image/class-icon.png";

const IconComponent = ({ icon }) => {
   const iconClass = icon;
   return (
      <>
         <i className={iconClass}></i>
      </>
   );
};

function SideMenu({ info }) {
   const teacherAccount = [
      {
         idPemission: 1,
         path: `teacher/manage-exam/${info.id}/${info.fullname}`,
         icon: "../../image/exam-icon.png",
      },

      {
         idPemission: 2,
         path: `teacher/manage-class/${info.id}/${info.fullname}`,
         icon: "../../image/class-icon.png",
      },

      {
         idPemission: 3,
         path: `teacher/statistics/${info.id}/${info.fullname}`,
         icon: "../../image/dashboard-icon.png",
      },
      // {
      //    idPemission: 6,
      //    path: "/dashboard/statistics",
      //    icon: "../../image/dashboard-icon.png",
      // },
   ];

   const studentAccount = [
      {
         idPemission: 4,
         path: `student/viewclass`,
         icon: "menu-icon fa-solid fa-file-pen",
      },

      {
         idPemission: 5,
         path: `student/joinclass`,
         icon: "menu-icon fa-solid fa-plus",
      },
   ];

   const adminAccount = [
      {
         idPemission: 7,
         path: `admin/permission/${info.id}/${info.fullname}`,
         icon: "menu-icon fa-solid fa-plus",
      },
      {
         idPemission: 6,
         path: `admin/manage-account/${info.id}/${info.fullname}`,
         icon: "menu-icon fa-solid fa-file-pen",
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
      <div id="left-menu" className="position-relative col l-1">
         <ul className="menu-list flex-center flex-direction-col">
            {teacherAccount.map((item) => {
               return (
                  <Link to={item.path} key={item.idPemission}>
                     <li
                        className="menu-item flex-center"
                        onClick={(e) => {
                           activeButton(e);
                        }}
                        key={item.idPemission}
                     >
                        <IconComponent icon={item.icon} />
                     </li>
                  </Link>
               );
            })}
         </ul>

         <div className="themes flex-center position-absolute">
            <i className="menu-icon fa-solid fa-circle-half-stroke"></i>
            <ul className="themes-list"></ul>
         </div>
      </div>
   );
}

export default SideMenu;
