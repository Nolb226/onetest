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
import socket from '../../../../../util/socket';
// import socket from '../../../../../utils/socket';

function Test() {
	const [questions, setQuestions] = useState([]); //Chứa mảng câu hỏi
	const [isOpen, setIsOpen] = useState(false); //Bật tắt modal confirm
	const [answer, setAnswer] = useState([]);

	const [submitted, setSubmitted] = useState({
		text: 'Nộp bài',
		status: false,
	}); //Chứa trạng thái thí sinh đã nộp bài hay chưa
	// const [isDone, setIsDone] = useState(false);

	const [duration, setDuration] = useState();

	const [modalType, setModalType] = useState('submit');

	const params = useParams();
	const { examId } = params;
	const { state } = useLocation();
	// const []

	const handleSubmitAnswer = (e) => {
		e.preventDefault();

		const accesToken = localStorage.getItem('currentUser');
		fetch(`${api}/classes/${state?.classId}/exams/${examId}`, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + accesToken,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ questions: answer, duration }),
		})
			.then(() => navigator('../'))
			.catch((error) => console.log(error));

		// history.push('/class');
	};

	useEffect(() => {
		socket.connect();
		const handleBeforeUnload1 = (e) => {
			console.log('|||||||||||||||||||||||||||');
			// socket.on('exam:start', () => {
			socket.emit('exam:leave', answer);

			// });
			// e.returnValue = '';
		};

		const currentUser = localStorage.getItem('currentUser');

		fetch(`${api}/classes/${state?.classId}/exams/${examId}/details`, {
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((response) => response.json())
			.then((questionsAPI) => {
				setQuestions(questionsAPI.data.content);
				console.log(questionsAPI.data.content);
				setSubmitted({
					...submitted,
					status: questionsAPI.data.isDone,
				});
				if (!questionsAPI.data.isDone) {
					socket.emit('exam:start', {
						id: questionsAPI.data.id,
						// examId: questionsAPI.data.examId,
					});
				}

				// socket.disconnect();

				window.addEventListener('beforeunload', handleBeforeUnload1, false);
				window.addEventListener('unload', handleBeforeUnload1, false);
				window.addEventListener('load', handleBeforeUnload1);
				window.addEventListener('popstate', handleBeforeUnload1, false);
				setDuration(questionsAPI.data.duration);
			})
			.catch((error) => {
				console.log(error);
			});

		socket.on('test', (data) => {
			console.log(data);
			setDuration(data);
		});

		const handleOnBlur = () => {
			if (!document.hasFocus()) {
				socket.emit('exam:clickOutside');
			}
		};

		window.addEventListener('blur', handleOnBlur);

		const handleRightClickContext = (e) => {
			e.preventDefault();
			return false;
		};

		// const handleKeyPress = (e) => {
		// 	console.log('||||||||||||||||||||||||||||||||||');
		// 	const code = e.keyCode || e.which;
		// 	alert('1');
		// 	if (code == 122) {
		// 		openFullscreen();
		// 	}
		// };

		window.addEventListener('contextmenu', handleRightClickContext);
		// window.addEventListener('keydown', handleKeyPress, false);
		socket.on('exam:expired', (e) => {
			const accesToken = localStorage.getItem('currentUser');
			fetch(`${api}/classes/${state?.classId}/exams/${examId}`, {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + accesToken,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ questions: answer, duration }),
			})
				// .then(() => navigator('../'))
				.catch((error) => console.log(error));
			document.getElementById('answerform');
			setModalType('expired');
			setIsOpen(true);
		});

		return () => {
			socket.off('exam:expired');
			socket.off('test');
			window.removeEventListener('contextmenu', handleRightClickContext);
			window.removeEventListener('blur', handleOnBlur);
			window.removeEventListener('beforeunload', handleBeforeUnload1, false);
			window.removeEventListener('unload', handleBeforeUnload1, false);
			window.removeEventListener('load', handleBeforeUnload1);
			window.removeEventListener('popstate', handleBeforeUnload1, false);
		};
	}, []);

	useEffect(() => {
		if (!state?.isDone) {
			const elem = document.getElementById('dashboard-container');
			function openFullscreen(elem) {
				if (elem.requestFullscreen) {
					elem.requestFullscreen();
				} else if (elem.webkitRequestFullscreen) {
					/* Safari */
					elem.webkitRequestFullscreen();
				} else if (elem.msRequestFullscreen) {
					/* IE11 */
					elem.msRequestFullscreen();
				}
			}

			const exitFullscreenHandler = () => {
				if (
					!document.fullscreenElement &&
					!document.mozFullScreenElement &&
					!document.webkitFullscreenElement &&
					!document.msFullscreenElement
				) {
					setModalType('out-screen');
					setIsOpen(true);
				}
			};

			openFullscreen(elem);

			document.addEventListener('fullscreenchange', exitFullscreenHandler);
			document.addEventListener(
				'webkitfullscreenchange',
				exitFullscreenHandler
			);
			document.addEventListener('mozfullscreenchange', exitFullscreenHandler);
			document.addEventListener('MSFullscreenChange', exitFullscreenHandler);

			return () => {
				document.removeEventListener('fullscreenchange', exitFullscreenHandler);
				document.removeEventListener(
					'webkitfullscreenchange',
					exitFullscreenHandler
				);
				document.removeEventListener(
					'mozfullscreenchange',
					exitFullscreenHandler
				);
				document.removeEventListener(
					'MSFullscreenChange',
					exitFullscreenHandler
				);
			};
		}
	}, []);

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
					setDuration={setDuration}
					handleSubmitAnswer={handleSubmitAnswer}
				/>
			</div>
			{isOpen && !submitted.status && (
				<ConfirmModel
					type={modalType}
					setType={setModalType}
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
