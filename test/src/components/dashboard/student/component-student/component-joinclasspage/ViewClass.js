// import Info from "../Info";
import api from '../../../../../config/config.js';
import ClassItem from './ClassItem';
import { useEffect, useRef, useState } from 'react';
import Empty from '../Empty';
import {
	Link,
	Outlet,
	useNavigate,
	useOutletContext,
	useParams,
	useSearchParams,
} from 'react-router-dom';
import Paginator from '../../../teacher/Class/Paginator';

function ViewClass() {
	const [classes, setClasses] = useState([]);
	const [total, setTotal] = useState(1);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [searchParams, setSearchParams] = useSearchParams({ search: '' });
	const params = useParams();
	const { idStudent, nameStudent } = params;
	const { permissions } = useOutletContext();
	const navigator = useNavigate();

	let isEmpty = useRef(true);

	const handleClass = () => {
		const currentUser = localStorage.getItem('currentUser');
		fetch(
			`${api}/classes?search=${searchParams.get('search') || ''}&page=${page}`,
			{
				headers: {
					Authorization: 'Bearer ' + currentUser,
				},
			}
		)
			.then((response) => response.json())
			.then((classesAPI) => {
				setClasses(classesAPI.data.data);
				setTotal(Math.ceil(classesAPI.data.total / 10));
				console.log(classesAPI.data.data);
				isEmpty.current = false;
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
	};

	const isAllowed = permissions.find((x) => x.id === 6);

	useEffect(() => {
		// handleClass(page);
		handleClass(searchParams.get('search'));
	}, [page, searchParams]);

	return (
		<>
			<div class="flex-center search-bar">
				<form style={{ height: '100%' }}>
					<input
						type="text"
						class="search-input"
						placeholder="Nhập mã lớp"
						onChange={(e) => setSearch(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
								setSearchParams({ search });
							}
							// e.preventDefault();
						}}
					/>
					{/* <button
                  className="search-class-btn"
                  onClick={(e) => {
                     e.preventDefault();
                     setSearchParams({ search });
                  }}
               >
                  <i class="fa-solid fa-magnifying-glass"></i>
               </button> */}
				</form>

				{isAllowed && (
					<button
						className="flex-center join-button"
						onClick={() => {
							navigator('./join', { relative: 'path' });
						}}
					>
						<i className="fa-solid fa-plus"></i>
						<span>Lớp mới</span>
					</button>
				)}
			</div>
			<div className="table-zone grid position-relative">
				<header className="table__header">
					<ul
						className="flex-center table__content--heading"
						style={{
							display: 'grid',
							gridTemplateColumns: '17% 32% 28% 8% 5% 10%',
						}}
					>
						<li className="flex-center column-text">
							<h3>Mã lớp</h3>
						</li>
						<li className="flex-center column-text">
							<h3>Tên lớp</h3>
						</li>
						<li className="flex-center column-text">
							<h3>Giảng viên</h3>
						</li>
						<li className="flex-center column-text">
							<h3>Học kỳ</h3>
						</li>
						<li className="flex-center column-text">
							<h3>SL</h3>
						</li>
						<li className="flex-center column-text">
							<h3>Chi tiết</h3>
						</li>
					</ul>
					<div className="filter-box"></div>
				</header>

				<div className="grid table__content">
					{isEmpty.current && (
						<Empty content={'Bạn chưa tham gia lớp học nào'} />
					)}
					<div
						className="table__content--list"
						style={{ overflowY: 'auto', height: 400 }}
					>
						{classes.map((item) => (
							<ClassItem
								teacherName={item.teacher_fullname}
								id={item.id}
								nameClass={item.name}
								semester={item.semester}
								total={item.totalStudent}
								idStudent={idStudent}
								nameStudent={nameStudent}
							/>
						))}
					</div>
				</div>

				<div className="mobile-table-content">
					{classes.map((item) => {
						return (
							<div className="flex-center mobile-table-item">
								<h3>{item.id}</h3>
								<h3>{item.name}</h3>
								<span>{item.teacher_fullname}</span>
								<span>Sĩ số:&nbsp;{item.totalStudent}</span>
								<Link to={`${item.id}/exams`} relative="path">
									<button className="view-btn">Xem</button>
								</Link>
							</div>
						);
					})}
				</div>

				<Paginator
					handlePageChange={handlePageChange}
					page={page}
					totalPage={total}
				/>
			</div>
		</>
	);
}

export default ViewClass;
