import { Link } from 'react-router-dom';
import './hoang.css';
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
		// <ul class="row no-gutters flex-center table__content--item">
		// 	<li class="col l-2">
		// 		<h3>{idExam}</h3>
		// 	</li>

		// 	<li class="col l-2">
		// 		<h3>{nameExam}</h3>
		// 	</li>

		// 	<li class="col l-2">
		// 		<h3>{subject}</h3>
		// 	</li>

		// 	<li class="col l-2">
		// 		<h3>{timeStart}</h3>
		// 	</li>

		// 	<li class="col l-2">
		// 		<h3>{totalQuestions}</h3>
		// 	</li>

		// 	<li class="col l-5-1">
		// 		<Link to={`../test/${classId}/${exam}`}>
		// 			<button class="inf-btn take-test">Làm bài</button>
		// 		</Link>
		// 	</li>
		// </ul>
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
				<Link to={`../test/${classId}/${exam}`}>
					<button class="inf-btn take-test">Làm bài</button>
				</Link>
			</li>
		</ul>
	);
}

export default ExamItem;
