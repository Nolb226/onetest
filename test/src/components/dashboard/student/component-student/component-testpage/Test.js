import { useEffect, useState } from 'react';
import {
	Link,
	redirect,
	useLocation,
	useNavigate,
	useParams,
} from 'react-router-dom';
import ConfirmModel from './ConfirmModel';
import AnswerSelectItem from './AnswerSelectItem';
import QuestionItem from './QuestionItem';
import Info from '../Info';
import api from '../../../../../config/config';
import QuestionsRender from './QuestionsRender';

function Test() {
	const [questions, setQuestions] = useState([]); //Chứa mảng câu hỏi
	const [isOpen, setIsOpen] = useState(false); //Bật tắt modal confirm
	const [answer, setAnswer] = useState([]);
	const navigator = useNavigate();
	const [submitted, setSubmitted] = useState({
		text: 'Nộp bài',
		status: false,
	}); //Chứa trạng thái thí sinh đã nộp bài hay chưa
	// const [isDone, setIsDone] = useState(false);
	const [duration, setDuration] = useState();
	const params = useParams();
	const { examId } = params;
	const { state } = useLocation();

	useEffect(() => {
		const currentUser = localStorage.getItem('currentUser');
		fetch(`${api}/classes/${state?.classId}/exams/${examId}/details`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((response) => response.json())
			.then((questionsAPI) => {
				// console.log(questionsAPI.data.content);
				setQuestions(questionsAPI.data.content);
				setSubmitted({
					...submitted,
					status: questionsAPI.data.isDone,
				});
				console.log(submitted.status);
				if (!submitted.status) {
					startTimer(questionsAPI.data.duration);
				}
			})
			.then(() => {
				// console.log(duration);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	if (!state?.classId || submitted.status) {
		navigator(`../`);
	}

	const startTimer = (duration) => {
		const countDownDuration = () => {
			let minutes = String(parseInt(time / 60, 10)).padStart(2, '0');
			let seconds = String(parseInt(time % 60, 10)).padStart(2, '0');
			// console.log(duration);
			if (time === 0) {
				const accesToken = localStorage.getItem('currentUser');
				fetch(`${api}/classes/${state?.classId}/exams/${examId}`, {
					method: 'POST',
					headers: {
						Authorization: 'Bearer ' + accesToken,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ questions: answer }),
				})
					.then(() => {
						alert('Submit r nè');
					})
					.catch((error) => console.log(error));

				// history.push('/class');

				clearInterval(timer);
				return;
			}
			setDuration((duration) => duration - 1);
			// duration--;
			time--;
			console.log(document.querySelector('.confirm-btn.form-btn'));
			setDuration({ minutes, seconds });
		};
		// let time = 10;
		let time = duration * 60;
		countDownDuration();
		const timer = setInterval(countDownDuration, 1000);
		return timer;
	};

	const handleSubmit = () => {
		setSubmitted({
			text: 'Xem điểm',
			status: true,
		});
	};

	return (
		<>
			<div className="empty-space"></div>
			<div className="content-table">
				<QuestionsRender
					answer={answer}
					setAnswer={setAnswer}
					classId={state?.classId}
					questions={questions}
					examId={examId}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					submitted={submitted}
					duration={duration}
				/>
			</div>
			{isOpen && !submitted.status && (
				<ConfirmModel
					isOpen
					setIsOpen={setIsOpen}
					result={answer}
					handleSubmit={handleSubmit}
				/>
			)}
		</>
	);
}

export default Test;
