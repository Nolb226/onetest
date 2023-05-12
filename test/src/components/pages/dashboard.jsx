import api from '../../config/config.js';
import { useEffect, useState } from 'react';
import SideMenu from '../dashboard/SideMenu';
import Student from '../dashboard/student/component-student/Student';
import Teacher from '../dashboard/teacher/Teacher';
import Admin from '../dashboard/admin/Admin.jsx';
import './sideMenu.css';
import '../../css/dashboard/dashboard.css';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import logo from '../../image/logo-no-background.png';
import { Link } from 'react-router-dom';
import socket from '../../util/socket.js';

const UserMenu = ({ info, setIsOpenProfile, setType }) => {
	return (
		<>
			<div className="user-menu" onClick={(e) => e.stopPropagation()}>
				<div className="info-box">
					<p className="info-box__text info-box__text--main  ">
						{info.fullname}
					</p>
					<p className="info-box__text info-box__text--sub">
						{info.permissiongroup.name}
					</p>
				</div>
				<ul className="user-menu__list">
					<li
						className="list-item"
						onClick={() => {
							setType('profile');
							setIsOpenProfile(true);
						}}
					>
						<i class="fa-regular fa-user"></i>

						<p class="info-box__text">Tài khoản</p>
					</li>
					<li
						className="list-item"
						onClick={(e) => {
							setType('password');
							setIsOpenProfile(true);
						}}
					>
						<i class="fa-solid fa-pen"></i>
						<p class="info-box__text">Đổi mật khẩu</p>
					</li>
					<li
						className="list-item logout"
						onClick={() => {
							localStorage.removeItem('currentUser');
							window.location.href = '/';
							// navigator('/', { replace: true });
						}}
					>
						<i class="fa-solid fa-power-off"></i>
						<p class="info-box__text">Đăng xuất</p>
					</li>
				</ul>
			</div>
		</>
	);
};

const UserModel = ({ setIsOpenProfile, info, type, handleUpdate }) => {
	const [user, setUser] = useState({ ...info });
	const [oldPass, setOldPass] = useState('');
	const [password, setPassword] = useState('');
	const vietNamFomatter = new Intl.DateTimeFormat('vi-VN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
	const date = new Date('2003', '9', '30');
	//   console.log(date);
	const isPasswordForm = type === 'password';
	const handleUser = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const submit = (e) => {
		e.preventDefault();
		if (!isPasswordForm) {
			handleUpdate(user);
		} else {
			const currentUser = localStorage.getItem('currentUser');
			fetch(`${api}/accounts/${user.account_id}/pass/edit`, {
				method: 'PATCH',
				body: JSON.stringify({
					oldPass,
					password,
				}),
				headers: {
					Authorization: 'Bearer ' + currentUser,
					'Content-type': 'application/json',
				},
			}).then((response) => {
				if (response.ok) {
					alert('Cập nhật mat khau thành công');
				} else {
					alert('Cập nhật mat khau thất bại');
				}
			});
		}
	};

	return (
		<>
			<div
				className="flex-center overlay"
				// onClick={() => setIsOpenProfile(false)}
			>
				<form
					id="profile-form"
					className="user-form "
					onSubmit={(e) => submit(e)}
				>
					<header className="user-form__header">
						<div className="header__icon-box">
							<i class="fa-regular fa-user"></i>
						</div>
						<div className="header__heading-box">
							<p className="form-header__heading">
								<input
									type="text"
									className=""
									name="fullName"
									value={user.fullname}
									onChange={(e) => handleUser(e)}
								/>
								{/* {info.fullname} */}
							</p>
						</div>
						<div className="header__box">
							{!isPasswordForm ? (
								<button className="btn btn-edit-profile">
									{/* <i class="fa-regular fa-pen-to-square"></i> */}
									<h1>Lưu</h1>
								</button>
							) : (
								<div className="green-dot" title="Online"></div>
							)}
						</div>
						<div className="cross-btn-box">
							<button
								className="btn cross-btn-form"
								onClick={() => setIsOpenProfile(false)}
							>
								<i class="fa-solid fa-xmark"></i>
							</button>
						</div>
					</header>
					<body className="user-form__body">
						{!isPasswordForm ? (
							<>
								<label className="body__row">
									<span className="row-text">Mã cá nhân:</span>
									<input
										type="text"
										className="row-text"
										name="account_id"
										value={user.account_id}
										onChange={(e) => handleUser(e)}
									/>
								</label>
								<label className="body__row">
									<span className="row-text">Ngày sinh:</span>
									<input
										className="row-text"
										type="date"
										name="dob"
										onChange={(e) => handleUser(e)}
										value={user.dob}
									/>
								</label>
							</>
						) : (
							<>
								<label className="body__row">
									<span className="row-text">Mật khẩu cũ :</span>
									<input
										type="password"
										onChange={(e) => setOldPass(e.target.value)}
									/>
								</label>
								<label className="body__row">
									<span className="row-text">Mật khẩu mới :</span>
									<input
										type="password"
										onChange={(e) => setPassword(e.target.value)}
									/>
								</label>
							</>
						)}
					</body>
					{isPasswordForm ? (
						<footer className="user-form__footer">
							<button className="submit-profile">Xác nhận</button>
						</footer>
					) : (
						''
					)}
				</form>
			</div>
		</>
	);
};

const Notification = ({ notifies }) => {
	const vietNamFomatter = new Intl.DateTimeFormat('vi-VN', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});

	const today = new Date();

	return (
		<>
			<div className="notification-panel">
				<header className="panel__header">
					<h1 className="panel__heading">Thông Báo</h1>
				</header>
				<body className="panel__body">
					<ul className="notification-list">
						{notifies?.map((notify) => {
							const dayPast = -Math.abs(
								new Date().getDate() - new Date(notify.createdAt).getDate()
							);
							{
								/* let rtf  */
							}
							console.log(
								-Math.abs(dayPast),
								new Date(notify.createdAt).getDate()
							);
							let result;
							if (dayPast < -1) {
								result = new Intl.RelativeTimeFormat('vi-VN', {
									style: 'short',
									timeZone: 'Asia/Ho_Chi_Minh',
								}).format(dayPast, 'day');
							} else {
								result = new Intl.RelativeTimeFormat('vi-VN', {
									numeric: 'auto',
									timeZone: 'Asia/Ho_Chi_Minh',
								}).format(dayPast, 'day');
							}
							return (
								<li key={notify.id} className="notification-item">
									<p className='info-box__text info-box__text--main  "'>
										{notify.description}
									</p>
									<p className="info-box__text info-box__text--sub">
										{/* {notify.class_name} */}
										{result}
									</p>
								</li>
							);
						})}

						{/* <li className="notification-item">
							<p>Bạn có 1 bài tập mới từ lớp ABC123</p>
						</li>
						<li className="notification-item">
							<p>Bạn có 1 bài tập mới từ lớp ABC123</p>
						</li>
						<li className="notification-item">
							<p>Bạn có 1 bài tập mới từ lớp ABC123</p>
						</li>
						<li className="notification-item">
							<p>Bạn có 1 bài tập mới từ lớp ABC123</p>
						</li>
						<li className="notification-item">
							<p>Bạn có 1 bài tập mới từ lớp ABC123</p>
						</li>
						<li className="notification-item">
							<p>Bạn có 1 bài tập mới từ lớp ABC123</p>
						</li>
						<li className="notification-item">
							<p>Bạn có 1 bài tập mới từ lớp ABC123</p>
						</li> */}
					</ul>
				</body>
			</div>
		</>
	);
};

function Dashboard({ permissions }) {
	const [info, setInfo] = useState({});
	const [notifies, setNotifies] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [type, setType] = useState('');
	const [isOpenProfile, setIsOpenProfile] = useState(false);
	const [isOpenNotifications, setIsOpenNotifications] = useState(false);
	const fetchData = async () => {
		try {
			const currentUser = localStorage.getItem('currentUser');

			const [info, notify] = await Promise.all([
				fetch(`${api}/accounts`, {
					headers: {
						Authorization: 'Bearer ' + currentUser,
					},
				}),
				fetch(`${api}/classes/notifications`, {
					headers: {
						Authorization: 'Bearer ' + currentUser,
					},
				}),
			]);

			const infoInDB = await info.json();
			const notifyInDB = await notify.json();

			setInfo({
				...infoInDB.data,
				fullName: infoInDB.data?.lastName + ' ' + infoInDB.data?.firstName,
			});

			setNotifies(notifyInDB.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		socket.connect();
		socket.on('exam:notify', (noti) => {
			setNotifies([noti, ...notifies]);
		});
		return () => {
			socket.off('exam:notify');
			// socket.disconnect();
		};
	}, [notifies]);

	const menuElement = document.querySelector('#left-menu');

	const handleCloseSideMenu = () => {
		if (window.innerWidth < 740) {
			menuElement.classList.remove('openMenu');
			menuElement.classList.add('closeMenu');
			document.querySelector('.menu-layer').style.display = 'none';
		}
	};

	const handleUpdate = (newInfo) => {
		const currentUser = localStorage.getItem('currentUser');
		fetch(`${api}/accounts/${info.account_id}/edit`, {
			method: 'PUT',
			body: JSON.stringify(newInfo),
			headers: {
				Authorization: 'Bearer ' + currentUser,
				'Content-type': 'application/json',
			},
		}).then((response) => {
			if (response.ok) {
				alert('Cập nhật thông tin thành công');
				setInfo(newInfo);
			} else {
				alert('Cập nhật thông tin thất bại');
			}
		});
	};

	//   console.log(info);
	return (
		<div
			id="main-layout"
			className="grid wide"
			onClick={() => handleCloseSideMenu()}
		>
			<div className="layout--body">
				<SideMenu info={info} />

				<div id="dashboard-container">
					{/* {isConfig && <UserModel />} */}
					<div className="top-bar">
						{/* {isConfig && <UserModel />} */}
						<header className="header position-relative">
							<div className="header__title">
								<i
									className="menu-bar-icon fa-solid fa-bars"
									style={{ marginRight: '20px' }}
									onClick={(e) => {
										e.stopPropagation();
										document
											.querySelector('#left-menu')
											.classList.remove('closeMenu');
										document
											.querySelector('#left-menu')
											.classList.add('openMenu');
										document.querySelector('.menu-layer').style.display =
											'block';
									}}
								></i>
								<h1>Best Of Test</h1>
							</div>
							<div className="navigation flex-center">
								<ul className="nav__list flex-center">
									<li
										className="nav__item flex-center"
										alt="Viet Nam flag"
										title="Viet Nam"
									>
										<div className="nav__icon flex-center ">
											<img src=".././image/Flag_of_Vietnam.png" alt="" />
										</div>
									</li>

									<li
										className="nav__item flex-center position-relative notify"
										title="Thông báo"
										onClick={() => {
											setIsOpenNotifications(!isOpenNotifications);
											setIsOpen(false);
										}}
									>
										<div className="nav__icon flex-center ">
											<i className="fa-regular fa-bell"></i>
										</div>
										{isOpenNotifications && (
											<Notification
												setIsOpenProfile={setIsOpenProfile}
												setIsOpenNotifications={setIsOpenNotifications}
												notifies={notifies}
											/>
										)}
									</li>

									<li
										className="nav__item flex-center position-relative user-btn"
										onClick={(e) => {
											e.stopPropagation();
											setIsOpen(!isOpen);
											setIsOpenNotifications(false);
										}}
										title={info.fullname || 'Nguyen Truong Khanh Hoang'}
									>
										{/* <div className="information">
								 <div className="flex-center name inf-children">
									{info.fullname ||
									   "Nguyen Truong Khanh Hoang"}
								 </div>
								 <div className="flex-center code inf-children">
									{info.id || "3121410146"}
								 </div>
							  </div> */}
										<div className="nav__icon flex-center ">
											<i className="fa-regular fa-user"></i>
										</div>
										{isOpen && (
											<UserMenu
												setType={setType}
												setIsOpenProfile={setIsOpenProfile}
												setIsOpenNotifications={setIsOpenNotifications}
												isOpenProfile={isOpenProfile}
												info={info}
											/>
										)}
									</li>
								</ul>
							</div>
						</header>
						<div className="content">
							{isOpenProfile && (
								<UserModel
									info={info}
									type={type}
									setIsOpenProfile={setIsOpenProfile}
									handleUpdate={handleUpdate}
								/>
							)}
							<Outlet
								context={{
									permissions: permissions.filter((x) => x.method !== 'GET'),
								}}
							/>
							{/* <Teacher /> */}
							{/* <Student idStudent={info.id} nameStudent={info.fullname} /> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
