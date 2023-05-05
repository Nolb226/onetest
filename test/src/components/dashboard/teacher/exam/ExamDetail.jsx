import { useEffect, useState } from 'react';
import api from '../../../../config/config';
import { useNavigate, useParams } from 'react-router';
import LoadingData from '../../../loadingAnimation/LoadingData';
import { Link } from 'react-router-dom';

function ExamDetail() {
	const currentUser = localStorage.getItem('currentUser');
	const navigator = useNavigate();
	const [examDetailData, setExamDetailData] = useState({});
	const [isLoadingData, setIsLoadingData] = useState(false);
	const [errorLoadingData, setErrorLoadingData] = useState('');
	const { examId } = useParams();

	const getExamDetailData = async () => {
		setIsLoadingData(true);
		await fetch(`${api}/classes/exams/${examId}/students`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((data) => data.json())
			.then((data) => {
				setExamDetailData(data.data);
				setIsLoadingData(false);
			})
			.catch(() => {
				setErrorLoadingData('Không thể lấy dữ liệu. Vui lòng thử lại !');
				setIsLoadingData(false);
			});
	};

	useEffect(() => {
		getExamDetailData();
	}, []);

	// const handleLock = (classID, exam) => {
	//    fetch(`${api}/classes/${classID}/exams/${exam.id}`, {
	//       method: "PATCH",
	//       body: JSON.stringify({
	//          isLock: !exam.isLock,
	//       }),
	//       headers: {
	//          Authorization: "Bearer " + currentUser,
	//          "Content-type": "application/json",
	//       },
	//    }).then((response) => response.json());

	//    setExamDetailData(updateLockExam(classID, exam.id));
	// };

	const updateLockExam = (classID, examID) => {
		return examDetailData.map((exam) => {
			if (exam.class_id === classID && exam.id === examID) {
				exam.isLock = !exam.isLock;
				console.log(exam.isLock);
			}
			return exam;
		});
	};

	const vietNamFomatter = new Intl.DateTimeFormat('vi-VN', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});

	return (
		<>
			<div className="flex-center search-bar" style={{ display: 'none' }}>
				<input
					type="text"
					className="search-input"
					placeholder="Nhập mã đề thi"
				/>
				<button
					className="flex-center join-button"
					onClick={() => {
						navigator('create', { relative: 'path' });
					}}
				>
					<i className="fa-solid fa-plus"></i>
					<span>Tạo bài thi</span>
				</button>
			</div>

			<div className="class-information">
				<h1 class="table__heading">Đề thi:&nbsp;Exam01 - 42</h1>
			</div>

			<div className="table-zone">
				<header className="table__header">
					<ul
						className="table__content--heading"
						style={{
							display: 'grid',
							gridTemplateColumns: '5% 15% 35% 15% 10% 5% 15%',
						}}
					>
						<li className="flex-center column-text">
							<h3>STT</h3>
						</li>

						<li className="flex-center column-text">
							<h3>MSSV</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Họ và tên</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Ngày sinh</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Rời trang</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Điểm</h3>
						</li>

						<li
							className="flex-center column-text"
							style={{
								marginLeft: '5.5rem',
								// textAlign: 'center',
							}}
						>
							Chi tiết
						</li>
					</ul>
					<div className="filter-box"></div>
				</header>

				<div className="grid table__content">
					<div className="table__content--list position-relative">
						{errorLoadingData && (
							<div
								className="flex-center"
								style={{
									width: '100%',
									height: '100%',
									fontSize: '1.6rem',
									color: '#777',
								}}
							>
								{errorLoadingData}
							</div>
						)}
						{isLoadingData && <LoadingData />}

						{examDetailData.students?.map((student, number) => {
							return (
								<ul
									className="table__content-teacher--row table__content--item"
									style={{
										display: 'grid',
										gridTemplateColumns: '5% 15% 35% 15% 10% 5% 15%',
									}}
									key={student.id}
								>
									<li className="flex-center column-text ">{number + 1}</li>

									<li className="flex-center column-text">
										<h3>{student.account_id}</h3>
									</li>

									<li className="flex-center column-text">
										<h3>{student.fullname}</h3>
									</li>

									<li className="flex-center column-text">
										<h3>{vietNamFomatter.format(new Date(student.dob))}</h3>
									</li>

									<li className="flex-center column-text">
										<h3>{student.studentresult.clickedOutside}</h3>
									</li>

									<li className="flex-center column-text">
										<h3>{student.studentresult.grade}</h3>
									</li>
									<li
										className="flex-center column-text"
										style={{
											marginLeft: '4rem',
										}}
									>
										<Link
											to={`${api}/${examDetailData.examId}-${student.account_id}.pdf`}
											target="_blank"
										>
											<button
												className="view-btn download-pdf"
												onClick={() => {
													const currentUser =
														localStorage.getItem(`currentUser`);
													fetch(`${api}/classes/exams/${examId}/pdf`, {
														method: 'POST',
														body: JSON.stringify({
															student: `${student.id}`,
															accountId: student.account_id,
														}),
														headers: {
															Authorization: 'Bearer ' + currentUser,
															'Content-Type': 'application/json',
														},
													});
												}}
											>
												Tải file
												<i className="fa-solid fa-file-pdf"></i>
											</button>
										</Link>
									</li>
								</ul>
							);
						})}
					</div>
				</div>

				<div className="mobile-table-content">
					{/* {examDetailData.map((exam) => {
                  return (
                     <div className="flex-center mobile-table-item">
                        <h3>
                           {exam.name} - {exam.id}
                        </h3>
                        <span>Môn:&nbsp; {exam.lecture_name}</span>
                        <span>Lớp:&nbsp;{exam.class_id}</span>
                        <div className="flex-center lock-exam">
                           <label htmlFor="lock" style={{ color: "#555" }}>
                              Xem đáp án
                           </label>
                           <input
                              type="checkbox"
                              name=""
                              id=""
                              checked={!exam.isLock}
                           />
                        </div>
                        <button className="view-btn">Xem chi tiết</button>
                     </div>
                  );
               })} */}

					<div className="flex-center mobile-table-item">
						<h3>3121410146</h3>
						<span>Nguyễn Trương Khánh Hoàng</span>
						<span>30/10/2003</span>
						<span>Điểm:&nbsp;9.5</span>
						<button className="view-btn download-pdf">
							Tải file
							<i className="fa-solid fa-file-pdf"></i>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ExamDetail;
