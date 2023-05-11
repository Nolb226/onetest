import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../image/class-icon.png';
import { useEffect, useState } from 'react';
import socket from '../../util/socket';
import api from '../../config/config';

const IconComponent = ({ icon }) => {
	const iconClass = icon;
	return (
		<>
			<i className={iconClass}></i>
		</>
	);
};

function SideMenu({ info }) {
	const [studentPermissions, setStudentPermissions] = useState([]);

	const [teacherPermissions, setTeacherPermissions] = useState([]);

	const [adminPermissions, setAdminPermissions] = useState([]);

	const [allPermissions, setAllPermissions] = useState([]);

	const navigator = useNavigate();
	const { pathname } = useLocation();

	const teacherAccount = [
		{
			permissionId: 1,
			path: `../exam`,
			icon: 'menu-icon fa-solid fa-file-lines',
			name: 'Quản lí thi',
			nav: '/teacher/exam',
		},

		{
			permissionId: 8,
			path: `../class`,
			icon: 'menu-icon fa-solid fa-chalkboard-user',
			name: 'Quản lí lớp',
			nav: '/teacher/class',
		},

		{
			permissionId: 7,
			path: `/statistics`,
			icon: 'menu-icon fa-solid fa-chart-simple',
			name: 'Thống kê',
			nav: '/teacher/statistics',
		},

		{
			permissionId: 12,
			path: `/bank`,
			icon: 'menu-icon fa-solid fa-building-columns',
			name: 'Ngân hàng',
			nav: '/teacher/bank',
		},
	];

	const studentAccount = [
		{
			permissionId: 5,
			path: `student/joinclass`,
			icon: 'menu-icon fa-solid fa-plus',
			name: 'Lớp học',
			nav: '/student/class',
		},
	];

	const adminAccount = [
		{
			permissionId: 16,
			nav: `admin/manage-account`,
			icon: 'menu-icon fa-solid fa-user-gear',
			name: 'Tài khoản',
		},
		{
			permissionId: 19,
			nav: `admin/permission`,
			icon: 'menu-icon fa-solid fa-gear',
			name: 'Quyền',
		},
		{
			permissionId: 20,
			nav: `admin/assignment`,
			icon: 'menu-icon fa-solid fa-user-pen',
			name: 'Phân công',
		},
	];

	useEffect(() => {
		console.log(pathname.split('/')[3]);
	}, [pathname]);

	const testAccount = [
		{
			permissionId: 1,
			path: `../exam`,
			icon: '../../image/exam-icon.png',
		},

		{
			permissionId: 2,
			path: `../class`,
			icon: '../../image/class-icon.png',
		},

		{
			permissionId: 3,
			path: `/statistics`,
			icon: '../../image/dashboard-icon.png',
		},
		{
			permissionId: 4,
			path: `student/viewclass/`,
			icon: 'menu-icon fa-solid fa-file-pen',
		},

		{
			permissionId: 5,
			path: `student/joinclass`,
			icon: 'menu-icon fa-solid fa-plus',
		},
		{
			permissionId: 6,
			path: `admin/manage-account`,
			icon: 'menu-icon fa-solid fa-user-gear',
		},
		{
			permissionId: 7,
			path: `admin/permission`,
			icon: 'menu-icon fa-solid fa-gear',
		},
	];

	useEffect(() => {
		// socket.connect();

		const currentUser = localStorage.getItem('currentUser');
		fetch(`${api}/permissions/user`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setTeacherPermissions(
					data.data
						?.map((permission) => {
							if (permission.method === 'GET') {
								return teacherAccount.find(
									(x) => x.permissionId === permission.id
								);
							}
						})
						.filter((x) => x !== undefined)
				);
				setStudentPermissions(
					data.data
						?.map((permission) => {
							if (permission.method === 'GET') {
								return studentAccount.find(
									(x) => x.permissionId === permission.id
								);
							}
						})
						.filter((x) => x !== undefined)
				);
				setAdminPermissions(
					data.data
						?.map((permission) => {
							if (permission.method === 'GET') {
								return adminAccount.find(
									(x) => x.permissionId === permission.id
								);
							}
						})
						.filter((x) => x !== undefined)
				);
			})
			.then(() => {
				console.log('||||');
				console.log(allPermissions);
			});
		// return () => {
		// 	if (socket.readyState === 1) {
		// 		// <-- This is important
		// 		socket.close();
		// 	}
		// };
	}, []);

	useEffect(() => {
		socket.connect();
		socket.on('permissions:updated', (permissions) => {
			setTeacherPermissions(
				permissions
					.map((permission) => {
						if (permission.method === 'GET') {
							return teacherAccount.find(
								(x) => x.permissionId === permission.id
							);
						}
					})
					.filter((x) => x !== undefined)
			);
			setStudentPermissions(
				permissions
					.map((permission) => {
						if (permission.method === 'GET') {
							return studentAccount.find(
								(x) => x.permissionId === permission.id
							);
						}
					})
					.filter((x) => x !== undefined)
			);
			setAdminPermissions(
				permissions
					.map((permission) => {
						if (permission.method === 'GET') {
							return adminAccount.find((x) => x.permissionId === permission.id);
						}
					})
					.filter((x) => x !== undefined)
			);
		});

		return () => {
			socket.off('permissions:updated');
			socket.disconnect();
			// socket.off('user:check-permissions');
		};
	}, [studentPermissions, adminPermissions, teacherPermissions]);
	function activeButton(e) {
		let buttons = document.querySelectorAll('.menu-item');
		buttons.forEach((button) => {
			if (button.classList.contains('active'))
				button.classList.remove('active');
		});
		e.target.closest('.menu-item').classList.add('active');
	}

	return (
		<>
			<div className="menu-layer"> </div>
			<div
				id="left-menu"
				className="position-relative flex-center"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="left-menu__logo flex-center">
					<img
						className="logo-menu-pc"
						src="../../image/logo-menu-header.svg"
						alt=""
					/>
					<img
						className="logo-menu-tablet"
						src="../../image/logo-menu-header-tablet.svg"
						alt=""
					/>
				</div>
				<div className="menu-list flex-center flex-direction-col">
					{studentPermissions.length ? (
						<ul>
							<h1>Học sinh</h1>
							{studentPermissions.map((item) => {
								return (
									<li
										className="menu-item flex-center"
										onClick={(e) => {
											navigator(`${item.nav}`);
											activeButton(e);
											document.querySelector(
												'.header__title > h1'
											).textContent = item.name;
										}}
										key={item.permissionId}
										title={item.name}
									>
										<IconComponent icon={item.icon} />
										<span className="menu-item__name">{item.name}</span>
									</li>
								);
							})}
						</ul>
					) : (
						''
					)}
					{teacherPermissions.length ? (
						<ul style={{ width: '100%' }}>
							<h1>Quản lý</h1>
							{teacherPermissions.map((item) => {
								return (
									<li
										className="menu-item flex-center"
										onClick={(e) => {
											navigator(`${item.nav}`);
											activeButton(e);
											document.querySelector(
												'.header__title > h1'
											).textContent = item.name;
										}}
										key={item.permissionId}
									>
										<IconComponent icon={item.icon} />
										<span className="menu-item__name">{item.name}</span>
									</li>
								);
							})}
						</ul>
					) : (
						''
					)}
					{adminPermissions.length ? (
						<ul style={{ width: '100%' }}>
							<h1>Quản trị</h1>
							{adminPermissions.map((item) => {
								return (
									<li
										className="menu-item flex-center"
										onClick={(e) => {
											navigator(`${item.nav}`);
											activeButton(e);
											document.querySelector(
												'.header__title > h1'
											).textContent = item.name;
										}}
										key={item.permissionId}
									>
										<IconComponent icon={item.icon} />
										<span className="menu-item__name">{item.name}</span>
									</li>
								);
							})}
						</ul>
					) : (
						''
					)}
				</div>

				{/* <div className="themes flex-center position-absolute">
            <i className="menu-icon fa-solid fa-circle-half-stroke"></i>
            <ul className="themes-list"></ul>
         </div> */}
			</div>
		</>
	);
}

export default SideMenu;
