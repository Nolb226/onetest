import ClassItem from './ClassItem';
import { useState, useEffect, Suspense } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Paginator from './Paginator';
import api from '../../../../config/config';
import { Outlet, useOutlet, useSearchParams } from 'react-router-dom';

function Classes(prop) {
   const [classes, setClasses] = useState([]);
   const [page, setPage] = useState(1);
   const [totalPage, setTotalPage] = useState(1);
   const [search, setSearch] = useState("");
   // const [searchParams, setSearchParams] = useSearchParams({ search: "" });
   const outlet = useOutlet();

	const { permissions } = useOutletContext();

	const isAllowedToLock = permissions.find((x) => x.id === 23);

	const handleClasses = (value) => {
		const currentUser = localStorage.getItem(`currentUser`);
		fetch(
			`${api}/classes/manage?search=${
				searchParams.get('search') || ''
			}&page=${page}`,
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
   const handleClasses = (value) => {
      const currentUser = localStorage.getItem(`currentUser`);
      fetch(
         `${api}/classes/manage?search=${search}&page=${page}`,
         {
            method: "GET",
            headers: {
               Authorization: "Bearer " + currentUser,
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
      handleClasses();
   }, [page, search]);

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

   const handleSearch = () =>{
      const search_input = document.querySelector('.search-input')
      if(search_input){
        search_input.addEventListener("keyup", function(event) {
          if (event.key === "Enter") {
            setSearch(search_input.value)
          }
      })
      }
      
    }
  
    handleSearch()

   return (
      <>
         {outlet || (
            <>
               <div class="flex-center search-bar">
                  <input
                     type="text"
                     class="search-input"
                     placeholder="Nhập mã lớp"
                  />
                  {/* <button
                     className="search-class-btn"
                     onClick={(e) => {
                        e.preventDefault();
                     }}
                  >
                     <i class="fa-solid fa-magnifying-glass"></i>
                  </button> */}
						<Link
							class="flex-center join-button"
							to={`create`}
							relative="path"
							style={{ padding: '0', filter: 'none' }}
							target="_blank"
						>
							<button
								class="flex-center join-button"

								// onClick={prop.handleCreateClass}
							>
								<i class="fa-solid fa-plus"></i>
								<span>Tạo lớp</span>
							</button>
						</Link>
					</div>
					<div class="table-zone grid position-relative">
						<div class="grid table__content ">
							<header className="table__header">
								<ul
									class="flex-center table__content--heading"
									style={{
										display: 'grid',
										gridTemplateColumns: '16% 23% 37% 10% 7% 7%',
									}}
								>
									<li class="flex-center column-text">
										<h3>Mã Lớp</h3>
									</li>

									<li class="flex-center column-text">
										<h3>Tên Lớp</h3>
									</li>

									<li class="flex-center column-text">
										<h3>Tên môn học</h3>
									</li>

									<li class="flex-center column-text">
										<h3>Danh sách</h3>
									</li>

									{isAllowedToLock && (
										<li class="flex-center column-text">
											<h3>Khóa</h3>
										</li>
									)}

									<li class="flex-center column-text">
										<h3>Sửa</h3>
									</li>
								</ul>
							</header>

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
												isAllowedToLock={isAllowedToLock !== undefined}
												handleLock={handleLock}
												handleRePass={prop.handleRePass}
												handleClassList={prop.handleClassList}
											/>
										);
									})
								)}
							</div>
						</div>
						<div className="mobile-table-content">
							{classes.length === 0 ? (
								<div className="flex-center" style={{ height: '100%' }}>
									<h1 class="noClass">Không có lớp</h1>
								</div>
							) : (
								classes.map((Class) => {
									return (
										<div className="flex-center mobile-table-item">
											<h3>
												{Class.name} - {Class.id}
											</h3>
											<span>Môn:&nbsp; {Class.lecture_name}</span>
											<span>Lớp:&nbsp;{Class.name}</span>
											<div
												className="flex-center lock-exam"
												// onClick={() => {
												//    console.log(Class.isLock);
												//    handleLock(Class.class_id, Class);
												// }}
											>
												<button
													className={`${
														Class.isLock
															? 'list_btn list_btn_lock'
															: 'list_btn list_btn_unlock'
													}`}
													onClick={() => handleLock(Class)}
												>
													<i
														class={`fa-solid fa-${
															Class.isLock ? '' : 'un'
														}lock`}
													></i>
												</button>

												<Link to={`${Class.id}/edit`} relative="path">
													<button
														class="list_btn list_btn_edit "
														// onClick={() => Class.handleRePass(Class.Class)}
													>
														<i class="fa-solid fa-pen-to-square"></i>
													</button>
												</Link>
											</div>
											<button className="view-btn">
												<Link
													to={`./${Class.id}`}
													relative="path"
													style={{ color: '#fff' }}
												>
													Danh sách
												</Link>
											</button>
										</div>
									);
								})
							)}
						</div>

						<Paginator
							handlePageChange={handlePageChange}
							page={page}
							totalPage={totalPage}
						/>
					</div>
				</>
			)}
		</>
	);
}

export default Classes;

// Classes.map(Class => (<ClassItem key={Class.id} Class = {Class} />)) }
