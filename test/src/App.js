import { Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import "./css/reset.css";
import "./css/grid.css";
import "./css/base.css";
import "./fonts/fontawesome-free-6.1.2-web/css/all.min.css";

import Home from "./components/pages/home";
import Dashboard from "./components/pages/dashboard";
import Student from "./components/dashboard/student/component-student/Student";
import Teacher from "./components/dashboard/teacher/Teacher";
import ViewClass from "./components/dashboard/student/component-student/component-joinclasspage/ViewClass";
import JoinClass from "./components/dashboard/student/component-student/component-joinclasspage/JoinClass";
import StudentPage from "./components/dashboard/student/component-student/component-studentpage/StudentPage";

function App() {
   return (
      <div id="app" className="position-relative">
         <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="*" element={<Home />}></Route>
            <Route exact path="/dashboard" element={<Dashboard />}>
                  <Route path="student" element={<Student/>}>
                     <Route path="viewclass/:idStudent/:nameStudent" element={<ViewClass/>}/>
                     <Route path="joinclass/:idStudent/:nameStudent" element={<JoinClass/>}/>
                     <Route path="studentpage/:idStudent/:nameStudent/:classId" element={<StudentPage/>}/>
                     
                     <Route path="*" element={<Student/>}/>

                  </Route>
                  <Route path="teacher" element={<Teacher/>}/>


            </Route>
            {/* <Route path="/dashboard/:type" element={<Dashboard />}></Route> */}
            {/* <Route exact path="/student" element={<Student />}></Route> */}
            {/* <Route path="/dashboard/:type" element={<Dashboard />}></Route> */}
         </Routes>
         {/* <Home /> */}
      </div>
   );
}

export default App;
