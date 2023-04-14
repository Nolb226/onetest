import { useEffect, useState } from "react";

function Majors(data) {
   console.log(data);

   const [majors, setMajors] = useState(Object.values(data));

   majors.forEach((major) => {
      console.log(major);
   });

   return (
      <div className="form-group position-relative" style={{ width: "auto" }}>
         <label htmlFor="majors" className="form-label">
            Ngành
         </label>
         <select
            id="majors"
            name="majors"
            type="select"
            className="form-control"
         >
            <option value="null">Ngành</option>
            {majors.length &&
               majors.map((major) => (
                  <option value={major.id} key={major.id}>
                     {major.name}
                  </option>
               ))}
         </select>
         <span className="form-message"></span>
      </div>
   );
}

export default Majors;
