import { memo } from "react";
import { Link } from "react-router-dom";

function ClassItem({ id, nameClass, semester, total }) {
   return (
      <ul
         className="flex-center table__content--item"
         style={{
            display: "grid",
            gridTemplateColumns: "30% 30% 10% 10% 20%",
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
            <h3>{semester}</h3>
         </li>
         <li className="flex-center column-text">
            <h3>{total}</h3>
         </li>
         <button className="view-btn">Xem</button>
      </ul>
   );
}

export default memo(ClassItem);
