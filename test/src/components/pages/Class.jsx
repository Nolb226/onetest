import React, { useEffect, useRef, useState } from 'react';

import { Outlet, useLocation, useOutletContext } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import ExamFilter from '../dashboard/student/component-student/component-studentpage/ExamFilter';

const Menu = () => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('details');

	const [isOpen, setIsOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams({ sort: 'all' });
	// const path = useRef('details');
	useEffect(() => {
		setActive(pathname.split('/')[4]);
	}, [pathname]);
	return (
		<div
			className="menu flex-center"
			style={{ justifyContent: 'space-between' }}
		>
			<ul className="flex ">
				<li className={`menu-list-item ${active === '' && 'active'}`}>
					<Link to={'./'}>Thông tin lớp</Link>
				</li>
				<li className={`menu-list-item ${active === 'exams' && 'active'}`}>
					<Link to={'./exams'}>Bài Thi</Link>
				</li>
			</ul>
			<ExamFilter
				setSearchParams={setSearchParams}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</div>
	);
};

function ClassStudentView() {
	const { permissions } = useOutletContext();
	console.log(permissions);
	return (
		<>
			<Menu />
			<div
				className="table-zone position-relative"
				style={{
					borderRadius: '0 16px 16px 16px',
				}}
			>
				<div
					className=""
					style={{
						height: '100%',
					}}
				>
					<Outlet context={{ permissions }} />
				</div>
			</div>
		</>
	);
}

export default ClassStudentView;
