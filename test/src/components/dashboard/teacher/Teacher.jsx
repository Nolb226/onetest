// import { Routes, Route } from "react-router-dom";

import "./css/style.css";
import "./css/responsive.css";
import React from "react";
import { Outlet } from "react-router-dom";

function Teacher() {

   return (
      <>
         <Outlet />
      </>
   );
}

export default Teacher;
