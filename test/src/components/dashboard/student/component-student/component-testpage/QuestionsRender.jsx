import React, { useState } from 'react';
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
}) {
	const [answer, setAnswer] = useState(questions);
	// console.log(answer);
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

	const handleSubmitAnswer = async (e) => {
		e.preventDefault();
		try {
			const accesToken = localStorage.getItem('currentUser');
			await fetch(`${api}/classes/${classId}/exams/${examId}`, {
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + accesToken,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ questions: answer }),
			});
		} catch (error) {
			console.log(error);
		}
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
						? `Thời gian làm bài còn ${duration?.minutes} : ${duration?.seconds}`
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
		</>
	);
}

export default QuestionsRender;
