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
// import socket from '../../../../../utils/socket';

function Test() {
	const [questions, setQuestions] = useState([]); //Chứa mảng câu hỏi
	const [isOpen, setIsOpen] = useState(false); //Bật tắt modal confirm
	const [answer, setAnswer] = useState([]);
	const [clickedOutside, setClickedOutside] = useState(0);
	const [intervalId, setIntervalId] = useState(null);
	const navigator = useNavigate();
	const [submitted, setSubmitted] = useState({
		text: 'Nộp bài',
		status: false,
	}); //Chứa trạng thái thí sinh đã nộp bài hay chưa
	// const [isDone, setIsDone] = useState(false);

	const [duration, setDuration] = useState();
	const [apiDuration, setApiDuration] = useState();
	const params = useParams();
	const { examId } = params;
	const { state } = useLocation();
	// const []

	useEffect(() => {
		const currentUser = localStorage.getItem('currentUser');

		fetch(`${api}/classes/${state?.classId}/exams/${examId}/details`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((response) => response.json())
			.then((questionsAPI) => {
				setQuestions(questionsAPI.data.content);
				setSubmitted({
					...submitted,
					status: questionsAPI.data.isDone,
				});
				// clearInterval(intervalId);
				setApiDuration(questionsAPI.data.duration);
				// startTimer(questionsAPI.data.duration);
			})

			.then(() => {})
			.catch((error) => {
				console.log(error);
			});
		return () => {
			// clearInterval(a);
			// window.removxeEventListener('blur', handleBlur);
		};
	}, []);

	// const handleBeforeUnload = (e) => {
	// 	e.preventDefault();
	// 	setIsOpen(true);
	// 	console.log(1);
	// 	clearInterval(intervalId);
	// 	e.returnValue = '';
	// 	return '';
	// 	//
	// };

	useEffect(() => {
		const handleOnBlur = (e) => {
			setClickedOutside((prev) => prev + 1);
		};

		const handleBeforeUnload = (e) => {
			e.preventDefault();
			e.returnValue = '';
			setIsOpen(true);
			return '';
		};

		window.addEventListener('blur', handleOnBlur);
		window.addEventListener('beforeunload', handleBeforeUnload);
		window.addEventListener('popstate', handleBeforeUnload);
		return () => {
			window.removeEventListener('blur', handleOnBlur);
			window.removeEventListener('beforeunload', handleBeforeUnload);
			window.removeEventListener('popstate', handleBeforeUnload);
		};
	}, []);
	console.log(clickedOutside);
	const handleSubmit = () => {
		setSubmitted({
			text: 'Xem điểm',
			status: true,
		});
	};

	return (
		<>
			<div className="content-table doing-test">
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
					apiDuration={apiDuration}
					setDuration={setDuration}
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
