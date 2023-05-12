import { useState, useEffect } from 'react';
import Student from './Student';
import Paginator from './Paginator';
import api from '../../../../config/config';
import StudentEdit from './StudentEdit';
import { useParams } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import excel from '../../../../image/excel.svg';

function Classlist(prop) {
	const { classId } = useParams();
	const [studentList, setStudentList] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [studentId, setStudentId] = useState('');
	const [student, setStudent] = useSearchParams();
	const [className, setClassName] = useState('');
	const [totalExam, setTotalExam] = useState(0);
	const [examName, setExamName] = useState([]);
	const [change, setChange] = useState(false);

	const handleClassList = () => {
		const currentUser = localStorage.getItem(`currentUser`);
		fetch(`${api}/classes/${classId}/students?page=${page}`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((res) => res.json())
			.then((studentList) => {
				console.log(studentList.data);
				setClassName(studentList.data.class_name);
				setStudentList(studentList.data.data);
				setTotalExam(studentList.data.total_exam);
				setExamName(studentList.data.exam_name);
				setTotalPage(Math.ceil(studentList.data.total / 10));
			});
	};

	useEffect(() => {
		handleClassList();
	}, [page, change]);

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	// const array = ["test1", "test2", "tes3", "test4", "tes5", "test6", "test7"];

	// // quay lại
	// const returnBtn = document.querySelector(".return");
	// returnBtn.addEventListener("click", () => {
	//   prop.handleClassList("");
	// });

	const handleClickStudent = (id) => {
		console.log(id);
		setStudentId(id);

		// setStudentId(clickedRow.dataset.id);
		setIsOpenModal(!isOpenModal);
	};

	const handleStudentList = (id, newStudent) => {
		const list = studentList.map((student) => {
			if (student.id === id) {
				console.log(student);
				return { ...student, ...newStudent };
			}
			return student;
		});

		setStudentList(list);
		// setIsOpenModal(!isOpenModal)
	};

	const handleStudentListDelete = () => {
		page == 1 ? setChange(!change) : setPage(1);
	};

	return (
		<>
			<div class="flex-center search-bar">
				<input
					type="text"
					class="search-input"
					placeholder="Nhập mã sinh viên"
				/>
			</div>
			<div className="class-information">
				<h1 class="table__heading">Lớp:&nbsp; {className} </h1>
				<div className="excel-download-box">
					<Link to={`${api}/${classId}.xlsx`}>
						<button
							className="excel-download"
							onClick={() => {
								const currentUser = localStorage.getItem(`currentUser`);

								fetch(`${api}/classes/${classId}/excels`, {
									method: 'POST',
									body: JSON.stringify({
										students: studentList,
									}),
									headers: {
										Authorization: 'Bearer ' + currentUser,
										'Content-Type': 'application/json',
									},
								});
							}}
						>
							<span className="fake-scroll-down">
								<span className="scroll-item">
									<i class="fa-solid fa-file-arrow-down"></i>
									<span className="excel-download__text"> Excel</span>
								</span>
								<span className="scroll-item">
									<i class="fa-regular fa-file-excel"></i>
									<span className="excel-download__text">
										Tải Danh Sách Lớp
									</span>
								</span>
							</span>
						</button>
					</Link>
				</div>
			</div>
			<div class="table-zone grid position-relative">
				<div class="grid table__content position-relative">
					<header className="table__header">
						<ul
							className="flex-center table__content--heading"
							style={{
								display: 'grid',
								// gridTemplateColumns: "4% 12% 32% 14% 14% 14% 10%",
								gridTemplateColumns: '4% 12% 32% 42% 10%',
							}}
						>
							<li className="flex-center column-text">
								<h3>STT</h3>
							</li>

							<li class="flex-center column-text">
								<h3>MSSV</h3>
							</li>

							<li class="flex-center column-text">
								<h3>Họ và Tên</h3>
							</li>

							<li class="flex-center column-text" style={{}}>
								{examName.map((value, index) => {
									let widthItem = 100 / examName.length;
									if (totalExam < 6) {
										return (
											<div
												style={{
													width: `${widthItem}%`,
													textAlign: 'left',
												}}
											>
												<h3>{value.name}</h3>
											</div>
										);
									}
								})}
							</li>

							<li className="flex-center column-text"></li>
						</ul>
					</header>
					<div class="table__content--list">
						{studentList.length === 0 ? (
							<div className="flex-center" style={{ height: '100%' }}>
								<h1 class="noClass">Không có sinh viên</h1>
							</div>
						) : (
							studentList.map((student, index) => {
								return (
									<Student
										key={student.id}
										student={student}
										index={index}
										numberOfTest={totalExam}
										page={page}
										handleClickStudent={handleClickStudent}
										setStudent={setStudent}
									/>
								);
							})
						)}
					</div>
				</div>

				<div className="mobile-table-content">
					{studentList.length === 0 ? (
						<div className="flex-center" style={{ height: '100%' }}>
							<h1 class="noClass">Không có sinh viên</h1>
						</div>
					) : (
						studentList.map((student, index) => {
							return (
								<div className="flex-center mobile-table-item">
									<h3>{student.account_id}</h3>
									<h3>{student.lastName + ' ' + student.firstName}</h3>
									{totalExam == 0
										? ''
										: examName.map((exam, index) => (
												<span>
													{exam.name}: {student?.studentresults[index]?.grade}
												</span>
										  ))}
									<div
										className="flex-center"
										onClick={(e) => handleClickStudent(student.id)}
										style={{
											height: '25px',
										}}
									>
										<i
											class="fa-regular fa-pen-to-square"
											style={{
												fontSize: '1.5rem',
												color: 'var(--highlight-color)',
											}}
										></i>
									</div>
								</div>
							);
						})
					)}
				</div>
				<Paginator
					handlePageChange={handlePageChange}
					page={page}
					totalPage={totalPage}
				/>
				{isOpenModal && (
					<StudentEdit
						// student={student}
						setIsOpenModal={setIsOpenModal}
						isOpenModal
						studentId={studentId}
						handleStudentList={handleStudentList}
						handleStudentListDelete={handleStudentListDelete}
						classId={classId}
					/>
				)}
			</div>
		</>
	);
}

export default Classlist;
