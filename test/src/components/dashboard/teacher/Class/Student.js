import { useState } from 'react';
import { Link } from 'react-router-dom';
import pdf from '../../../../image/PDF-svg-Icon-0883r.svg';

import React from 'react';

const PDFButton = () => {
	return (
		<>
			<button className="pdf-download">
				<img className="pdf-image" src={pdf} />
				<span className="pdf-download__text">Tải về</span>
			</button>
		</>
	);
};

const Grade = ({ col, grade }) => {
	const [isHover, setIsHover] = useState(false);

	return (
		<li
			className={`col l-${col} m-${col}`}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<h3>{grade.grade}</h3>
			{isHover && <PDFButton />}
			{/* <PDFButton /> */}
		</li>
	);
};

function Student(prop) {
	function check() {
		if (prop.student.studentresults?.length < prop.numberOfTest) {
			for (
				let index = 0;
				index < 5 - prop.student.studentresults.length;
				index++
			) {
				prop.student.studentresults.push({ grade: '' });
			}
		}
	}

	check();

	return (
		<ul
			data-id={prop.student.id}
			class="row no-gutters flex-center table__content--item"
			style={{
				justifyContent: 'start',
			}}
		>
			<li className="col l-1 m-1">
				<h3>{prop.index + 1 + (prop.page - 1) * 10}</h3>
			</li>

			<li class="col l-2 m-2">
				<h3>{prop.student.id}</h3>
			</li>

			<li class="col l-3 m-3">
				<h3>{prop.student.fullname}</h3>
			</li>

			{prop.student.studentresults?.map((grade, index) => {
				let col;
				if (prop.numberOfTest < 6) {
					col = Math.floor(5 / prop.numberOfTest);
				} else {
					col = Math.ceil(5 / prop.numberOfTest);
				}
				if (index < prop.numberOfTest && index < 5) {
					return (
						<li className={`col l-${col} m-${col}`}>
							<h3>{grade.grade}</h3>
							{/* <PDFButton /> */}
						</li>
					);
				}
			})}

			<li
				className="col l-1 m-1"
				onClick={(e) => prop.handleClickStudent(prop.student.id)}
				style={{
					marginLeft: 'auto',
				}}
			>
				{/* <Link to={`./student/${prop.student.id}/edit`}> */}
				<i class="fa-regular fa-pen-to-square"></i>
				{'  Sửa'}
				{/* </Link> */}
			</li>
		</ul>
	);
}

export default Student;
