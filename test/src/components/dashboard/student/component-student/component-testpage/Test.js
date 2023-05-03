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
import socket from '../../../../../utils/socket';

function Test() {
	const [questions, setQuestions] = useState([]); //Chứa mảng câu hỏi
	const [isOpen, setIsOpen] = useState(false); //Bật tắt modal confirm
	const [answer, setAnswer] = useState([]);
	const [intervalId, setIntervalId] = useState(null);
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
	// const []

	let timer = null;

	const startTimer = (duration) => {
		const countDownDuration = () => {
			const time = parseInt(duration, 10);
			// -
			// Math.round((new Date().getTime() - startTime) / 1000);

			if (time < 0) {
				clearInterval(timer);
				setDuration({ hours: '00', minutes: '00', seconds: '00' });
				return;
			}

			const hours = String(parseInt(time / 3600, 10)).padStart(2, '0');
			const others = String(parseInt(time % 3600, 10)).padStart(2, '0');
			const minutes = String(parseInt(others / 60, 10)).padStart(2, '0');
			const seconds = String(parseInt(others % 60, 10)).padStart(2, '0');
			setDuration((prev) => ({ ...prev, hours, minutes, seconds }));
		};

		if (!timer) {
			countDownDuration();
			timer = setInterval(countDownDuration, 1000);
		}

		return timer;
	};

	useEffect(() => {
		const handlePopState = () => {
			console.log(duration);
			const test = {
				...duration,
			};
			socket.emit('exam:end', test);
		};

		const handleBlur = () => {
			if (!document.hasFocus()) {
				socket.emit('exam:click');
			}
		};

		const handleBeforeUnload = () => {
			console.log(duration);

			const test = {
				...duration,
			};
			socket.emit('exam:end', test);
		};

		window.addEventListener('blur', handleBlur);

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
				socket.emit('exam:start', {
					id: questionsAPI.data.id,
					timeEnd: questionsAPI.data.timeEnd,
				});
				clearInterval(timer);
				startTimer(questionsAPI.data.duration);
			})

			.then(() => {
				window.addEventListener('popstate', handlePopState);
				window.addEventListener('beforeunload', handleBeforeUnload);
			})
			.catch((error) => {
				console.log(error);
			});

		socket.on('exam:clear', () => {
			clearInterval(timer);
		});
		console.log(timer);

		return () => {
			// console.log(`Before ${test}`);
			clearInterval(timer);
			// console.log(clearInterval(test));
			console.log(`After ${timer}`);
			window.removeEventListener('popstate', handlePopState);
			window.removeEventListener('beforeunload', handleBeforeUnload);
			window.removeEventListener('blur', handleBlur);
		};
	}, []);

	useEffect(() => {}, []);

	socket.on('test', (response) => {
		setDuration(response);
	});
	socket.on('exam:expired', (response) => {
		navigator('../');
	});

	if (!state?.classId || submitted.status) {
		navigator(`./result`);
	}

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
