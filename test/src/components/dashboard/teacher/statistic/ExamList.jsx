import { useEffect, useState } from 'react';
import api from '../../../../config/config';
import { useNavigate } from 'react-router';
import LoadingData from '../../../loadingAnimation/LoadingData';
import { Link } from 'react-router-dom';
import socket from '../../../../util/socket';
import Paginator from '../Class/Paginator';

function StatisticExamList() {
	const currentUser = localStorage.getItem('currentUser');
	const navigator = useNavigate();
	const [examData, setExamData] = useState([]);
	const [isLoadingData, setIsLoadingData] = useState(false);
	const [errorLoadingData, setErrorLoadingData] = useState('');
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);

	const getExamData = async () => {
		setIsLoadingData(true);
		await fetch(`${api}/classes/exams?page=${page}`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((data) => data.json())
			.then((data) => {
				setExamData(data.data.data);
				setIsLoadingData(false);
				setTotalPage(Math.ceil(data.data.total / 10));
			})
			.catch(() => {
				setErrorLoadingData('Không thể lấy dữ liệu. Vui lòng thử lại !');
				setIsLoadingData(false);
			});
	};

	useEffect(() => {
		getExamData();
	}, [page]);

	const handleLock = (classID, exam) => {
		fetch(`${api}/classes/${classID}/exams/${exam.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				isLock: !exam.isLock,
			}),
			headers: {
				Authorization: 'Bearer ' + currentUser,
				'Content-type': 'application/json',
			},
		}).then((response) => response.json());

		setExamData(updateLockExam(classID, exam.id));
	};

	const updateLockExam = (classID, examID) => {
		return examData.map((exam) => {
			if (exam.class_id === classID && exam.id === examID) {
				exam.isLock = !exam.isLock;
				console.log(exam.isLock);
			}
			return exam;
		});
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
		console.log(newPage);
	};

	return (
		<>
			<div className="table-zone manage-exam ">
				<header className="table__header">
					<ul
						className="table__content--heading"
						style={{
							display: 'grid',
							gridTemplateColumns: '19% 35% 24% 10% 12%',
						}}
					>
						<li className="flex-center column-text">
							<h3>Đề thi</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Môn học</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Lớp</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Đã nộp</h3>
						</li>

						<li className="flex-center column-text">Thống kê</li>
					</ul>
					<div className="filter-box"></div>
				</header>
				<div className="grid table__content position-ralative">
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

						{examData.map((exam) => {
							return (
								<ul
									className="table__content-teacher--row table__content--item"
									key={exam.id}
									style={{
										display: 'grid',
										gridTemplateColumns: '19% 35% 24% 10% 12%',
									}}
								>
									<li className="flex-center column-text exam-name">
										<h3>
											{exam.name} - {exam.examId}
										</h3>
									</li>

									<li className="flex-center column-text">
										<h3>{exam.lecture_name}</h3>
									</li>

									<li className="flex-center column-text">
										<h3>{exam.class_id}</h3>
									</li>

									<li className="flex-center column-text test-done">
										<h3>{exam.totals}</h3>
									</li>

									<li className="flex-center column-text">
										<Link
											to={`./${exam.class_id}/${exam.id}/detail-statistic`}
											relative="path"
										>
											<button
												className="view-btn"
												style={{ backgroundColor: '#b30b00' }}
											>
												Xem
											</button>
										</Link>
									</li>
								</ul>
							);
						})}
					</div>
					<Paginator
						handlePageChange={handlePageChange}
						page={page}
						totalPage={totalPage}
					/>
				</div>

				<div className="mobile-table-content">
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
					{examData.map((exam) => {
						return (
							<div className="flex-center mobile-table-item">
								<h3>
									{exam.name} - {exam.id}
								</h3>
								<span>Môn:&nbsp; {exam.lecture_name}</span>
								<span>Lớp:&nbsp;{exam.class_id}</span>
								<span>Đã nộp:&nbsp;{exam.totals}</span>
								<Link to={`./${exam.id}/detail-statistic`} relative="path">
									<button
										className="view-btn"
										style={{
											backgroundColor: '#b30b00',
											width: '80%',
											minWidth: '110px',
										}}
									>
										Thống kê
									</button>
								</Link>
							</div>
						);
					})}
				</div>
				<Paginator
					handlePageChange={handlePageChange}
					page={page}
					totalPage={totalPage}
				/>
			</div>
		</>
	);
}

export default StatisticExamList;
