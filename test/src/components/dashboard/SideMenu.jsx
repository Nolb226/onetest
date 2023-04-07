import { Routes, Route, Link } from "react-router-dom";
import "../../image/class-icon.png";

function SideMenu() {
   return (
      <div id="left-menu" className="position-relative col l-1">
         <ul className="menu-list flex-center flex-direction-col">
            <Link to="/dashboard/manage-exam">
               <li className="menu-item flex-center">
                  <img src="../../image/exam-icon.png" alt="" />
               </li>
            </Link>

            <Link to="/dashboard/dashboard">
               <li className="menu-item flex-center">
                  <img src="../../image/class-icon.png" alt="" />
               </li>
            </Link>

            <li className="menu-item flex-center">
               <img src="../../image/dashboard-icon.png" alt="" />
            </li>
         </ul>

         <div className="themes flex-center position-absolute">
            <i className="menu-icon fa-solid fa-circle-half-stroke"></i>
            <ul className="themes-list"></ul>
         </div>
      </div>
   );
}

export default SideMenu;
