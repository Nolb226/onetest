import { Navigate, Outlet, Route, Routes } from "react-router-dom";

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
import Test from "./components/dashboard/student/component-student/component-testpage/Test";
import Result from "./components/dashboard/student/component-student/component-testpage/Result";
import Class from "./components/dashboard/teacher/Class/Class";
import Classes from "./components/dashboard/teacher/Class/Classes";
import Classlist from "./components/dashboard/teacher/Class/ClassList";
import Repass from "./components/dashboard/teacher/Class/Repass";
import Exam from "./components/dashboard/teacher/exam/Exam";
import ClassList from "./components/dashboard/teacher/exam/ClassList";
import ExamList from "./components/dashboard/teacher/exam/ExamList";
import CreateClass from "./components/dashboard/teacher/Class/CreateClass";
import Detail from "./components/dashboard/teacher/Class/Detail";
import ClassStudentView from "./components/pages/Class";
import Statistics from "./components/dashboard/teacher/statistic/Statistics";
import Admin from "./components/dashboard/admin/Admin";
import ManageAccount from "./components/dashboard/admin/ManageAccount";
import Permission from "./components/dashboard/admin/Permission";
import ExamDetail from "./components/dashboard/teacher/exam/ExamDetail";
import Bank from "./components/dashboard/teacher/bank/Bank";
import AddNewQuestion from "./components/dashboard/teacher/bank/AddNewQuestion";
import Assignment from "./components/dashboard/admin/Assignment";
import StatisticClasses from "./components/dashboard/teacher/statistic/StatisticClasses";
import DetailStatistic from "./components/dashboard/teacher/statistic/DetailStatistic";
import StatisticExamList from "./components/dashboard/teacher/statistic/ExamList";
import { useEffect, useState } from "react";
import socket from "./util/socket";
import Error404 from "./components/pages/Error404";

function App() {
   const currentUser = localStorage.getItem("currentUser");
   console.log(currentUser);
   {
      /* <Route path="*" element={<Home />}></Route> */
   }
   const [permissions, setPermissions] = useState([]);
   useEffect(() => {
      socket.connect();

      socket.on("connect", () => {
         socket.emit("join");
      });
      socket.on("user:check-permissions", (permissions) => {
         setPermissions(permissions);
      });
      socket.on("permissions:updated", (permissions) => {
         setPermissions(permissions);
      });
      return () => {
         socket.off("user:check-permissions");
         socket.off("permissions:updated");
         socket.disconnect();
      };
   }, []);

   return (
      <div id="app" className="position-relative">
         <Routes>
            {!currentUser ? (
               <>
                  <Route exact path="/" element={<Home />} />
                  <Route path="*" element={<Navigate to="/" />} />
               </>
            ) : (
               <>
                  <Route
                     exact
                     path="/"
                     element={<Dashboard permissions={permissions} />}
                  >
                     {permissions.map((permission) => {
                        if (permission.id === 5) {
                           return (
                              <Route path="student" element={<Student />}>
                                 <Route
                                    path=""
                                    element={
                                       <Navigate to="class" replace={true} />
                                    }
                                 />
                                 <Route path="class">
                                    <Route index element={<ViewClass />} />
                                    <Route
                                       path="join"
                                       element={<JoinClass />}
                                    />
                                    <Route
                                       path=":classId/exams"
                                       element={<StudentPage />}
                                    ></Route>
                                 </Route>
                                 <Route
                                    path="exam/:examId"
                                    element={<Test />}
                                 />
                                 <Route
                                    path="result/:examId"
                                    element={<Result />}
                                 />
                                 {<Route path="*" element={<Student />} />}
                              </Route>
                           );
                        }
                     })}

                     <Route path="teacher" element={<Teacher />}>
                        {permissions.map((permission) => {
                           if (permission.id === 8) {
                              return (
                                 <>
                                    <Route
                                       path=""
                                       element={
                                          <Navigate to="class" replace={true} />
                                       }
                                    />
                                    <Route path="class" element={<Class />}>
                                       <Route path="" element={<Classes />} />
                                       <Route
                                          path=":classId"
                                          element={<Classlist />}
                                       />
                                       <Route
                                          path=":classId/edit"
                                          element={<Repass />}
                                       />
                                       <Route
                                          path="create"
                                          element={<CreateClass />}
                                       />
                                    </Route>
                                 </>
                              );
                           }
                           return null;
                        })}

                        {permissions.map((permission) => {
                           if (permission.id === 1) {
                              return (
                                 <>
                                    <Route
                                       path=""
                                       element={
                                          <Navigate to="exam" replace={true} />
                                       }
                                    />
                                    <Route path="exam" element={<Exam />}>
                                       <Route path="" element={<ExamList />} />
                                       <Route
                                          path="create"
                                          element={<ClassList />}
                                       />
                                       <Route
                                          path=":examId/detailExam"
                                          element={<ExamDetail />}
                                       />
                                    </Route>
                                 </>
                              );
                           }
                        })}

                        {/* {
								<Route
									path="class/:classId/student/:studentId/edit"
									element={<Student />}
								/>
							} */}

                        {permissions.map((permission) => {
                           if (permission.id === 12) {
                              return (
                                 <>
                                    {/* <Route path="statistics" element={<Statistics />}></Route> */}
                                    <Route
                                       path="statistics"
                                       element={<Statistics />}
                                    >
                                       <Route
                                          path=""
                                          element={
                                             <Navigate
                                                to={"classList"}
                                                replace={true}
                                             />
                                          }
                                       />
                                       <Route
                                          path="classList"
                                          element={<StatisticClasses />}
                                       />

                                       <Route
                                          path="classList/:classId/detail-statistic"
                                          element={<DetailStatistic />}
                                       />
                                       <Route
                                          path="examList"
                                          element={<StatisticExamList />}
                                       />
                                       <Route
                                          path="examList/:classId/:examId/detail-statistic"
                                          element={<DetailStatistic />}
                                       />
                                    </Route>

                                    <Route
                                       path="bank"
                                       element={<Bank />}
                                    ></Route>
                                    <Route
                                       path="addQuestion"
                                       element={<AddNewQuestion />}
                                    />
                                 </>
                              );
                           }
                        })}
                     </Route>

                     <Route path="admin" element={<Admin />}>
                        {permissions.map((permission) => {
                           if (permission.id === 16) {
                              return (
                                 <>
                                    <Route
                                       path=""
                                       element={
                                          <Navigate
                                             to="manage-account"
                                             replace={true}
                                          />
                                       }
                                    />
                                    <Route
                                       path="manage-account"
                                       element={<ManageAccount />}
                                    ></Route>
                                 </>
                              );
                           }
                        })}
                        {permissions.map((permission) => {
                           if (permission.id === 19) {
                              return (
                                 <>
                                    <Route
                                       path=""
                                       element={
                                          <Navigate
                                             to="permission"
                                             replace={true}
                                          />
                                       }
                                    />
                                    <Route
                                       path="permission"
                                       element={<Permission />}
                                    >
                                       {/* <Route path="" element={<Classes />} /> */}
                                    </Route>
                                 </>
                              );
                           }
                        })}
                        <Route path="assignment" element={<Assignment />}>
                           {/* <Route path="" element={<Classes />} /> */}
                        </Route>
                     </Route>
                  </Route>
                  <Route path="*" element={<Error404 />} />
               </>
            )}
         </Routes>
      </div>
   );
}

export default App;
