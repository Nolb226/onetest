import { memo } from "react";
import { Link } from "react-router-dom";

function ClassItem({ teacherName, id, nameClass, semester, total }) {
   return (
      <ul
         className="flex-center table__content--item"
         style={{
            display: "grid",
            gridTemplateColumns: "17% 32% 28% 8% 5% 10%",
         }}
      >
         <li className="flex-center column-text">
            <h3>
               <h3>{id}</h3>
            </h3>
         </li>
         <li className="flex-center column-text">
            <h3>{nameClass}</h3>
         </li>
         <li className="flex-center column-text">
            <span>{teacherName}</span>
         </li>
         <li className="flex-center column-text">
            <h3>{semester}</h3>
         </li>
         <li className="flex-center column-text">
            <h3>{total}</h3>
         </li>
         <li className="flex-center column-text">
            <Link to={`${id}/exams`} relative="path">
               <button className="view-btn">Xem</button>
            </Link>
         </li>
      </ul>
   );
}

export default memo(ClassItem);
