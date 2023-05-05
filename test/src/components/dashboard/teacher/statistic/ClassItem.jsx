import { Link } from "react-router-dom";

function ClassItem(Class) {
   return (
      <ul
         class="flex-center table__content--item"
         style={{
            display: "grid",
            gridTemplateColumns: "12% 22% 30% 7% 17% 12%",
         }}
      >
         <li class="flex-center column-text class-id">
            <h3>{Class.Class.id}</h3>
         </li>

         <li class="flex-center column-text">
            <h3>{Class.Class.name}</h3>
         </li>

         <li class="flex-center column-text">
            <h3>{Class.Class.lecture_name}</h3>
         </li>
         <li class="flex-center column-text">{Class.Class.totals}</li>

         <li className="flex-center column-text">
            <button className="view-btn">
               <Link
                  to={`./${Class.Class.id}`}
                  relative="path"
                  style={{ color: "#fff" }}
               >
                  Xem
               </Link>
            </button>
         </li>

         <li class="flex-center column-text">
            <button className="view-btn" style={{ backgroundColor: "#b30b00" }}>
               Xem
            </button>
         </li>
      </ul>
   );
}

export default ClassItem;
