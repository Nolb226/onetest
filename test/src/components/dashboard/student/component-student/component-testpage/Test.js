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

	const startTimer = (duration) => {
		const countDownDuration = () => {
			// const currentTime = new Date().getTime();
			// const test = timeEnd - currentTime;

			const hours = String(parseInt(time / 3600, 10)).padStart(2, '0');
			const others = String(parseInt(time % 3600, 10)).padStart(2, '0');
			const minutes = String(parseInt(others / 60, 10)).padStart(2, '0');
			const seconds = String(parseInt(others % 60, 10)).padStart(2, '0');
			// socket.emit('test', { hours, seconds, minutes });
			if (time === 0) {
				clearInterval(timer);
				return;
			}

			time--;
			setDuration({ ...duration, hours, minutes, seconds });
		};
		// let time = duration * 60;
		let time = parseInt(duration, 10);

		countDownDuration();
		let timer = setInterval(countDownDuration, 1000);
		console.log(timer);
		return timer;
	};

	useEffect(() => {
		const handlePopState = () => {
			socket.emit('exam:end', {
				duration,
			});
		};

		const handleBlur = () => {
			if (!document.hasFocus()) {
				socket.emit('exam:click');
			}
		};

		const handleBeforeUnload = () => {
			socket.emit('exam:end', {
				duration,
			});
		};

		window.addEventListener('blur', handleBlur);

		const currentUser = localStorage.getItem('currentUser');
		let test;

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
				clearInterval(test);
				test = startTimer(questionsAPI.data.duration);
			})

			.then(() => {
				window.addEventListener('popstate', handlePopState);
				window.addEventListener('beforeunload', handleBeforeUnload);
			})
			.catch((error) => {
				console.log(error);
			});

		// clearInterval(test);

		socket.on('exam:clear', () => {
			console.log('|||||||||||||');
			clearInterval(test);
			console.log(test);
		});
		console.log(test);

		return () => {
			console.log(`Before ${test}`);
			clearInterval(test);
			console.log(`After ${test}`);
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
