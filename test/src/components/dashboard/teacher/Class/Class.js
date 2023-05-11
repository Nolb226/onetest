import Classes from './Classes';
import { useState } from 'react';
import Repass from './Repass';
import ClassList from './ClassList';
import CreateClass from './CreateClass';
import './styleClass.css';
import { Outlet, useOutletContext } from 'react-router';
import './reponsive.css';

function Class() {
	const [classesPage, setClassesPage] = useState(true);
	const [repassPage, setRepassPage] = useState(false);
	const [classListPage, setClassListPage] = useState(false);
	const [createClassPage, setCreateClassPage] = useState(false);
	const [isClass, setIsClass] = useState({});

	const { permissions } = useOutletContext();

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
			{/* {repassPage && <Repass isClass={isClass} handleRePass = {handleRePass} />}
         {classesPage && (
            <Classes
               handleRePass={handleRePass}
               handleClassList={handleClassList}
               handleCreateClass={handleCreateClass}
            />
         )}
         {classListPage && <ClassList isClass={isClass} handleClassList = {handleClassList} />}
         {createClassPage && <CreateClass handleCreateClass = {handleCreateClass} />} */}
			<Outlet context={{ permissions }} />
		</>
	);
}

export default Class;
