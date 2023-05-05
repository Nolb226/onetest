import React, { useEffect, useState } from 'react';
import AnswerSelectItem from './AnswerSelectItem';
import { Link } from 'react-router-dom';
import QuestionItem from './QuestionItem';
import api from '../../../../../config/config';

function QuestionsRender({
	questions,
	examId,
	classId,
	submitted,
	isOpen,
	setIsOpen,
	duration,
	setDuration,
	apiDuration,
	history,
	answer,
	setAnswer,
}) {
	// console.log(answer);

	useEffect(() => {
		let timer = null;
		// window.addEventListener('blur', handleBlur);
		const startTimer = (duration) => {
			const countDownDuration = () => {
				// -
				// Math.round((new Date().getTime() - startTime) / 1000);

				if (time < 0) {
					// clearInterval(timer);
					setDuration({ hours: '00', minutes: '00', seconds: '00' });
					return;
				}
				const hours = String(parseInt(time / 3600, 10)).padStart(2, '0');
				const others = String(parseInt(time % 3600, 10)).padStart(2, '0');
				const minutes = String(parseInt(others / 60, 10)).padStart(2, '0');
				const seconds = String(parseInt(others % 60, 10)).padStart(2, '0');
				setDuration((prev) => ({ ...prev, hours, minutes, seconds }));
				time--;
				console.log(duration);
				console.log(time);
			};
			let time = parseInt(duration, 10);
			timer = setInterval(countDownDuration, 1000);

			// countDownDuration();
		};
		startTimer(apiDuration);
		return () => {
			clearInterval(timer);
		};
	}, [apiDuration]);

	useEffect(() => {
		const handleBeforeUnload1 = (e) => {
			e.preventDefault();
			e.returnValue = '';
			setIsOpen(true);
		};
		const test = document.querySelector('.content-table.doing-test');

		// test.addEventListener('beforeunload', handleBeforeUnload1);
		test.addEventListener('unload', handleBeforeUnload1);
		test.addEventListener('popstate', handleBeforeUnload1);
		// test.addEventListener('load', handleBeforeUnload1, false);
		return () => {
			// test.removeEventListener('blur', handleOnBlur);
			// test.removeEventListener('beforeunload', handleBeforeUnload1);
			test.removeEventListener('unload', handleBeforeUnload1);
			test.removeEventListener('popstate', handleBeforeUnload1);
		};
	}, []);

	const handleAnswerQuestion = (question, value) => {
		const list = [
			...answer.filter((questioninlist) => {
				if (questioninlist.id !== question.id) {
					return questioninlist;
				}
			}),
			{
				id: question.id,
				studentAns: value,
			},
		];
		setAnswer(list);
	};

	const handleSubmitAnswer = (e) => {
		e.preventDefault();

		const accesToken = localStorage.getItem('currentUser');
		fetch(`${api}/classes/${classId}/exams/${examId}`, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + accesToken,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ questions: answer, duration }),
		}).catch((error) => console.log(error));

		// history.push('/class');
	};

	const handleOpenAnswerList = () => {
		document
			.querySelector('.answer-control > .answerform-mobile')
			.classList.toggle('display-grid');
	};

	return (
		<>
			<form name="questionlist" className="question-list">
				{questions?.map((question, index) => {
					const [value] = answer.filter((item) => item.id === question.id);

					return (
						<QuestionItem
							key={question.id}
							question={question}
							index={index}
							setAnswer={setAnswer}
							answer={answer}
							isChecked={value?.studentAns}
							// isChecked={valueSelect}
							disabled={submitted.status}
							handleAnswerQuestion={handleAnswerQuestion}
						/>
					);
				})}
			</form>
			<div className="answer-list">
				<div className="answer-header flex-center">BÀI LÀM</div>
				<form
					id="answerform"
					name="answerform"
					className="answer-grid"
					onSubmit={handleSubmitAnswer}
					// action=''
				>
					{questions?.map((question, index) => {
						const [value] = answer.filter((item) => item.id === question.id);

						return (
							<AnswerSelectItem
								key={question.id}
								question={question}
								index={index}
								valueSelected={answer}
								setAnswer={setAnswer}
								value={value}
								handleAnswerQuestion={handleAnswerQuestion}
								// color={valueSelect || null}
								disabled={submitted.status}
							/>
						);
					})}
				</form>
				<div className="time-test flex-center">
					{!submitted.status
						? `${duration?.hours} ${duration?.minutes} : ${duration?.seconds}`
						: ''}
				</div>
				<div className="test-submit flex-center">
					{submitted.status ? (
						<Link to={`../result/${examId}`}>
							<button
								className="test-submit-btn to-submit"
								style={{
									backgroundColor: '#5d68d8',
									color: '#f5f5f7',
								}}
							>
								Xem điểm
							</button>
						</Link>
					) : (
						<button
							className="test-submit-btn to-submit"
							// disabled={submitted.status}
							onClick={() => setIsOpen(!isOpen)}
						>
							{submitted.text}
						</button>
					)}
				</div>
			</div>
			<div className="answer-control">
				<button onClick={handleOpenAnswerList}>
					Bài làm
					<i class="fa-solid fa-angle-up" style={{ marginLeft: '10px' }}></i>
				</button>

				<div className="time-test flex-center">
					{!submitted.status
						? `${duration?.hours} ${duration?.minutes} : ${duration?.seconds}`
						: ''}
				</div>

				<div className="test-submit flex-center">
					{submitted.status ? (
						<Link to={`../result/${examId}`}>
							<button
								className="test-submit-btn to-submit"
								style={{
									backgroundColor: '#5d68d8',
									color: '#f5f5f7',
								}}
							>
								Xem điểm
							</button>
						</Link>
					) : (
						<button
							className="test-submit-btn to-submit"
							// disabled={submitted.status}
							onClick={() => setIsOpen(!isOpen)}
						>
							{submitted.text}
						</button>
					)}
				</div>

				<form
					id="answerform"
					name="answerform"
					className="answer-grid answerform-mobile"
					onSubmit={handleSubmitAnswer}
					style={{ display: 'none' }}
				>
					{questions?.map((question, index) => {
						const [value] = answer.filter((item) => item.id === question.id);

						return (
							<AnswerSelectItem
								key={question.id}
								question={question}
								index={index}
								valueSelected={answer}
								setAnswer={setAnswer}
								value={value}
								handleAnswerQuestion={handleAnswerQuestion}
								// color={valueSelect || null}
								disabled={submitted.status}
							/>
						);
					})}
				</form>
			</div>
		</>
	);
}

export default QuestionsRender;
