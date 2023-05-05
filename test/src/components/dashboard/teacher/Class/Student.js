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
			class="flex-center table__content--item"
			style={{
				display: 'grid',
				gridTemplateColumns: '4% 12% 32% 42% 10%',
			}}
		>
			<li className="flex-center column-text">
				<h3>{prop.index + 1 + (prop.page - 1) * 10}</h3>
			</li>
			<li class="flex-center column-text">
				<h3>{prop.student.account_id}</h3>
			</li>
			<li class="flex-center column-text">
				<h3>{prop.student.lastName + ' ' + prop.student.firstName}</h3>
			</li>
			{/* {prop.student.studentresults?.map((grade, index) => {
            let col;
            if (prop.numberOfTest < 6) {
               col = Math.floor(5 / prop.numberOfTest);
            } else {
               col = Math.ceil(5 / prop.numberOfTest);
            }
            if (index < prop.numberOfTest && index < 5) {
               return (
                  <li className={`col l-${col} m-${col} c-${col}`}>
                     <h3>{grade.grade}</h3>
                     {/* <PDFButton /> }
                  </li>
               );
            }
         })} */}
			<li class="flex-center column-text" style={{}}>
				{prop.student.studentresults?.map((grade, index) => {
					let widthItem = 100 / prop.numberOfTest;
					if (index < prop.numberOfTest) {
						return (
							<div style={{ width: `${widthItem}%`, textAlign: 'left' }}>
								<h3>{grade.grade}</h3>
							</div>
						);
					}
				})}
			</li>

			<li
				className="flex-center column-text"
				onClick={(e) => prop.handleClickStudent(prop.student.id)}
				style={{
					marginLeft: 'auto',
				}}
			>
				{/* <Link to={`./student/${prop.student.id}/edit`}> */}
				<i class="fa-regular fa-pen-to-square"></i>
				{/* </Link> */}
			</li>
		</ul>
	);
}

export default Student;
