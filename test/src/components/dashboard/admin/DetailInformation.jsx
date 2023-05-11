import { useEffect, useState } from 'react';
import api from '../../.././config/config.js';
import Majors from './Majors.jsx';
import Department from './department.jsx';
import PermissionGroup from './permissionGroup.jsx';

function DetailInformation(prop) {
	const [account, setAccount] = useState({});
	const [oldAccountId, setOldAccountId] = useState('');

	const isDisabled = !prop.isAllowedToPut;

	useEffect(() => {
		const currentUser = localStorage.getItem(`currentUser`);
		fetch(`${api}/admin/accounts/${prop.accountId}`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((res) => res.json())
			.then((info) => {
				console.log(info.data);
				setAccount(info.data);
				setOldAccountId(info.data.account_id);
			});
	}, []);

	function handleOpen() {
		prop.handleModal('');
	}

	const handleAccount = (e) => {
		// console.log(e.target.value);
		setAccount({ ...account, [e.target.name]: e.target.value });
		console.log(account);
	};

	const handleUpdate = (e) => {
		// e.preventDefault();
		const formData = new FormData();
		let lastName = '';
		for (
			let index = 0;
			index < account.fullname.split(' ').length - 1;
			index++
		) {
			if (index == account.fullname.split(' ').length - 2) {
				lastName += account.fullname.split(' ')[index];
			} else {
				lastName += account.fullname.split(' ')[index] + ' ';
			}
		}
		console.log(account.department_id);
		formData.append('account_id', account.account_id);
		formData.append('firstName', account.fullname.split(' ').at(-1));
		formData.append('lastName', lastName);
		formData.append('dob', account.dob);
		formData.append('departmentId', account.department_id || 'NULL');
		formData.append(
			'majorId',
			account.department_id == 'NULL' ? 'NULL' : account.major_id || 'NULL'
		);
		formData.append('isActive', account.isActive);
		formData.append('type', account.type || 'NULL');

		const currentUser = localStorage.getItem(`currentUser`);
		fetch(`${api}/admin/accounts/${oldAccountId}`, {
			method: 'PUT',
			body: formData,
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		}).then((response) => {
			if (response.ok) {
				alert('Cập nhật thông tin thành công');
			} else {
				alert('Cập nhật thông tin thất bại');
			}
		});
		let newAccout = {
			account_id: account.account_id,
			fullname: account.fullname,
			type: account.type,
			isActive: account.isActive,
		};
		prop.updateAccounts(oldAccountId, newAccout);
		handleOpen();
	};

	const handleDelete = () => {
		const currentUser = localStorage.getItem(`currentUser`);
		fetch(`${api}/admin/accounts/${oldAccountId}`, {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		}).then((response) => {
			if (response.ok) {
				alert('Xóa tài khoản thành công');
				prop.deleteAccount();
				handleOpen();
			} else {
				alert('Xóa tài khoản thất bại');
			}
		});
	};

	// if (document.getElementById("detail-information")) handleOpen();
	return (
		<>
			<div
				id="detail-information"
				className="flex-center"
				onClick={(e) => {
					handleOpen();
				}}
			>
				<div
					className="detail-content"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<ul className="input-list">
						<li className="input-item">
							<label htmlFor="">Mã cá nhân</label>
							<input
								type="text"
								name="account_id"
								id=""
								value={account?.account_id}
								onChange={(e) => handleAccount(e)}
								disabled={isDisabled}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="">Họ và tên</label>
							<input
								type="text"
								name="fullname"
								id=""
								value={account?.fullname}
								onChange={(e) => handleAccount(e)}
								disabled={isDisabled}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="">Ngày sinh</label>
							<input
								type="date"
								name="dob"
								id=""
								value={account.dob}
								onChange={(e) => handleAccount(e)}
								disabled={isDisabled}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="">Khoa</label>
							<Department
								departmentId={account?.department_id}
								handleAccount={handleAccount}
								disabled={isDisabled}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="">Ngành</label>
							<Majors
								departmentId={account?.department_id}
								majorId={account.major_id}
								handleAccount={handleAccount}
								disabled={isDisabled}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="">Loại tài khoản</label>
							<PermissionGroup
								permissionId={account?.type}
								handleAccount={handleAccount}
								disabled={isDisabled}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="">Kích hoạt</label>
							<input
								type="checkbox"
								name=""
								id=""
								checked={account?.isActive}
								onClick={(e) => {
									setAccount({ ...account, isActive: !account.isActive });
								}}
								disabled={isDisabled}
							/>
						</li>
						<li className="input-item">
							<label htmlFor="">Ngày khởi tạo</label>
							<input
								type="DATE"
								name=""
								id=""
								value={account?.createdAt?.split('T')[0]}
								disabled={isDisabled}
							/>
						</li>
					</ul>
					<div className="button-list flex-center">
						{/* Thao tác thay đổi sẽ được POST lên API */}
						{prop.isAllowedToPut && (
							<button className="save-btn__info" onClick={() => handleUpdate()}>
								lưu
							</button>
						)}
						{prop.isAllowedToDelete && (
							<button
								className="delete-btn__info"
								onClick={() => handleDelete()}
							>
								<span>xóa</span>
								<i class="fa-regular fa-trash-can"></i>
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default DetailInformation;
