import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../../../../config/config';

export default function DetailStatistic() {
	const { classId, examId } = useParams();
	const [grade, setGrade] = useState({});
	const [total, setTotal] = useState(0);
	// console.log(classId);
	// console.log(examId);
	useEffect(() => {
		const currentUser = localStorage.getItem(`currentUser`);
		fetch(`${api}/classes/${classId}/${examId ? examId + '/' : ''}dashboard`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((res) => res.json())
			.then((grades) => {
				// console.log(grades);
				setGrade(grades.data);
				setTotal(
					grades.data.grade_0 +
						grades.data.grade_1 +
						grades.data.grade_2 +
						grades.data.grade_3 +
						grades.data.grade_4 +
						grades.data.grade_5 +
						grades.data.grade_6 +
						grades.data.grade_7 +
						grades.data.grade_8 +
						grades.data.grade_9 +
						grades.data.grade_10
				);
			});
	}, []);
	return (
		<>
			<div className="detail-statistic">
				<div className="detail-basic">
					<div className="detail-item">
						Lớp:
						<span> {classId}</span>
					</div>
					<div className="detail-item">
						Số bài làm:
						<span>{total}</span>
					</div>

					<div className="detail-item">
						Điểm trung bình:
						<span> 7.8</span>
					</div>
				</div>

				<div className="detail-grade">
					<h1>Phổ điểm</h1>
					<div className="grade-table">
						{/* <div className="grade flex-center">
                     <h3 className="heading">= 0</h3>
                     <span>{grade.grade_0}</span>
                  </div> */}
						<div className="grade flex-center">
							<h3 className="heading">&lt;= 1</h3>
							<span>{grade.grade_1 + grade.grade_0}</span>
						</div>

						<div className="grade flex-center">
							<h3 className="heading">&lt;= 2</h3>
							<span>{grade.grade_2}</span>
						</div>

						<div className="grade flex-center">
							<h3 className="heading">&lt;= 3</h3>
							<span>{grade.grade_3}</span>
						</div>

						<div className="grade flex-center">
							<h3 className="heading">&lt;= 4</h3>
							<span>{grade.grade_4}</span>
						</div>

						<div className="grade flex-center">
							<h3 className="heading">&lt;= 5</h3>
							<span>{grade.grade_5}</span>
						</div>

						<div className="grade flex-center">
							<h3 className="heading">&lt;= 6</h3>
							<span>{grade.grade_6}</span>
						</div>

						<div className="grade flex-center">
							<h3 className="heading">&lt;= 7</h3>
							<span>{grade.grade_7}</span>
						</div>

						<div className="grade flex-center">
							<h3 className="heading">&lt;= 8</h3>
							<span>{grade.grade_8}</span>
						</div>

						<div className="grade flex-center">
							<h3 className="heading">&lt;= 9</h3>
							<span>{grade.grade_9}</span>
						</div>

						<div className="grade flex-center">
							<h3 className="heading">&lt;= 10</h3>
							<span>{grade.grade_10}</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
