function ClassItem(Class) {
   const isLock = Class.Class.isLock
      ? "list_btn list_btn_lock"
      : "list_btn list_btn_unlock";
   // console.log(isLock);
   // console.log(Class);

   return (
      <ul className="row no-gutters flex-center table__content--item">
         <li className="col l-6-4">
            <h3>{Class.Class.id}</h3>
         </li>

         <li className="col l-6-4">
            <h3>{Class.Class.name}</h3>
         </li>

         <li className="col l-6-4">
            <h3>{Class.Class.lecture.name}</h3>
         </li>

         <li className="col l-6-4">
            <button
               className="list_btn list_btn_class"
               onClick={() => Class.handleClassList(Class.Class)}
            >
               Xem Danh Sách
            </button>
         </li>

         <li className="col l-6-2">
            <button
               className={isLock}
               onClick={() => Class.handleLock(Class.Class)}
            >
               <i className="fa-solid fa-lock"></i>
            </button>
         </li>

         <li className="col l-6-2">
            <button
               className="list_btn list_btn_edit "
               onClick={() => Class.handleRePass(Class.Class)}
            >
               <i className="fa-solid fa-pen-to-square"></i>
            </button>
         </li>
      </ul>
   );
}

export default ClassItem;
