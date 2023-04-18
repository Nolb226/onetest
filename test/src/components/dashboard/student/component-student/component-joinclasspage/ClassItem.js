import { memo } from "react";
import { Link } from "react-router-dom";

function ClassItem({ id, nameClass, semester, total, idStudent, nameStudent }) {
   return (
      <ul className="row no-gutters flex-center table__content--item">
         <li className="col l-5-4">
            <h3>{id}</h3>
         </li>

         <li className="col l-5-4">
            <h3>{nameClass}</h3>
         </li>

         <li className="col l-5-4">
            <h3>{semester}</h3>
         </li>

         <li className="col l-5-4">
            <h3>{total}</h3>
         </li>

         <li className="col l-5-1">
            <Link
               to={`/dashboard/studentpage/${idStudent}/${nameStudent}/${id}`}
            >
               <button className="view-class">Xem lớp</button>
            </Link>
         </li>
      </ul>
   );
}

export default memo(ClassItem);
