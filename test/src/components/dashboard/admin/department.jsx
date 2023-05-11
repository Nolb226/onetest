import { useState, useEffect } from "react";
import api from "../../../config/config";
function Department(prop) {
   const [departments, setDepartments] = useState([]);
   useEffect(() => {
      fetch(`${api}/departments/`, {})
         .then((response) => response.json())
         .then((data) => {
            setDepartments(data.data);
         })
         .catch((error) => console.log(error));
   }, []);
   console.log(prop.departmentId);
   return (
        <>
         <select
            id="department"
            name="department_id"
            type="select"
            style={{width: "60%",padding:"1px 2px"}}
            onChange={(e) => prop.handleAccount(e)}
         >
            <option value="NULL" >Khoa</option>
            {departments.map((department) => {
               return (
                  <option value={department.id} key={department.id}  selected={department.id == prop.departmentId}>
                     {department.name}
                  </option>
               );
            })}
         </select>
     </>
   );
}

export default Department;
