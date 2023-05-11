import { useEffect, useState } from "react";
import api from "../../../config/config";

function Majors(prop) {

   const [majors, setMajors] = useState([]);
   useEffect(() => {
      fetch(`${api}/departments/${prop.departmentId}/majors`)
         .then((response) => response.json())
         .then((data) => {
            setMajors(data.data);
         })
         .catch((error) => console.log(error));
   }, [prop.departmentId]);
   console.log(prop.majorId);
   return (
     <>
         <select
            id="majors"
            name="major_id"
            type="select"
            style={{width: "60%",padding:"1px 2px"}}
            onChange={(e) => prop.handleAccount(e)}
         >
            <option value="NULL" >Ngành</option>
            {majors?.length == 0 ?"" :
               majors?.map((major) => (
                  <option value={major.id} key={major.id} selected={major.id == prop.majorId}>
                     {major.name}
                  </option>
               ))}
         </select>
         <span className="form-message"></span>
      </>
   );
}

export default Majors;