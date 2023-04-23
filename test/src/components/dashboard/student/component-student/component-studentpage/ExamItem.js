import { Link } from 'react-router-dom';
import './hoang.css';

function ExamButton({ classId, exam, isDone, isLock }) {
	/* 
		Button_Status :
		- "Done" but not "Lock"
		- "Lock" but not "Done"
		- "Done" and "Lock"
		------------------------
		1. isDone & isLock => Disable button
		2. !isDone & isLock => Normal button
		3. isDone & !isLock => Enable button
	*/

	let status;
	if (isLock) {
		status = 'Lock';
	}
	if (isDone) {
		status = 'Done';
	}

	return (
		<>
			<Link to={`../test/${classId}/${exam}`}>
				<button class="inf-btn take-test">Làm bài</button>
			</Link>
		</>
	);
}

function ExamItem({
	idExam,
	nameExam,
	subject,
	timeStart,
	totalQuestions,
	isDone,
	classId,
	isLock,
	exam,
}) {
	return (
		<ul class="container__row">
			<li class="">
				<h3>{idExam}</h3>
			</li>

			<li class="">
				<h3>{nameExam}</h3>
			</li>

			<li class="">
				<h3>{subject}</h3>
			</li>

			<li class="">
				<h3>{timeStart}</h3>
			</li>

			<li class="">
				<h3>{totalQuestions}</h3>
			</li>

			<li class="">
				<ExamButton
					classId={classId}
					exam={exam}
					isDone={isDone}
					isLock={isLock}
				/>
			</li>
		</ul>
	);
}

export default ExamItem;
