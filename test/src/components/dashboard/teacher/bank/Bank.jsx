import { useState, useEffect } from 'react';
import api from '../../../../config/config';
import Loading from '../../../loadingAnimation/Loading';
import LoadingData from '../../../loadingAnimation/LoadingData';
import { Outlet, useNavigate, useOutlet, useOutletContext } from 'react-router';

const inputList = {
	width: '100%',
	height: '100%',
	maxHeight: '360px',
	justifyContent: 'flex-start',
};

const label = {
	color: '#444444',
	fontSize: '1.4rem',
	fontWeight: '600',
	width: '150px',
	lineHeight: '3rem',
};

const question = {
	width: '690px',
	height: '40px',
	border: 'none',
	flex: '1',
	background: '#F0F0F0',
	padding: '0 10px',
	fontSize: '1.6rem',
	fontWeight: '600',
	lineHeight: '1.6rem',
	outline: 'none',
	color: '#444',
	display: 'flex',
	alignItems: 'center',
	cursor: 'default',
	overflow: 'hidden',
};

const answer = {
	flex: '1',
	height: '32px',
	lineHeight: '1.5rem',
	border: 'none',
	background: '#fff',
	padding: '0 10px',
	fontSize: '1.5rem',
	outline: 'none',
	color: '#444',
	marginLeft: '15px',
	display: 'flex',
	alignItems: 'center',
};

function Question({ questionObject, isAllowedToPut }) {
	const handlePermission = (e) => {
		if (isAllowedToPut === undefined) {
			e.stopPropagation();
		}
	};

	useEffect(() => {
		const liElement = document.getElementById(`${questionObject.id}`);
		liElement.querySelectorAll('input[type=radio]').forEach((item) => {
			if (item.value === questionObject.correctAns) item.checked = true;
		});

		liElement.addEventListener('click', handlePermission, true);
		return () => {
			liElement.removeEventListener('click', handlePermission, true);
		};
	}, []);

	return (
		<li
			id={questionObject.id}
			className="question-box"
			style={{
				width: '100%',
				padding: '5px 0',
				borderBottom: 'solid 1px #d5d5d5',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
			}}
			key={questionObject.chapterId}
			// data-level={questionObject.level}
			// data-chapterId={questionObject.chapterId}
		>
			<div
				className="control flex-center"
				style={{
					width: '100%',
					justifyContent: 'space-between',
					padding: '0 15px',
				}}
			>
				<input
					type="checkbox"
					name=""
					data-level={questionObject.level}
					data-chapterid={questionObject.chapterId}
					id={questionObject.id}
					style={{
						width: '18px',
						height: '18px',
						marginRight: '5px',
						cursor: 'pointer',
					}}
				/>

				<select
					name="level"
					id="level"
					className="tool-btn"
					style={{
						// position: "absolute",
						width: '120px',
						height: '25px',
						top: '0',
						left: '100%',
						border: 'none',
						outline: 'none',
						textAlign: 'center',
						borderRadius: '2px',
						cursor: 'pointer',
					}}
				>
					<option value="0">Mức độ: Dễ</option>
					<option value="1">Mức độ: Khó</option>
				</select>

				<i
					className="edit-btn fa-solid fa-pen-to-square"
					style={{ fontSize: '1.5rem', color: '#777', cursor: 'pointer' }}
				></i>
			</div>
			<div style={{ width: '100%' }}>
				<div className="flex-center" style={{ width: '100%' }}>
					<input
						name="description"
						type="text"
						placeholder="Câu hỏi"
						title={questionObject.description}
						defaultValue={questionObject.description}
						style={question}
					/>
				</div>

				<div
					className="flex-center flex-direction-col"
					style={{ marginTop: '15px', paddingLeft: '20px' }}
				>
					<div
						className="flex-center"
						style={{ width: '100%', height: '40px' }}
					>
						<input
							type="radio"
							name={questionObject.id + 'correct'}
							className={questionObject.id + 'correct'}
							value="A"
							style={{
								margin: '0',
								width: '15px',
								height: '15px',
							}}
						/>
						<input
							name="answerA"
							type="text"
							defaultValue={questionObject.answerA}
							style={answer}
						/>
					</div>
					<div
						className="flex-center"
						style={{ width: '100%', height: '40px' }}
					>
						<input
							type="radio"
							name={questionObject.id + 'correct'}
							className={questionObject.id + 'correct'}
							value="B"
							style={{
								margin: '0',
								width: '15px',
								height: '15px',
							}}
						/>
						<input
							name="answerB"
							type="text"
							defaultValue={questionObject.answerB}
							style={answer}
						/>
					</div>
					<div
						className="flex-center"
						style={{ width: '100%', height: '40px' }}
					>
						<input
							type="radio"
							name={questionObject.id + 'correct'}
							className={questionObject.id + 'correct'}
							value="C"
							style={{
								margin: '0',
								width: '15px',
								height: '15px',
							}}
						/>
						<input
							name="answerC"
							type="text"
							defaultValue={questionObject.answerC}
							style={answer}
						/>
					</div>
					<div
						className="flex-center"
						style={{ width: '100%', height: '40px' }}
					>
						<input
							type="radio"
							name={questionObject.id + 'correct'}
							className={questionObject.id + 'correct'}
							value="D"
							style={{
								margin: '0',
								width: '15px',
								height: '15px',
							}}
						/>
						<input
							name="answerD"
							type="text"
							defaultValue={questionObject.answerD}
							style={answer}
						/>
					</div>
				</div>
			</div>
		</li>
	);
}

const getParentElement = (childElement, parentSelector) => {
	while (childElement.parentElement) {
		if (childElement.parentElement.matches(parentSelector)) {
			return childElement.parentElement;
		}
		childElement = childElement.parentElement;
	}
};

function clearErrorMessage(selector) {
	let parentElement = getParentElement(
		document.querySelector(selector),
		'.form-group'
	);

	document.querySelector(selector).innerText = '';
	parentElement.classList.remove('invalid');
}

function disableInput(isAllowedToDelete) {
	document.querySelectorAll('.question-box input').forEach((input) => {
		if (input.type === 'checkbox') {
			if (isAllowedToDelete) {
				input.disable = false;
			} else {
				console.log(1);
				input.disabled = true;
			}
		} else {
			input.disabled = true;
		}
	});

	document
		.querySelectorAll('.question-box select')
		.forEach((input) => (input.disabled = true));
}

function editQuestion(editQuestionArray, isAllowedToPut) {
	document.querySelectorAll('.question-box .edit-btn').forEach((editIcon) => {
		editIcon.addEventListener('click', (e) => {
			let questionBox = editIcon.closest('.question-box');
			questionBox.querySelectorAll('input').forEach((input) => {
				input.disabled = false;

				input.addEventListener('change', () => {
					if (
						editQuestionArray.find((item) => item == questionBox.id) ===
						undefined
					) {
						editQuestionArray.push(questionBox.id);
					}
				});
			});

			questionBox.querySelectorAll('select').forEach((select) => {
				select.disabled = false;
				select.addEventListener('change', () => {
					if (
						editQuestionArray.find((item) => item == questionBox.id) ===
						undefined
					) {
						editQuestionArray.push(questionBox.id);
					}
				});
			});
		});
	});
}

function Bank() {
	const currentUser = localStorage.getItem('currentUser');
	const navigator = useNavigate();

	const [examChapter, setExamChapter] = useState([]);
	const [examQuestions, setExamQuestions] = useState([]);
	const [chapters, setChapters] = useState([]);
	const [lectureList, setLectureList] = useState([]);
	const [lectureId, setLectureId] = useState([]);
	const editQuestionArray = [];
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingData, setIsLoadingData] = useState(false);
	let editedQuestion = [];
	const Outlet = useOutlet();

	const { permissions } = useOutletContext();

	console.log(lectureList);

	const isAllowedToAdd = permissions.find((x) => x.id === 13);
	const isAllowedToDelete = permissions.find((x) => x.id === 15);
	const isAllowedToPut = permissions.find((x) => x.id === 14);

	// const easyElement = document.getElementById('easy');
	// const hardElement = document.getElementById('hard');
	// const totalElement = document.getElementById('totalQuestions');

	// window.onbeforeunload = preventFunc(e);

	window.addEventListener(
		'beforeunload',
		(e) => {
			e.preventDefault();
			window.confirm('warning');
		},
		false
	);

	useEffect(() => {
		fetch(`${api}/lectures/user`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((data) => data.json())
			.then((data) => {
				setLectureList(data.data);
				setIsLoadingData(false);
			});
	}, []);

	// ----- Fetch API to get Chapters from Subject -----

	const getExamChapter = async () => {
		setIsLoadingData(true);
		setExamQuestions([]);
		await fetch(`${api}/lectures/${lectureId}/chapters`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((data) => data.json())
			.then((data) => {
				setExamChapter(data.data);
				setIsLoadingData(false);
			});
	};

	useEffect(() => {
		getExamChapter();
	}, [lectureId]);

	// ----- Fetch API to get Questions from Chapters -----

	const getExamQuestions = async () => {
		setIsLoadingData(true);
		await fetch(
			// `${api}/classes/841109222-12/chapters/questions?chapters=${chapters}`,
			`${api}/lectures/${lectureId}/chapters/${chapters}/questions`,
			{
				headers: {
					Authorization: 'Bearer ' + currentUser,
				},
			}
		)
			.then((data) => data.json())
			.then((data) => {
				console.log(data.data);
				setExamQuestions(data.data);
				setIsLoadingData(false);
			});
	};

	useEffect(() => {
		if (chapters != 'Chọn chương') {
			getExamQuestions();
		}
	}, [chapters]);

	// ----- Handle when change question list -----

	useEffect(() => {
		let easy = 0;
		let hard = 0;
		examQuestions?.forEach((question) => {
			console.log(question.level);
			question.level === 0 || question.level === '0'
				? (easy += 1)
				: (hard += 1);
		});

		document.getElementById('easy').value = easy;
		document.getElementById('hard').value = hard;

		examQuestions?.forEach((question) => {
			const questionBox = document.getElementById(`${question.id}`);
			question.level === 0
				? (questionBox.style.borderLeft = 'solid 5px #1f2ec9')
				: (questionBox.style.borderLeft = 'solid 5px #d3ae56');
		});
		console.log(examQuestions);
		disableInput(isAllowedToDelete);
		editQuestion(editQuestionArray, isAllowedToPut);
	}, [examQuestions, permissions]);

	function deleteQuestion() {
		let deleteQuestionId = [];
		let arr = examQuestions;
		document
			.querySelectorAll('input[type=checkbox]:checked')
			.forEach((checkbox) => {
				arr = arr.filter((item) => parseInt(item.id) !== parseInt(checkbox.id));

				let temp = { id: checkbox.id };
				deleteQuestionId.push(temp);
			});
		setExamQuestions(arr);

		setIsLoading(true);

		fetch(`${api}/lectures/841109/chapters/${chapters}/questions`, {
			body: JSON.stringify(deleteQuestionId),
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + currentUser,
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			if (!res.ok) {
				setIsLoading(false);
				alert('Thay đổi không thành công! Vui lòng thử lại.');
			} else if (res.ok) {
				alert('Thay đổi thành công!');
				setIsLoading(false);
			}
		});
	}

	function saveChange(editQuestionArray, editedQuestion) {
		console.log(editQuestionArray);
		editQuestionArray?.forEach((item) => {
			const tempQuestion = {};
			console.log(item);
			const questionBox = document.getElementById(`${item}`);
			questionBox.querySelectorAll('input[type="text"]').forEach((input) => {
				console.log(input.name, input.value);
				tempQuestion[input.name] = input.value;

				// tempQuestion.push(`${input.name}: ${input.value}`);
			});

			questionBox
				.querySelectorAll('input[type="radio"]:checked')
				.forEach((input) => {
					console.log(input.name, input.value);
					tempQuestion[input.name] = input.value;

					// tempQuestion.push(`${input.name}: ${input.value}`);
				});

			const levelSelect = questionBox.querySelector('select');
			console.log(levelSelect.name, levelSelect.value);
			tempQuestion[levelSelect.name] = levelSelect.value;
			// tempQuestion.push(`${input.name}: ${input.value}`)

			editedQuestion.push(tempQuestion);
		});
		console.log(editedQuestion);
		setIsLoading(true);

		fetch(`${api}/lectures/841109/chapters/${chapters}/questions`, {
			body: JSON.stringify(editedQuestion),
			method: 'PUT',
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		}).then((res) => {
			if (!res.ok) {
				setIsLoading(false);
				alert('Thay đổi không thành công! Vui lòng thử lại.');
			} else if (res.ok) {
				alert('Thay đổi thành công!');
				setIsLoading(false);
			}
		});
	}

	return (
		<>
			{Outlet || (
				<>
					<div className="create-select-from-bank__layout">
						<div className="bank-menu">
							{isAllowedToAdd && (
								<button
									className="add-new-question"
									onClick={(e) => {
										navigator('../addQuestion');
									}}
								>
									Thêm câu hỏi
								</button>
							)}
							{isAllowedToDelete && (
								<button
									className="remove-question"
									onClick={() => deleteQuestion()}
								>
									Xóa câu hỏi đã chọn
								</button>
							)}
						</div>
						<div id="bank">
							<div className="flex-center flex-direction-col info-box__select-from-bank">
								<ul
									className="flex-center flex-direction-col"
									style={inputList}
								>
									<li
										className="flex-center form-group"
										style={{
											width: '100%',
											margin: '5px 0',
											flexDirection: 'row',
											alignItems: 'flex-start',
											height: '40px',
										}}
									>
										<label
											htmlFor="examId"
											style={label}
											className="form-label"
										>
											Mã môn
										</label>
										<div
											style={{
												flex: '1',
												// width: "50%",
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-start',
											}}
										>
											{/* <input
                                    className="form-control"
                                    type="text"
                                    name="examId"
                                    id="examId"
                                    placeholder="Nhập mã môn học"
                                    style={{
                                       fontSize: "1.4rem",
                                       paddingLeft: "10px",
                                       flex: "1",
                                       height: "30px",
                                       outline: "none",
                                       borderRadius: "4px",
                                       border: "solid 2px #BFBFBF",
                                    }}
                                    onChange={(e) =>
                                       setLectureId(e.target.value)
                                    }
                                 /> */}

											<select
												className="form-control"
												type="text"
												name="examId"
												id="examId"
												onChange={(e) => setLectureId(e.target.value)}
											>
												<option value="" disabled selected>
													Chọn môn
												</option>
												{lectureList?.map((lecture) => {
													return (
														<option value={lecture.id}>{lecture.id}</option>
													);
												})}
											</select>

											<label htmlFor="examId" className="form-message"></label>
										</div>
									</li>

									<li
										className="flex-center form-group"
										style={{
											width: '100%',
											margin: '5px 0',
											flexDirection: 'row',
											alignItems: 'flex-start',
											height: '40px',
										}}
									>
										<label
											htmlFor="examId"
											style={label}
											className="form-label"
										>
											Chương
										</label>
										<div
											style={{
												flex: '1',
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-start',
											}}
										>
											<select
												className="form-control"
												type="text"
												name="chapter"
												id="chapter"
												style={{
													fontSize: '1.4rem',
													paddingLeft: '10px',
													maxWidth: '150px',
													flex: '1',
													height: '30px',
													outline: 'none',
													borderRadius: '4px',
													border: 'solid 2px #BFBFBF',
												}}
												onChange={(e) => {
													setChapters(e.target.value.split(' ')[1]);
												}}
											>
												<option className="chapter flex-center">
													<span>Chọn chương</span>
												</option>
												{examChapter?.map((chapter, index) => {
													if (chapter.name !== 'Chương chung') {
														return (
															<option
																className="chapter flex-center"
																key={index}
															>
																<span>Chương {index}</span>
															</option>
														);
													}
												})}
											</select>
										</div>
									</li>

									<li
										className="flex-center form-group"
										style={{
											width: '100%',
											margin: '5px 0',
											flexDirection: 'row',
											alignItems: 'flex-start',
											height: '40px',
										}}
									>
										<label htmlFor="easy" style={label} className="form-label">
											Dễ
										</label>

										<div
											style={{
												flex: '1',
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-start',
											}}
										>
											<input
												rules="require"
												className="form-control"
												disabled="true"
												type="text"
												name="easy"
												id="easy"
												style={{
													width: '150px',
													fontSize: '1.4rem',
													paddingLeft: '10px',
													flex: '1',
													height: '30px',
													outline: 'none',
													borderRadius: '4px',
													border: 'solid 2px #BFBFBF',
													textAlign: 'center',
													color: '#1f2ec9',
													fontWeight: '600',
												}}
											/>
											<label
												htmlFor="easy"
												className="form-message easy"
											></label>
										</div>
									</li>

									<li
										className="flex-center form-group"
										style={{
											width: '100%',
											margin: '5px 0',
											flexDirection: 'row',
											alignItems: 'flex-start',
											height: '40px',
										}}
									>
										<label htmlFor="hard" style={label} className="form-label">
											Khó
										</label>

										<div
											style={{
												flex: '1',
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'flex-start',
											}}
										>
											<input
												rules="require"
												className="form-control"
												disabled="true"
												type="text"
												name="hard"
												id="hard"
												style={{
													width: '150px',
													fontSize: '1.4rem',
													paddingLeft: '10px',
													flex: '1',
													height: '30px',
													outline: 'none',
													borderRadius: '4px',
													border: 'solid 2px #BFBFBF',
													textAlign: 'center',
													color: '#d3ae56',
													fontWeight: '600',
												}}
											/>
											<label
												htmlFor="hard"
												className="form-message hard"
											></label>
										</div>
									</li>
								</ul>

								{isAllowedToPut && (
									<button
										className="create-exam-btn-pc"
										onClick={() => {
											saveChange(editQuestionArray, editedQuestion);
										}}
									>
										Lưu
									</button>
								)}
							</div>

							<div className="question-list_container">
								<ul
									className="flex-center flex-direction-col question-list position-relative"
									style={{
										height: '100%',
										overflowY: 'scroll',
										width: '100%',
										justifyContent: 'flex-start',
									}}
								>
									{examQuestions?.map((item) => (
										<Question
											questionObject={item}
											isAllowedToPut={isAllowedToPut}
											isAllowedToDelete={isAllowedToDelete}
											key={item.id}
										/>
									))}
									{isLoadingData && <LoadingData />}
								</ul>
							</div>

							{isAllowedToPut && (
								<button
									className="create-exam-btn-tablet"
									style={{ marginTop: '10px' }}
									onClick={() => {
										saveChange(editQuestionArray, editedQuestion);
									}}
								>
									Lưu
								</button>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default Bank;
