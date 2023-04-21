import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ConfirmModel from './ConfirmModel';
import AnswerSelectItem from './AnswerSelectItem';
import QuestionItem from './QuestionItem';
import Info from '../Info';
import api from '../../../../../config/config';
import QuestionsRender from './QuestionsRender';

function Test() {
	const [questions, setQuestions] = useState([]); //Chứa mảng câu hỏi
	const [isOpen, setIsOpen] = useState(false); //Bật tắt modal confirm
	const [answers, setAnswers] = useState([]); //Chứa câu trả lời của thí sinh
	const [submitted, setSubmitted] = useState({
		text: 'Nộp bài',
		status: false,
	}); //Chứa trạng thái thí sinh đã nộp bài hay chưa
	// const [isDone, setIsDone] = useState(false);
	const [duration, setDuration] = useState();

	const params = useParams();
	const { classId, examId } = params;

	useEffect(() => {
		const currentUser = localStorage.getItem('currentUser');
		fetch(`${api}/classes/${classId}/exams/${examId}/details`, {
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

	const startTimer = (duration) => {
		const countDownDuration = () => {
			// console.log(duration);
			if (duration === 0) {
				// alert('hét giờ');
				clearInterval(timer);
				return;
			}
			// setDuration((duration) => duration - 1);
			// duration--;
			setDuration(--duration);
		};

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
					classId={classId}
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
					result={answers}
					handleSubmit={handleSubmit}
				/>
			)}
		</>
	);
}

export default Test;
