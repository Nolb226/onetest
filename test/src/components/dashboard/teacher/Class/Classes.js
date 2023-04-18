import ClassItem from './ClassItem';
import { useState, useEffect } from 'react';
import Paginator from './Paginator';
import api from '../../../../config/config';
import { useSearchParams } from 'react-router-dom';

function Classes(prop) {
	const [classes, setClasses] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [search, setSearch] = useState('');
	const [searchParams, setSearchParams] = useSearchParams({});

	const handleClasses = (value) => {
		const currentUser = localStorage.getItem(`currentUser`);
		fetch(
			`${api}/classes?search=${searchParams.get('search') || ''}&page=${page}`,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + currentUser,
				},
			}
		)
			.then((res) => res.json())
			.then((classes) => {
				console.log(classes);
				setClasses(classes.data.data);
				setTotalPage(Math.ceil(classes.data.total / 10));
				// console.log(classes.data.total);
			});
	};

	useEffect(() => {
		// const search_input = document.querySelector(".search-input");
		// handleClasses(search_input.value);
		handleClasses(searchParams.get('search'));
	}, [page, searchParams]);

	const handlePageChange = (newPage) => {
		setPage(newPage);
		console.log(newPage);
	};

	function update(Class) {
		const list = classes.map((classroom) => {
			if (Class.id === classroom.id) {
				return { ...classroom, isLock: !classroom.isLock };
			}
			return classroom;
		});
		// console.log(Class);
		setClasses(list);
		// console.log(list);
	}

	const handleLock = (Class) => {
		const currentUser = localStorage.getItem(`currentUser`);
		// console.log(Class.isLock);
		// console.log(Class.id);
		fetch(`${api}/classes/${Class.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				isLock: !Class.isLock,
			}),
			headers: {
				Authorization: 'Bearer ' + currentUser,
				'Content-type': 'application/json',
			},
		}).then((response) => response.json());
		//   .then((json) => console.log(json.data));

		update(Class);
	};

	return (
		<>
			<div class="flex-center search-bar">
				<form onClick={(e) => setSearchParams({ search })}>
					<input
						type="text"
						class="search-input"
						placeholder="Nhập mã lớp"
						onInput={(e) => setSearch(e.target.value)}
					/>
					<button
						className="search-class-btn"
						onClick={(e) => {
							e.preventDefault();
						}}
					>
						<i class="fa-solid fa-magnifying-glass"></i>
					</button>
				</form>
				<button
					class="flex-center join-button"
					onClick={prop.handleCreateClass}
				>
					<i class="menu-icon fa-solid fa-plus"></i>
					<span>Tạo lớp mới</span>
				</button>
			</div>
			<div class="table-zone grid position-relative">
				<h1 class="table__heading">DANH SÁCH NHÓM LỚP</h1>

				<div class="grid table__content ">
					<ul class="row no-gutters flex-center table__content--heading">
						<li class="col l-6-4">
							<h3>Mã Lớp</h3>
						</li>

						<li class="col l-6-4">
							<h3>Tên Lớp</h3>
						</li>

						<li class="col l-6-4">
							<h3>Môn</h3>
						</li>

						<li class="col l-6-4">
							<h3>Danh sách sinh viên</h3>
						</li>

						<li class="col l-6-2">
							<h3>Khóa Lớp</h3>
						</li>

						<li class="col l-6-2">
							<h3>Chỉnh sửa</h3>
						</li>
					</ul>

					<div class="table__content--list classes ">
						{classes.length === 0 ? (
							<div className="flex-center" style={{ height: '100%' }}>
								<h1 class="noClass">Không có lớp</h1>
							</div>
						) : (
							classes.map((Class) => {
								return (
									<ClassItem
										key={Class.id}
										Class={Class}
										handleLock={handleLock}
										handleRePass={prop.handleRePass}
										handleClassList={prop.handleClassList}
									/>
								);
							})
						)}
					</div>
				</div>
				<Paginator
					handlePageChange={handlePageChange}
					page={page}
					totalPage={totalPage}
				/>
			</div>
		</>
	);
}

export default Classes;

// Classes.map(Class => (<ClassItem key={Class.id} Class = {Class} />)) }
