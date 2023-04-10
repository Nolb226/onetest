// import { Routes, Route } from "react-router-dom";

import "./css/style.css";
import "./css/responsive.css";
import Exam from "./exam/Exam.jsx";
import Statistics from "./Statistics.jsx";
import React from "react";
import { useParams } from "react-router-dom";

function Teacher() {
   const { type } = useParams();

   return (
      <div className="table-zone grid">
         {/* <Route path="/dashboard" element={<Dashboard />}></Route>
            {/* <Route path="/dashboard/class" element={}></Route> 
            <Route path="/exam" element={<Exam />}></Route>
            <h2>Whale</h2> */}
         {type === "manage-exam" && <Exam />}
         {type === "statistics" && <Statistics />}
      </div>
   );
}

export default Teacher;
