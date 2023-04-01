import "../../css/grid.css";

function Options() {
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
