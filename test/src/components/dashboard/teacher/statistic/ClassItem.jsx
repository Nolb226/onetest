import { Link, useNavigate } from 'react-router-dom';

function ClassItem(Class) {
	const navigator = useNavigate();

	return (
		<ul
			class="flex-center table__content--item"
			style={{
				display: 'grid',
				gridTemplateColumns: '17% 28% 33% 10% 12%',
			}}
		>
			<li class="flex-center column-text class-id">
				<h3>{Class.Class.id}</h3>
			</li>

			<li class="flex-center column-text">
				<h3>{Class.Class.name}</h3>
			</li>

			<li class="flex-center column-text">
				<h3>{Class.Class.lecture_name}</h3>
			</li>
			<li class="flex-center column-text">{Class.Class.totalStudent}</li>

			<li class="flex-center column-text">
				<Link
					to={`./${Class.Class.id}/detail-statistic`}
					relative="path"
					style={{ color: '#fff' }}
				>
					<button className="view-btn" style={{ backgroundColor: '#b30b00' }}>
						Xem
					</button>
				</Link>
			</li>
		</ul>
	);
}

export default ClassItem;
