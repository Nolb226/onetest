import { useState, useEffect } from "react";
import api from "../../../config/config";
function PermissionGroup(prop) {
   const [permissions, setPermissions] = useState([]);
   useEffect(() => {
      fetch(`${api}/admin/permissions`)
         .then((response) => response.json())
         .then((data) => {
            setPermissions(data.data);
         })
         .catch((error) => console.log(error));
   }, []);
//    console.log(prop.departmentId);
   return (
        <>
         <select
            id="permission"
            name="type"
            type="select"
            style={{width: "60%",padding:"1px 2px"}}
            onChange={(e) => prop.handleAccount(e)}
         >
            <option value="NULL"> Loại</option>
            {permissions.map((permission) => {
               return (
                  <option value={permission.id} key={permission.id}  selected={permission.id == prop.permissionId}>
                     {permission.name}
                  </option>
               );
            })}
         </select>
     </>
   );
}

export default PermissionGroup;
