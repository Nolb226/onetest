import "./admin.css";
import { Outlet } from "react-router";

function Admin() {
   return (
      <div id="admin-layout" className="position-relative">
         <Outlet />
      </div>
   );
}

export default Admin;
