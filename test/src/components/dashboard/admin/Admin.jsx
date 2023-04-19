import "./admin.css";
import { Outlet } from "react-router";

function Admin() {
   return (
      <div id="admin-layout">
         <Outlet />
      </div>
   );
}

export default Admin;
