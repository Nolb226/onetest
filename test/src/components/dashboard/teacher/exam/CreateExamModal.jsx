import { useEffect } from "react";

import validator from "../../../home/modal/validator.js";
import Handicraft from "./Handicraft.jsx";
import SelectFromBank from "./SelectFromBank.jsx";

export default function CreateExamModal({ type, selectedClass }) {
   console.log(selectedClass);
   useEffect(() => {
      let formElement = document.querySelector("form");
      // validator("#" + formElement.id);
   }, [type]);

   return (
      <>
         {type === "seclectFromBank" && (
            <SelectFromBank selectedClass={selectedClass} />
         )}
         {type === "handicraft" && <Handicraft selectedClass={selectedClass} />}
      </>
   );
}
