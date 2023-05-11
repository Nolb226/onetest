import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "../style.css";
import Test from "./component-testpage/Test";
import ViewClass from "./component-joinclasspage/ViewClass";
import JoinClass from "./component-joinclasspage/JoinClass";
import StudentPage from "./component-studentpage/StudentPage";
import Result from "./component-testpage/Result";

import { useParams } from "react-router-dom";
import { Outlet, useOutlet, useOutletContext } from "react-router";

function Student({ idStudent, nameStudent }) {
   const { type, id, name } = useParams();
   const { permissions } = useOutletContext();
   console.log(permissions);
   return (
      <>
         <Outlet context={{ permissions }} />
      </>
   );
}

export default Student;
