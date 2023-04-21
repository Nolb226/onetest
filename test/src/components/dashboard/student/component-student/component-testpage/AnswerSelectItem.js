import { memo, useState } from 'react';

function AnswerSelectItem({
	question,
	index,
	value,
	color,
	disabled,
	handleAnswerQuestion,
	valueSelected: answer,
}) {
	if (!disabled) {
		return (
			<li className={`answer-item answer-item-${index + 1}`}>
				<span>{index < 9 ? `0${index + 1}` : `${index + 1}`}</span>
				<select
					onChange={(e) => {
						handleAnswerQuestion(question, e.target.value);
					}}
					className="answer-select"
					value={value?.studentAns}
					style={
						color
							? { backgroundColor: 'var(--highlight-color)' }
							: { backgroundColor: 'var(--white-color)' }
					}
					disabled={disabled}
				>
					{value?.studentAns ? '' : <option value="">.</option>}
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
					<option value="D">D</option>
				</select>
			</li>
		);
	} else {
		const style = (function (question) {
			if (question.correctAns === question.studentAns) {
				return {
					// backgroundColor: '#2f9e44',
					color: '#2f9e44',
					fontWeight: 600,
					width: '40px',
				};
			}
			if (question.studentAns === 'Bỏ') {
				return {
					color: '#1d1d1f',
					width: '40px',
				};
			}
			return {
				// backgroundColor: '#cc2424',
				color: '#cc2424',
				fontWeight: 600,
				width: '40px',
			};
		})(question);
		return (
			<li className={`answer-item answer-item-${index + 1}`}>
				<span>{(index + 1 + '').padStart(2, '0')}</span>
				<select
					className="answer-select"
					value={question.studentAns}
					style={style}
					disabled={disabled}
				>
					<option value="Bỏ"> </option>
					<option value="A">A</option>
					<option value="B">B</option>
					<option value="C">C</option>
					<option value="D">D</option>
				</select>
			</li>
		);
	}
}

export default memo(AnswerSelectItem);
