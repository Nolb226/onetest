import { useEffect, useState } from 'react';
import LoadingData from '../../loadingAnimation/LoadingData';
import api from '../../../config/config';
import { useOutletContext } from 'react-router';

function validator(formSelector, setIsLoading) {
	let formElement = document.querySelector(formSelector);

	let formRules = {};

	const getParentElement = (childElement, parentSelector) => {
		while (childElement.parentElement) {
			if (childElement.parentElement.matches(parentSelector)) {
				return childElement.parentElement;
			}
			childElement = childElement.parentElement;
		}
	};

	var validatorRules = {
		require: (value) => {
			return value ? undefined : 'Vui lòng nhập thông tin';
		},
	};

	if (formElement) {
		var inputs = formElement.querySelectorAll('[name][rules]');

		const clearErrorMessage = (event) => {
			let parentElement = getParentElement(event.target, '.form-group');
			parentElement.classList.remove('invalid');
			parentElement.querySelector('.form-message').innerText = '';
		};

		// Lắng nghe sự kiện trên từng thẻ input
		const handelValidate = (event) => {
			var rules = formRules[event.target.name];
			var errorMessage;

			rules.find(function (rule) {
				errorMessage = rule(event.target.value);
				return errorMessage;
			});

			let parentElement = getParentElement(event.target, '.form-group');

			if (errorMessage) {
				parentElement.classList.add('invalid');
				parentElement.querySelector(
					'.form-message'
				).innerText = `* ${errorMessage}`;
			}

			return !errorMessage;
		};

		// Lặp và gán function validator cho từng thẻ input
		inputs.forEach((input) => {
			var rules = input.getAttribute('rules').split('|');

			rules.forEach((rule) => {
				var ruleFunction;
				ruleFunction = validatorRules[rule];

				if (Array.isArray(formRules[input.name]))
					formRules[input.name].push(ruleFunction);
				else formRules[input.name] = [ruleFunction];
			});

			input.onblur = handelValidate;
			input.oninput = clearErrorMessage;
		});

		// Create handicraft exam

		console.log('validate');
		formElement.onsubmit = (event) => {
			event.preventDefault();
			const currentUser = localStorage.getItem('currentUser');
			var isValid = true;
			let formData = new FormData();

			inputs.forEach((input) => {
				if (!handelValidate({ target: input })) {
					isValid = false;
				}
			});

			if (isValid) {
				// Get data from exam information
				inputs.forEach((input) => {
					// if (input.closest(".exam-information")) {
					formData.append(input.name, input.value);
					// }
				});

				fetch(`${api}/teach`, {
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + currentUser,
						// "Content-type": "application/json",
					},
					body: formData,
				}).then((res) => {
					if (!res.ok) {
						setIsLoading(false);
						alert('Thay đổi không thành công! Vui lòng thử lại.');
					} else if (res.ok) {
						console.log('nav');
						alert('Thay đổi thành công! Click để quay lại trang chính.');
						setIsLoading(false);
					}
				});
			}
		};
	}
}

function Assignment() {
	const currentUser = localStorage.getItem('currentUser');
	const [isLoadingData, setIsLoadingData] = useState(false);
	const [errorLoadingData, setErrorLoadingData] = useState('');
	const [subjectId, setSubjectId] = useState();
	const [newAccount, setNewAccount] = useState('');
	const [newAccountData, setNewAccountData] = useState();
	const [subjectData, setSubjectData] = useState({
		accounts: [],
		id: '',
		name: '',
	});

	const { permissions } = useOutletContext();

	const [openModal, setOpenModal] = useState(false);
	validator('#assignment', setIsLoadingData);

	const isAllowedToPost = permissions.find((x) => x.id === 26);
	const isAllowedToDelete = permissions.find((x) => x.id === 27);

	const getSubjectData = async (subjectId) => {
		// setIsLoadingData(true);
		await fetch(
			`${api}/teach/${subjectId}
      `,
			{
				headers: {
					Authorization: 'Bearer ' + currentUser,
				},
			}
		)
			.then((data) => data.json())
			.then((data) => {
				setSubjectData(data.data);
				// setIsLoadingData(false);
			})
			.catch(() => {
				setErrorLoadingData('Không thể lấy dữ liệu. Vui lòng thử lại !');
				// setIsLoadingData(false);
			});
	};

	useEffect(() => {
		getSubjectData(subjectId);
	}, [subjectId]);

	useEffect(() => {
		if (subjectData)
			document.getElementById('subjectName').value = subjectData.name;
		else document.getElementById('subjectName').value = '';
	}, [subjectData]);

	useEffect(() => {
		(async (newAccount) => {
			// setIsLoadingData(true);
			await fetch(
				`${api}/admin/accounts/${newAccount}
         `,
				{
					headers: {
						Authorization: 'Bearer ' + currentUser,
					},
				}
			)
				.then((data) => data.json())
				.then((data) => {
					setNewAccountData(data.data);
				})
				.catch(() => {
					setErrorLoadingData('Không thể lấy dữ liệu. Vui lòng thử lại !');
				});
		})(newAccount);
	}, [newAccount]);

	useEffect(() => {
		if (newAccountData && isAllowedToPost)
			document.getElementById('teacherName').value =
				newAccountData.fullname || '';
	}, [newAccountData]);

	// Delete assigned account
	const deleteAssignment = async (e, teach) => {
		e.preventDefault();

		//  let teach = {};
		//  teach["lectureId"] = subjectId;
		//  teach["accountId"] = account_id;

		console.log(teach);
		await fetch(
			`${api}/teach
         `,
			{
				body: JSON.stringify(teach),
				method: 'DELETE',
				headers: {
					Authorization: 'Bearer ' + currentUser,
					'Content-Type': 'application/json',
				},
			}
		).then((res) => {
			if (!res.ok) {
				// setIsLoading(false);
				alert('Thay đổi không thành công! Vui lòng thử lại.');
			} else if (res.ok) {
				alert('Thay đổi thành công!');
				// setIsLoading(false);
			}
		});
	};

	return (
		<>
			<form
				className="flex-center flex-direction-col create-handicraft position-relative "
				id="assignment"
			>
				<div className="position-relative find-box">
					<div className="subject">
						<div className="info-item find-subject form-group">
							<label
								className="form-label"
								htmlFor="subjectId"
								style={{
									color: '#222',
									fontSize: '1.3rem',
									fontWeight: '600',
									width: '160px',
								}}
							>
								Mã môn học
							</label>
							<div
								className="flex-center"
								style={{
									height: '100%',
									width: '100%',
									flexDirection: 'column',
									alignItems: 'flex-start',
								}}
							>
								<input
									rules="require"
									className="form-control"
									type="text"
									name="lectureId"
									id="lectureId"
									placeholder="Nhập mã môn học"
									style={{
										fontSize: '1.4rem',
										paddingLeft: '10px',
										height: '30px',
										outline: 'none',
										borderRadius: '4px',
										border: 'solid 2px #BFBFBF',
										width: '100%',
									}}
									onBlur={(e) => {
										setSubjectId(e.target.value);
									}}
								/>
								<label htmlFor="lectureId" className="form-message"></label>
							</div>
						</div>

						<div className="info-item find-subject">
							<label
								className="form-label"
								htmlFor="subjectName"
								style={{
									color: '#222',
									fontSize: '1.3rem',
									fontWeight: '600',
									width: '160px',
								}}
							>
								Tên môn học
							</label>
							<div
								className="flex-center"
								style={{ height: '100%', width: '100%' }}
							>
								<input
									type="text"
									name="subjectName"
									id="subjectName"
									disabled="true"
									style={{
										fontSize: '1.4rem',
										paddingLeft: '10px',
										height: '30px',
										outline: 'none',
										borderRadius: '4px',
										border: 'solid 2px #BFBFBF',
										width: '100%',
									}}
									// value={subjectData.name}
								/>
							</div>
						</div>
					</div>

					{isAllowedToPost && (
						<div className="add-new-teacher">
							<div className="info-item find-subject form-group">
								<label
									className="form-label"
									htmlFor="accountId"
									style={{
										color: '#222',
										fontSize: '1.3rem',
										fontWeight: '600',
										width: '160px',
									}}
								>
									Mã cá nhân
								</label>
								<div
									className="flex-center"
									style={{
										height: '100%',
										width: '100%',
										flexDirection: 'column',
										alignItems: 'flex-start',
									}}
								>
									<input
										rules="require"
										className="form-control"
										type="text"
										name="accountId"
										id="accountId"
										placeholder="Nhập mã cá nhân"
										style={{
											fontSize: '1.4rem',
											paddingLeft: '10px',
											height: '30px',
											outline: 'none',
											borderRadius: '4px',
											border: 'solid 2px #BFBFBF',
											width: '100%',
										}}
										onBlur={(e) => setNewAccount(e.target.value)}
									/>
									<label htmlFor="accountId" className="form-message"></label>
								</div>
							</div>

							<div className="info-item find-subject">
								<label
									className="form-label"
									htmlFor="teacherName"
									style={{
										color: '#222',
										fontSize: '1.3rem',
										fontWeight: '600',
										width: '160px',
									}}
								>
									Họ và tên
								</label>
								<div
									className="flex-center"
									style={{ height: '100%', width: '100%' }}
								>
									<input
										type="text"
										name="teacherName"
										id="teacherName"
										disabled="true"
										style={{
											fontSize: '1.4rem',
											paddingLeft: '10px',
											height: '30px',
											outline: 'none',
											borderRadius: '4px',
											border: 'solid 2px #BFBFBF',
											width: '100%',
										}}
									/>
								</div>
							</div>
							<button className="assign-btn">Thêm</button>
						</div>
					)}
				</div>

				<div className="assigned-account">
					<div className="table-zone">
						<header className="table__header">
							<ul
								className="flex-center table__content--heading"
								style={{
									display: 'grid',
									gridTemplateColumns: '25% 65% 10%',
								}}
							>
								<li className="flex-center column-text">
									<h3>Mã cá nhân</h3>
								</li>
								<li className="flex-center column-text">
									<h3>Họ và tên</h3>
								</li>
								{isAllowedToDelete && (
									<li className="flex-center column-text">
										<h3>Sửa</h3>
									</li>
								)}
							</ul>
						</header>
						<div className="grid table__content">
							<div className="table__content--list position-relative">
								{errorLoadingData && (
									<div
										className="flex-center"
										style={{
											width: '100%',
											height: '100%',
											marginTop: '20px',
											fontSize: '1.6rem',
											color: '#777',
										}}
									>
										{/* {errorLoadingData} */}
									</div>
								)}
								{/* {isLoadingData && <LoadingData />} */}
								{subjectData?.accounts.map((account) => {
									return (
										<ul
											className="flex-center table__content--item"
											style={{
												display: 'grid',
												gridTemplateColumns: '25% 65% 10%',
											}}
											key={account.account_id}
										>
											<li className="flex-center column-text">
												<h3>{account.account_id}</h3>
											</li>
											<li className="flex-center column-text">
												<h3>
													{account.lastName} {account.firstName}
												</h3>
											</li>
											{isAllowedToDelete && (
												<li
													className="flex-center column-text"
													onClick={(e) => deleteAssignment(e, account.teach)}
												>
													<button
														className="view-btn"
														style={{
															backgroundColor: '#cc2424',
														}}
													>
														Gỡ
													</button>
												</li>
											)}
										</ul>
									);
								})}
							</div>
						</div>

						<div className="mobile-table-content">
							{subjectData?.accounts.map((account) => {
								return (
									<div
										className="flex-center mobile-table-item"
										key={account.account_id}
									>
										<h3>{account.account_id}</h3>
										<span style={{ color: '#555' }}>
											{account.lastName} {account.firstName}
										</span>

										{isAllowedToDelete && (
											<button
												className="view-btn"
												style={{ backgroundColor: '#cc2424' }}
												onClick={(e) => deleteAssignment(e, account.teach)}
											>
												Gỡ
											</button>
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</form>
		</>
	);
}

export default Assignment;
