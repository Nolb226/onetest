import React, { useEffect, useRef, useState } from 'react';

import { Outlet, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Menu = () => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('details');
	// const path = useRef('details');
	useEffect(() => {
		setActive(pathname.split('/')[4]);
	}, [pathname]);
	return (
		<div className="menu ">
			<ul className="flex ">
				<li className={`menu-list-item ${active === '' && 'active'}`}>
					<Link to={'./'}>Thông tin lớp</Link>
				</li>
				<li className={`menu-list-item ${active === 'exams' && 'active'}`}>
					<Link to={'./exams'}>Bài Thi</Link>
				</li>
				<li className={`menu-list-item ${active === 'notify' && 'active'}`}>
					Thông Báo
				</li>
			</ul>
		</div>
	);
};

function ClassStudentView() {
	return (
		<>
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
					<Menu />
					<div className="view">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

export default ClassStudentView;
