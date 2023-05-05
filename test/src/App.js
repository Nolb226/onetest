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

function App() {
   const currentUser = localStorage.getItem("currentUser");
   console.log(currentUser);
   {
      /* <Route path="*" element={<Home />}></Route> */
   }

   // socket.connect();

   const [Components, setComponents] = useState([]);

   // const Components = [
   // 	{
   // 		classes: ViewClass,
   // 		path: 'classes',
   // 		childrens: [
   // 			{
   // 				// index: true,
   // 				join: JoinClass,
   // 				path: 'join',
   // 			},
   // 		],
   // 	},
   // 	{
   // 		exams: StudentPage,
   // 		path: 'exams',
   // 	},
   // ];

   useEffect(() => {}, []);

   const test = "classes";
   console.log(Components);
   return (
      <div id="app" className="position-relative">
         <Routes></Routes>
         {/* <Routes>
				{!currentUser ? (
					<>
						<Route exact path="/" element={<Home />} />
						<Route path="*" element={<Navigate to="/" />} />
					</>
				) : (
					<Route exact path="/" element={<Dashboard />}>
						(
						<Route path="student" element={<Student />}>
							<Route path="" element={<Navigate to="class" replace={true} />} />
							<Route path="class">
								<Route index element={<ViewClass />} />
								<Route path="join" element={<JoinClass />} />
								<Route path=":classId" element={<ClassStudentView />}>
									{/* <Route path="" element={<Navigate to="details" />} /> }
									<Route index element={<Detail />} />
									<Route path="exams" element={<StudentPage />} />
								</Route>
							</Route>

							<Route path="exam/" element={<Test />} />
							<Route path="result/" element={<Result />} />
							{/* <Route path="*" element={<Student />} /> }
						</Route>
						): (
						<Route path="teacher" element={<Teacher />}>
							<Route path="" element={<Navigate to="class" replace={true} />} />
							<Route path="class" element={<Class />}>
								<Route path="" element={<Classes />} />
								<Route path=":classId" element={<Classlist />} />
								<Route path=":classId/edit" element={<Repass />} />
								<Route path="create" element={<CreateClass />} />
							</Route>
							<Route path="exam" element={<Exam />}>
								<Route path="" element={<ExamList />} />
								<Route path="create" element={<ClassList />} />
							</Route>
							{/* <Route path="class/:classId/student/:studentId/edit" element={<Student />} /> }
						</Route>
						)
					</Route>
				)}
			</Routes> */}

         {/* <Home /> */}
         <Routes>
            {!currentUser ? (
               <>
                  <Route exact path="/" element={<Home />} />
                  <Route path="*" element={<Navigate to="/" />} />
               </>
            ) : (
               <Route exact path="/" element={<Dashboard />}>
                  {/* {Components.map((component) => {
							const Test = component[test];
							if (component.childrens) {
								return (
									<Route path={component.path} element={<Test />}>
										{component.childrens.map((child) => {
											console.log(child);
											const ChildTest = child['join'];
											return (
												<Route
													key={child.path}
													path={child.path}
													element={<ChildTest />}
												/>
											);
										})}
									</Route>
								);
							}
							return <Route path={component.path} element={<Test />} />;
						})} */}
                  <Route path="student" element={<Student />}>
                     <Route
                        path=""
                        element={<Navigate to="class" replace={true} />}
                     />
                     <Route path="class">
                        <Route index element={<ViewClass />} />
                        <Route path="join" element={<JoinClass />} />
                        <Route path=":classId" element={<ClassStudentView />}>
                           {
                              <Route
                                 path=""
                                 element={<Navigate to="details" />}
                              />
                           }
                           <Route path="exams" element={<StudentPage />} />
                           <Route index element={<Detail />} />
                        </Route>
                     </Route>

                     <Route path="exam/:examId" element={<Test />} />
                     <Route path="result/" element={<Result />} />
                     {<Route path="*" element={<Student />} />}
                  </Route>
                  <Route path="teacher" element={<Teacher />}>
                     <Route
                        path=""
                        element={<Navigate to="class" replace={true} />}
                     />
                     <Route path="class" element={<Class />}>
                        <Route path="" element={<Classes />} />
                        <Route path=":classId" element={<Classlist />} />
                        <Route path=":classId/edit" element={<Repass />} />
                        <Route path="create" element={<CreateClass />} />
                     </Route>

                     <Route path="exam" element={<Exam />}>
                        <Route path="" element={<ExamList />} />
                        <Route path="create" element={<ClassList />} />
                        <Route
                           path="classId/detailExam"
                           element={<ExamDetail />}
                        />
                     </Route>
                     {
                        <Route
                           path="class/:classId/student/:studentId/edit"
                           element={<Student />}
                        />
                     }

                     <Route path="statistics" element={<Statistics />}></Route>

                     <Route path="bank" element={<Bank />}>
                        {/* <Route path="" element={<Bank />} /> */}
                        <Route
                           path="addQuestion"
                           element={<AddNewQuestion />}
                        />
                     </Route>
                  </Route>

                  <Route path="admin" element={<Admin />}>
                     <Route path="manage-account" element={<ManageAccount />}>
                        {/* <Route path="" element={<Classes />} /> */}
                     </Route>

                     <Route path="permission" element={<Permission />}>
                        {/* <Route path="" element={<Classes />} /> */}
                     </Route>
                  </Route>
               </Route>
            )}
         </Routes>
      </div>
   );
}

export default App;
