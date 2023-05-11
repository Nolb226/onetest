// import { Routes, Route } from "react-router-dom";

import './css/style.css';
import './css/responsive.css';
import Exam from './exam/Exam.jsx';
import Statistics from './statistic/Statistics.jsx';
import React, { Suspense } from 'react';
import {
	Outlet,
	Route,
	Routes,
	useOutletContext,
	useParams,
} from 'react-router-dom';
import Class from './Class/Class';

function Teacher() {
	const { permissions } = useOutletContext();

	return (
		<>
			<Outlet context={{ permissions }} />
		</>
	);
}

export default Teacher;
