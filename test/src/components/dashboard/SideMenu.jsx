import { Link } from "react-router-dom";
import "../../image/class-icon.png";

function SideMenu() {
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
            <Link to="/dashboard/manage-exam">
               <li
                  className="menu-item flex-center active"
                  onClick={(e) => {
                     activeButton(e);
                  }}
               >
                  <img src="../../image/exam-icon.png" alt="" />
               </li>
            </Link>

            {/* <Link to="/dashboard/manage-exam">
               <li className="menu-item flex-center">
                  <img src="../../image/class-icon.png" alt="" />
               </li>
            </Link> */}

            <Link to="/dashboard/statistics">
               <li
                  className="menu-item flex-center"
                  onClick={(e) => {
                     activeButton(e);
                  }}
               >
                  <img src="../../image/dashboard-icon.png" alt="" />
               </li>
            </Link>
         </ul>

         <div className="themes flex-center position-absolute">
            <i className="menu-icon fa-solid fa-circle-half-stroke"></i>
            <ul className="themes-list"></ul>
         </div>
      </div>
   );
}

export default SideMenu;
