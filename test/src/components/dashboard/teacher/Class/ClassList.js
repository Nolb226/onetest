import { useState, useEffect } from 'react';
import Student from './Student';
import Paginator from './Paginator';
import api from '../../../../config/config';
import StudentEdit from './StudentEdit';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
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
		console.log(newPage);
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

			<div class="table-zone grid position-relative">
				<h1 class="table__heading">{className} </h1>
				<div className="excel-download-box">
					<button className="excel-download" onClick={() => {}}>
						<span className="fake-scroll-down">
							<span className="scroll-item">
								<i class="fa-solid fa-file-arrow-down"></i>
								<span className="excel-download__text"> Excel</span>
							</span>
							<span className="scroll-item">
								<i class="fa-regular fa-file-excel"></i>
								<span className="excel-download__text">Tải Danh Sách Lớp</span>
							</span>
						</span>
					</button>
				</div>
				<div class="grid table__content position-relative">
					<ul
						class="row no-gutters flex-center table__content--heading"
						style={{
							justifyContent: 'start',
						}}
					>
						<li className="col l-1 m-1">
							<h3>STT</h3>
						</li>

						<li class="col l-2 m-2">
							<h3>MSSV</h3>
						</li>

						<li class="col l-3 m-3">
							<h3>Họ và Tên</h3>
						</li>

						{examName.map((value, index) => {
							let col;
							if (totalExam < 6) {
								col = Math.floor(5 / totalExam);
							} else {
								col = Math.ceil(5 / totalExam);
							}
							if (index < 5) {
								return (
									<li className={`col l-${col} m-${col}`}>
										<h3>{value.name}</h3>
									</li>
								);
							}
						})}

						<li className="col l-1 m-1"></li>
					</ul>

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
