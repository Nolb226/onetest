import { Link } from "react-router-dom";
import "../../image/class-icon.png";

function SideMenu() {
   const teacherAccount = [
      {
         idPemission: 1,
         path: "/dashboard/manage-exam",
         icon: "../../image/exam-icon.png",
      },

      {
         idPemission: 2,
         path: "/dashboard/manage-class",
         icon: "../../image/class-icon.png",
      },

      {
         idPemission: 3,
         path: "/dashboard/statistics",
         icon: "../../image/dashboard-icon.png",
      },
      {
         idPemission: 3,
         path: "/dashboard/admin",
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
         path: "/dashboard/viewclass",
         icon: "../../image/exam-icon.png",
      },

      {
         idPemission: 5,
         path: "/dashboard/joinclass",
         icon: "../../image/class-icon.png",
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
                        <img src={item.icon} alt="" />
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
