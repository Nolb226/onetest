import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../image/class-icon.png';
import { useEffect } from 'react';

const IconComponent = ({ icon }) => {
	const iconClass = icon;
	return (
		<>
			<i className={iconClass}></i>
		</>
	);
};

function SideMenu({ info }) {
	const navigator = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		console.log(pathname.split('/')[3]);
	}, [pathname]);

	const teacherAccount = [
		{
			idPemission: 1,
			path: `exam`,
			icon: '../../image/exam-icon.png',
		},

		{
			idPemission: 2,
			path: `../class`,
			icon: '../../image/class-icon.png',
		},

		{
			idPemission: 3,
			path: `/statistics`,
			icon: '../../image/dashboard-icon.png',
		},
		// {
		//    idPemission: 6,
		//    path: "/dashboard/statistics",
		//    icon: "../../image/dashboard-icon.png",
		// },
	];

	const studentAccount = [
		{
			idPemission: 4,
			path: `student/viewclass/`,
			icon: 'menu-icon fa-solid fa-file-pen',
		},

		{
			idPemission: 5,
			path: `student/joinclass`,
			icon: 'menu-icon fa-solid fa-plus',
		},
	];

	const adminAccount = [
		{
			idPemission: 7,
			path: `admin/permission`,
			icon: 'menu-icon fa-solid fa-plus',
		},
		{
			idPemission: 6,
			path: `admin/manage-account`,
			icon: 'menu-icon fa-solid fa-file-pen',
		},
	];

	function activeButton(e) {
		let buttons = document.querySelectorAll('.menu-item');
		buttons.forEach((button) => {
			if (button.classList.contains('active'))
				button.classList.remove('active');
		});
		e.target.closest('.menu-item').classList.add('active');
	}

	return (
		<div id="left-menu" className="position-relative col l-1">
			<ul className="menu-list flex-center flex-direction-col">
				{teacherAccount.map((item) => {
					return (
						<li
							className="menu-item flex-center"
							onClick={(e) => {
								navigator(`${item.path}`, {
									relative: 'route',
								});
								activeButton(e);
							}}
							key={item.idPemission}
						>
							<img src={item.icon} alt={item.idPemission} />
							{/* <IconComponent icon={item.icon} /> */}
						</li>
					);
				})}
			</ul>

			<div className="themes flex-center position-absolute">
				<i className="menu-icon fa-solid fa-circle-half-stroke"></i>
				<ul className="themes-list"></ul>
			</div>
		</div>
	);
}

export default SideMenu;
