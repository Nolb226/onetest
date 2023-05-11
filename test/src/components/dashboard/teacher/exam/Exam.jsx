// import "./style.css";
// import "./responsive.css";
import React, { useEffect, useState } from 'react';
import CreateExamModal from './CreateExamModal';
import api from '../../../../config/config.js';
import { Outlet, useOutletContext } from 'react-router';

function Exam() {
	const [examList, setExamList] = useState(true);
	const [classList, setClassList] = useState(false);
	const [createMethod, setCreateMethod] = useState(false);
	const [typeMethod, setTypeMethod] = useState('');

	const { permissions } = useOutletContext();

	const returnBtn = document.querySelector('.return');
	const currentUser = localStorage.getItem('currentUser');

	return (
		<>
			{/* {examList && (
            <ExamList setExamList={setExamList} setClassList={setClassList} />
         )}
         {classList && <ClassList />}

         {createMethod && <CreateMethod />}
         {typeMethod !== "" && (
            <CreateExamModal type={typeMethod} setType={setTypeMethod} />
         )} */}
			<Outlet context={{ permissions }} />
		</>
	);
}

export default Exam;
