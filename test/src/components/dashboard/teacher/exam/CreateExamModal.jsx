import { useEffect } from "react";
import "./styleExam.css";
import validator from "../../../home/modal/validator.js";
import Handicraft from "./Handicraft.jsx";
import SelectFromBank from "./SelectFromBank.jsx";

export default function CreateExamModal({ type, setType }) {
   useEffect(() => {
      let formElement = document.querySelector("form");
      validator("#" + formElement.id);
   }, [type]);

   document.querySelector(".return").addEventListener("click", () => {
      setType("");
   });

   return (
      <>
         {type === "seclectFromBank" && <SelectFromBank />}
         {type === "handicraft" && <Handicraft />}
      </>
   );
}
