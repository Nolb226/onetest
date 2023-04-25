import { Link } from 'react-router-dom';

function ClassItem(Class) {
	// const isLock = Class.Class.isLock ? "list_btn list_btn_lock":"list_btn list_btn_unlock"
	// console.log(isLock);
	// console.log(Class);

	return (
		<ul class="row no-gutters flex-center table__content--item">
			<li class="col l-6-4 m-6-4">
				<h3>{Class.Class.id}</h3>
			</li>

			<li class="col l-6-4 m-6-4">
				<h3>{Class.Class.name}</h3>
			</li>

			<li class="col l-6-4 m-6-4">
				<h3>{Class.Class.lecture.name}</h3>
			</li>

			<li class="col l-6-4 m-6-4">
				<button
					class="list_btn list_btn_class"
					// onClick={() => Class.handleClassList(Class.Class)}
				>
					<Link to={`./${Class.Class.id}`} relative="path">
						Xem Danh Sách
					</Link>
				</button>
			</li>

			<li class="col l-6-2 m-6-2">
				<button
					className={`${
						Class.Class.isLock
							? 'list_btn list_btn_lock'
							: 'list_btn list_btn_unlock'
					}`}
					onClick={() => Class.handleLock(Class.Class)}
				>
					<i class={`fa-solid fa-${Class.Class.isLock?"":"un"}lock`}></i>
				</button>
			</li>

			<li class="col l-6-2 m-6-2">
				<Link to={`${Class.Class.id}/edit`} relative="path">
					<button
						class="list_btn list_btn_edit "
						// onClick={() => Class.handleRePass(Class.Class)}
					>
						<i class="fa-solid fa-pen-to-square"></i>
					</button>
				</Link>
			</li>
		</ul>
	);
}

export default ClassItem;
