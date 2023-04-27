import Info from '../Info';
import api from '../../../../../config/config.js';
import { useParams, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ExamItem from './ExamItem';
import ExamFilter from './ExamFilter';

function StudentPage() {
	const [exams, setExams] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams({ sort: 'all' });
	const params = useParams();
	const { classId } = params;

	useEffect(() => {
		const currentUser = localStorage.getItem('currentUser');
		fetch(
			`${api}/classes/${classId}/exams?sort=${
				searchParams.get('sort') === 'all' ? '' : searchParams.get('sort')
			}`,
			{
				headers: {
					Authorization: 'Bearer ' + currentUser,
				},
			}
		)
			.then((response) => response.json())
			.then((examsAPI) => {
				setExams(examsAPI.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [searchParams]);
	console.log(searchParams);
	return (
		<>
			{/* <Info
        personalCode={idStudent}
        nameStudent={nameStudent}
        classId={classId}
        backHref={`/viewclass/${idStudent}/${nameStudent}`}
      /> */}

			<div
				class="table-zone grid"
				style={{
					borderRadius: '0 16px 16px 16px',
				}}
				onClick={() => setIsOpen(false)}
			>
				<header class="table__header">
					<h1 class="table__heading">DANH SÁCH BÀI THI</h1>

					<ExamFilter
						setSearchParams={setSearchParams}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
					/>
				</header>

				<div class="grid table__content">
					<ul class="container__row container__row--header">
						<li>
							<h3>Mã đề</h3>
						</li>

						<li>
							<h3>Tên đề</h3>
						</li>

						<li>
							<h3>Môn</h3>
						</li>

						<li>
							<h3>Thời gian làm bài</h3>
						</li>

						<li>
							<h3>Số câu hỏi</h3>
						</li>

						<li></li>
					</ul>

					<div
						className="flex-container container--body"
						style={{ overflowY: 'auto', height: 400 }}
					>
						{exams?.map(
							(item) =>
								(
									<ExamItem
										exam={item.id}
										idExam={item.exam_id}
										nameExam={item.exam_name}
										subject={item.lecture_name}
										timeStart={item.duration}
										totalQuestions={item.totalQuestions}
										isDone={item.isDone}
										isLock={item.isLock}
										classId={classId}
									/>
								) || <span> Không có bài thi nào</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default StudentPage;
