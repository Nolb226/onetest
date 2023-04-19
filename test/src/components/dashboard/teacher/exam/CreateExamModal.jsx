import { useEffect } from "react";
import "./styleExam.css";
import validator from "../../../home/modal/validator.js";
import Handicraft from "./Handicraft.jsx";
import SelectFromBank from "./SelectFromBank.jsx";

export default function CreateExamModal({ type, setType }) {
   useEffect(() => {
      validator("#form--create-exam");
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
