import { useState, useEffect } from "react";
import api from "../../../config/config";
// import Department from "./department";
// import Majors from "./major";

function StudentSelect() {
   const [departments, setDepartments] = useState([]);
   const [majors, setMajors] = useState([]);
   const [majorAPI, setMajorAPI] = useState("");

   useEffect(() => {
      fetch(majorAPI, {})
         .then((response) => response.json())
         .then((data) => {
            setMajors(data.data);
         })
         .catch((error) => console.log(error));
   }, [majorAPI]);

   function Major(majors) {
      return (
         <div
            className="form-group position-relative"
            style={{ width: "auto" }}
         >
            <label htmlFor="majors" className="form-label">
               Ngành
            </label>
            <select
               id="majors"
               rules="require"
               name="majors"
               type="select"
               className="form-control"
            >
               <option value="null">Ngành</option>
               {majors.map((major) => (
                  <option value={major.id} key={major.id}>
                     {major.name}
                  </option>
               ))}
            </select>
            <span className="form-message"></span>
         </div>
      );
   }

   function Department() {
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
         <div
            className="form-group position-relative"
            style={{ width: "auto" }}
         >
            <label htmlFor="department" className="form-label">
               Khoa
            </label>
            <select
               id="department"
               rules="require"
               name="department"
               type="select"
               className="form-control"
               onChange={(event) => {
                  setMajorAPI(
                     `${api}/departments/${event.target.value}/majors`
                  );
               }}
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

   return (
      <div
         style={{
            width: "100%",
            height: "auto",
            margin: "0",
            width: "100%",
            height: "auto",
            margin: "0",
            display: "grid",
            gridTemplateColumns: "49.5% 49.5%",
            gap: "1%",
         }}
      >
         {Department()}
         {Major(majors)}
      </div>
   );
}

export default StudentSelect;
