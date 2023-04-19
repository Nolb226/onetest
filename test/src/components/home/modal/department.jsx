import { useState, useEffect } from "react";
import api from "../../../config/config";
function Department() {
   const [departments, setDepartments] = useState([]);
   useEffect(() => {
      fetch(`${api}/departments/`, {})
         .then((response) => response.json())
         .then((data) => {
            setDepartments(data.data);
            console.log("departments");
         })
         .catch((error) => console.log(error));
   }, []);

   return (
      <div className="form-group position-relative" style={{ width: "auto" }}>
         <label htmlFor="department" className="form-label">
            Khoa
         </label>
         <select
            id="department"
            rules="require"
            name="department"
            type="select"
            className="form-control"
            
         >
            <option value="null">Khoa</option>
            {departments.map((department) => {
               return (
                  <option value={department.id} key={department.id}>
                     {department.name}
                  </option>
               );
            })}
         </select>
         <span className="form-message"></span>
      </div>
   );
}

export default Department;
