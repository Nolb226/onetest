import { memo, useEffect, useState } from 'react';

function QuestionItem({
	question,
	index,
	isChecked,
	disabled,
	handleAnswerQuestion,
}) {
	useEffect(() => {
		if (disabled) {
			document.questionlist[`Q${question.id}`].value = question.studentAns;
		}
	});
	if (!disabled) {
		return (
			<div className="question-item">
				<div className="question-item-content">
					Câu {index + 1}: {question.description}
				</div>
				<div
					className="question-item-suggest"
					onClick={() => {
						console.log(document.questionlist[`Q${question.id}`].value);
						handleAnswerQuestion(
							question,
							document.questionlist[`Q${question.id}`].value
						);
					}}
				>
					<label
						className="ABCD"
						data-value={question.id}
						htmlFor={`A${question.id}`}
					>
						<div className="radio ABCD-children">
							<input
								className="ABCD-radio"
								type="radio"
								value="A"
								id={`A${question.id}`}
								name={`Q${question.id}`}
								checked={isChecked === 'A'}
								disabled={disabled}
							/>
							A.{' '}
						</div>
						<div className="content-suggest ABCD-children">
							{question.answerA}
						</div>
					</label>

					<label
						className="ABCD"
						data-value={question.id}
						htmlFor={`B${question.id}`}
					>
						<div className="radio ABCD-children">
							<input
								className="ABCD-radio"
								type="radio"
								value="B"
								id={`B${question.id}`}
								name={`Q${question.id}`}
								checked={isChecked === 'B'}
								disabled={disabled}
							/>
							B.{' '}
						</div>
						<div className="content-suggest ABCD-children">
							{question.answerB}
						</div>
					</label>

					<label
						className="ABCD"
						data-value={question.id}
						htmlFor={`C${question.id}`}
					>
						<div className="radio ABCD-children">
							<input
								className="ABCD-radio"
								type="radio"
								value="C"
								id={`C${question.id}`}
								name={`Q${question.id}`}
								checked={isChecked === 'C'}
								disabled={disabled}
							/>
							C.{' '}
						</div>
						<div className="content-suggest ABCD-children">
							{question.answerC}
						</div>
					</label>

					<label
						className="ABCD"
						data-value={question.id}
						htmlFor={`D${question.id}`}
					>
						<div className="radio ABCD-children">
							<input
								className="ABCD-radio"
								type="radio"
								value="D"
								id={`D${question.id}`}
								name={`Q${question.id}`}
								checked={isChecked === 'D'}
								disabled={disabled}
							/>
							D.
						</div>
						<div className="content-suggest ABCD-children">
							{question.answerD}
						</div>
					</label>
				</div>
			</div>
		);
	} else {
		const correct = {
			// backgroundColor: '#2f9e44',
			color: '#2f9e44',
		};
		const wrong = {
			color: '#ff0404',
		};

		return (
			<div className="question-item">
				<div className="question-item-content">
					Câu {index + 1}: {question.description}
				</div>
				<div className="question-item-suggest">
					<label
						className="ABCD"
						htmlFor={`A${question.id}`}
						style={
							question.correctAns === 'A'
								? correct
								: question.studentAns === 'A'
								? wrong
								: {}
						}
					>
						<input
							className={`ABCD-radio ${
								question.studentAns === 'A' ? 'chose' : ''
							}`}
							type="radio"
							value="A"
							id={`A${question.id}`}
							name={`Q${question.id}`}
							disabled={disabled}
						/>
						{/* </div> */}
						<span className="content-suggest ABCD-children">
							A. {question.answerA}
						</span>
					</label>

					<label
						className="ABCD"
						htmlFor={`B${question.id}`}
						style={
							question.correctAns === 'B'
								? correct
								: question.studentAns === 'B'
								? wrong
								: {}
						}
					>
						{/* <div className="radio ABCD-children"> */}
						<input
							className={`ABCD-radio ${
								question.studentAns === 'B' ? 'chose' : ''
							}`}
							type="radio"
							value="B"
							id={`B${question.id}`}
							name={`Q${question.id}`}
							// checked={question.studentAns === 'B'}
							disabled={disabled}
						/>
						{/* </div> */}
						<span className="content-suggest ABCD-children">
							B. {question.answerB}
						</span>
					</label>

					<label
						className="ABCD"
						htmlFor={`C${question.id}`}
						style={
							question.correctAns === 'C'
								? correct
								: question.studentAns === 'C'
								? wrong
								: {}
						}
					>
						{/* <div className="radio ABCD-children"> */}
						<input
							className={`ABCD-radio ${
								question.studentAns === 'C' ? 'chose' : ''
							}`}
							type="radio"
							value="C"
							id={`C${question.id}`}
							name={`Q${question.id}`}
							// checked={question.studentAns === 'C'}
							disabled={disabled}
						/>
						{/* </div> */}
						<span className="content-suggest ABCD-children">
							C. {question.answerC}
						</span>
					</label>

					<label
						className="ABCD"
						htmlFor={`D${question.id}`}
						style={
							question.correctAns === 'D'
								? correct
								: question.studentAns === 'D'
								? wrong
								: {}
						}
					>
						{/* <div className="radio ABCD-children"> */}
						<input
							className={`ABCD-radio ${
								question.studentAns === 'D' ? 'chose' : ''
							}`}
							type="radio"
							value="D"
							id={`D${question.id}`}
							name={`Q${question.id}`}
							// checked={question.studentAns === 'D'}
							disabled={disabled}
						/>
						{/* </div> */}
						<span className="content-suggest ABCD-children">
							D. {question.answerD}
						</span>
					</label>
				</div>
			</div>
		);
	}
}

export default memo(QuestionItem);
