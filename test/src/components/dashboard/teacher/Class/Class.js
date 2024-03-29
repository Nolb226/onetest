import Classes from "./Classes";
import { useState } from "react";
import Repass from "./Repass";
import ClassList from "./ClassList";
import CreateClass from "./CreateClass";
import "./styleClass.css";

function Class() {
   const [classesPage, setClassesPage] = useState(true);
   const [repassPage, setRepassPage] = useState(false);
   const [classListPage, setClassListPage] = useState(false);
   const [createClassPage, setCreateClassPage] = useState(false);
   const [isClass, setIsClass] = useState({});

   const handleRePass = (Class) => {
      setRepassPage(!repassPage);
      setClassesPage(!classesPage);
      setIsClass(Class);
      console.log(1);
   };

   const handleClassList = (Class) => {
      setClassesPage(!classesPage);
      setClassListPage(!classListPage);
      setIsClass(Class);
   };

   const handleCreateClass = () => {
      setClassesPage(!classesPage);
      setCreateClassPage(!createClassPage);
   };

   return (
      <>
         {repassPage && <Repass isClass={isClass} />}
         {classesPage && (
            <Classes
               handleRePass={handleRePass}
               handleClassList={handleClassList}
               handleCreateClass={handleCreateClass}
            />
         )}
         {classListPage && <ClassList isClass={isClass} />}
         {createClassPage && <CreateClass />}
      </>
   );
}

export default Class;
