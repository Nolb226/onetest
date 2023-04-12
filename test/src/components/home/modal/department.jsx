// import { useEffect, useState } from "react";
// // import "../../css/grid.css";
// import Majors from "./major";

function Department({ test }) {
   console.log(test);
   // useEffect(() => {
   //    fetch("http://localhost:8080/departments/", {})
   //       .then((response) => response.json())
   //       .then((data) => {
   //          setDepartments(data.data);
   //          console.log("departments");
   //       })
   //       .catch((error) => console.log(error));
   // }, []);

   return (
      <div className="form-group position-relative" style={{ width: "auto" }}>
         <label htmlFor="department" className="form-label">
            Khoa
         </label>
         <select
            id="department"
            name="department"
            type="select"
            className="form-control"
            onChange={(event) => {
               // setMajorAPI(
               //    `http://localhost:8080/departments/${event.target.value}/majors`
               // );
            }}
         >
            <option value="null">Khoa</option>
            {/* {departments.map((department) => {
               return (
                  <option value={department.id} key={department.id}>
                     {department.name}
                  </option>
               );
            })} */}
         </select>
         <span className="form-message"></span>
      </div>
   );
}

export default Department;
