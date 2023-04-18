import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import './App.css';
import './css/reset.css';
import './css/grid.css';
import './css/base.css';
import './fonts/fontawesome-free-6.1.2-web/css/all.min.css';

import Home from './components/pages/home';
import Dashboard from './components/pages/dashboard';
import Student from './components/dashboard/student/component-student/Student';
import Teacher from './components/dashboard/teacher/Teacher';
import ViewClass from './components/dashboard/student/component-student/component-joinclasspage/ViewClass';
import JoinClass from './components/dashboard/student/component-student/component-joinclasspage/JoinClass';
import StudentPage from './components/dashboard/student/component-student/component-studentpage/StudentPage';
import Test from './components/dashboard/student/component-student/component-testpage/Test';
import Result from './components/dashboard/student/component-student/component-testpage/Result';
import Class from './components/dashboard/teacher/Class/Class';
import Classes from './components/dashboard/teacher/Class/Classes';
import Classlist from './components/dashboard/teacher/Class/ClassList';
import Repass from './components/dashboard/teacher/Class/Repass';

function App() {
	return (
		<div id="app" className="position-relative">
			<Routes>
				<Route exact path="/" element={<Home />}></Route>
				<Route path="*" element={<Home />}></Route>
				<Route exact path="/dashboard" element={<Dashboard />}>
					<Route path="student" element={<Student />}>
						{/* <Route path="./dashboard/student" element={<Navigate to="/viewclass" replace relative="path"/>}/> */}
						{/* student/classes/ */}
						<Route path="viewclass" element={<ViewClass />} />
						<Route path="studentpage/:classId" element={<StudentPage />} />
						<Route path="joinclass" element={<JoinClass />} />
						<Route path="test/:classId/:examId" element={<Test />} />
						<Route path="result/:examId" element={<Result />} />
						<Route path="*" element={<Student />} />
					</Route>
					<Route path="teacher" element={<Teacher />}>
						<Route path="" element={<Navigate to="class" replace={true} />} />
						<Route path="class" element={<Classes />} />
						<Route path="class/:classId" element={<Classlist />} />
						<Route path="class/:classId/edit" element={<Repass />} />
						{/* <Route path="class/:classId/student/:studentId/edit" element={<Student />} /> */}
					</Route>
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
