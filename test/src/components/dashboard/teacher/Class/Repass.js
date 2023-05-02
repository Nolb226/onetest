import { useState, useEffect } from 'react';
import api from '../../../../config/config';
import { useNavigate, useParams } from 'react-router';

function Repass(prop) {
	const { classId } = useParams();
	const navigate = useNavigate();
	const [info, setInfo] = useState({});
	const [getPassword, setPassword] = useState('');

	useEffect(() => {
		const currentUser = localStorage.getItem(`currentUser`);
		fetch(`${api}/classes/${classId}/edit`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((res) => res.json())
			.then((info) => {
				console.log(info.data);
				setInfo(info.data);
			});
	}, []);

	const handleSubmit = (password) => {
		const currentUser = localStorage.getItem(`currentUser`);
		// console.log(Class.isLock);
		// console.log(Class.id);
		fetch(`${api}/classes/${classId}?field=password`, {
			method: 'PATCH',
			body: JSON.stringify({
				password,
			}),
			headers: {
				Authorization: 'Bearer ' + currentUser,
				'Content-type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then(() => navigate(-1));
		//   .then((json) => console.log(json.data));
		// prop.handleRePass('');
	};

	// // quay lại
	// const returnBtn = document.querySelector('.return');
	// returnBtn.addEventListener('click', () => {
	// 	prop.handleRePass('');
	// });

	return (
		<form
			class="flex-center content"
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(getPassword);
			}}
		>
			<div>
				<div class="row class-editpass-model class-editpass-header">
					<div class="l-5 m-5 c-5">Mã Lớp: {info.id}</div>
					<div class="l-7 m-7 c-5">Tên Lớp: {info.name}</div>
				</div>

				<div class="wide class-editpass-body class-editpass-model">
					<div class="row p-6-15 flex-center">
						<label for="" class="l-6 m-6 c-6">
							Mật khẩu hiện tại:
						</label>
						<input
							class="l-6 m-6 c-6 class-editpass-input"
							type="text"
							readOnly
							value={info.password}
						/>
					</div>

					<div class="row p-6-15 flex-center">
						<label for="newPass" class="l-6 m-6 c-6">
							Mật khẩu mới:
						</label>
						<input
							class="l-6 m-6 c-6 class-editpass-input"
							type="text"
							id="newPass"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div class="row flex-center">
						<button class="list_btn class-editpass-btn">LƯU</button>
					</div>
				</div>
			</div>
		</form>
	);
}

export default Repass;
