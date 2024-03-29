function Student(prop) {
   function check() {
      if (prop.student.studentresults.length < prop.numberOfTest) {
         for (
            let index = 0;
            index < prop.numberOfTest - prop.student.studentresults.length;
            index++
         ) {
            prop.student.studentresults.push({ grade: "Không có trên data" });
         }
      }
   }

   check();

   return (
      <ul className="row no-gutters flex-center table__content--item">
         <li className="col l-1 m-1">
            <h3>{prop.index + 1}</h3>
         </li>

         <li className="col l-2 m-2">
            <h3>{prop.student.id}</h3>
         </li>

         <li className="col l-3 m-3">
            <h3>{prop.student.fullname}</h3>
         </li>

         {prop.student.studentresults.map((grade, index) => {
            if (index < prop.numberOfTest) {
               return (
                  <li className="col l-3 m-3">
                     <h3>{grade.grade}</h3>
                  </li>
               );
            }
         })}
      </ul>
   );
}

export default Student;
