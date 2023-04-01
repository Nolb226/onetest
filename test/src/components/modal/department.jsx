import "../../css/grid.css";
async function setDepartments() {
   try {
      const resonse = await fetch("http://localhost:8080/departments/", {});

      if (!resonse.ok) throw new Error("Failed to get department from server!");

      const departments = await resonse.json();

      console.log(departments);
   } catch (error) {
      console.log(error);
   }
}

function Options() {
   setDepartments();

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
            <option>Ngành</option>
         </select>
         <span className="form-message"></span>
      </div>
   );
}

export default Options;
