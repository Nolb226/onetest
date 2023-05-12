// import "./style.css";
// import "./responsive.css";
// import StatisticClasses from "./StatisticClasses"; "./ClassList";
import { Outlet, useNavigate } from 'react-router';

function Statistics() {
	const navigator = useNavigate();

	function activeButton(e) {
		let buttons = document.querySelectorAll('.menu-btn');
		buttons.forEach((button) => {
			if (button.classList.contains('active'))
				button.classList.remove('active');
		});
		e.target.closest('.menu-btn').classList.add('active');
	}

	return (
		<div className="statistics-layout">
			<div className="statistic-menu">
				<button
					className="active menu-btn"
					onClick={(e) => {
						activeButton(e);
						navigator('./classList');
					}}
				>
					Lớp
				</button>
				<button
					className="menu-btn"
					onClick={(e) => {
						activeButton(e);

						navigator('./examList');
					}}
				>
					Bài thi
				</button>
			</div>
			<Outlet />
		</div>
	);
}

export default Statistics;
