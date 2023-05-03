import { Link } from "react-router-dom";

function ClassItem(Class) {
   // const isLock = Class.Class.isLock ? "list_btn list_btn_lock":"list_btn list_btn_unlock"
   // console.log(isLock);
   // console.log(Class);

   return (
      <ul
         class="flex-center table__content--item"
         style={{
            display: "grid",
            gridTemplateColumns: "16% 23% 37% 10% 7% 7%",
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
            <button
               className={`${
                  Class.Class.isLock
                     ? "list_btn list_btn_lock"
                     : "list_btn list_btn_unlock"
               }`}
               onClick={() => Class.handleLock(Class.Class)}
            >
               <i
                  class={`fa-solid fa-${Class.Class.isLock ? "" : "un"}lock`}
               ></i>
            </button>
         </li>

         <li class="flex-center column-text">
            <Link to={`${Class.Class.id}/edit`} relative="path">
               <button
                  class="list_btn list_btn_edit "
                  // onClick={() => Class.handleRePass(Class.Class)}
               >
                  <i class="fa-solid fa-pen-to-square"></i>
               </button>
            </Link>
         </li>
      </ul>
   );
}

export default ClassItem;
