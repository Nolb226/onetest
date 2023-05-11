import { useState, useEffect } from 'react';
import api from '../../.././config/config.js';
import DetailInformation from './DetailInformation.jsx';
import Paginator from '../teacher/Class/Paginator.jsx';
import { useOutletContext } from 'react-router';

function ManageAccount() {
  const currentUser = localStorage.getItem("currentUser");
  const [accountList, setAccountList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [change, setChange] = useState(false);
  const [search, setSearch] = useState("")

  useEffect(() => {
    const getAccountData = async () => {
      const userreq = await fetch(`${api}/admin/accounts?search=${search}&page=${page}`, {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });
      const data = await userreq.json();
      console.log(data);
      setAccountList(data.data.accounts);
      setTotalPage(Math.ceil((data.data.totalAccount - 1) / 10));
    };
    getAccountData();
  }, [page, change, search]);
	const { permissions } = useOutletContext();

	const isAllowedToPut = permissions.find((x) => x.id === 17);
	const isAllowedToDelete = permissions.find((x) => x.id === 18);

	useEffect(() => {
		const getAccountData = async () => {
			const userreq = await fetch(`${api}/admin/accounts?&page=${page}`, {
				headers: {
					Authorization: 'Bearer ' + currentUser,
				},
			});
			const data = await userreq.json();
			console.log(data);
			setAccountList(data.data.accounts);
			setTotalPage(Math.ceil((data.data.totalAccount - 1) / 10));
		};
		getAccountData();
	}, [page, change]);

	const handlePageChange = (newPage) => {
		setPage(newPage);
		console.log(newPage);
	};

	const handleModal = (id) => {
		setAccountId(id);
		setIsOpenModal(!isOpenModal);
	};

	const updateIsActive = (id, newaccount) => {
		// console.log(newaccount);
		const currentUser = localStorage.getItem(`currentUser`);
		fetch(`${api}/admin/accounts/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(newaccount),
			headers: {
				Authorization: 'Bearer ' + currentUser,
				'Content-type': 'application/json',
			},
		}).then((response) => response.json());
		//   .then((json) => console.log(json.data));

		updateAccounts(id, newaccount);
	};

	const updateAccounts = (id, newaccount) => {
		// console.log(newaccount);
		const list = accountList.map((account) => {
			if (account.account_id === id) {
				return { ...account, ...newaccount };
			}
			return account;
		});

		setAccountList(list);
	};

	const deleteAccount = (id) => {
		page == 1 ? setChange(!change) : setPage(1);
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
      <div className="flex-center search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Nhập mã đề thi"
        />
        {/* <button className="flex-center join-button">
               <i className="menu-icon fa-solid fa-plus"></i>
               <span>Tạo bài thi</span>
            </button> */}
			</div>
			<div className="table-zone grid position-relative">
				<header className="table__header">
					<ul
						className="table__content--heading"
						style={{
							display: 'grid',
							gridTemplateColumns: '5% 15% 40% 20% 10% 10%',
						}}
					>
						<li className="flex-center column-text">
							<h3>STT</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Mã cá nhân</h3>
						</li>
						<li className="flex-center column-text">
							<h3>Mã cá nhân</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Họ và tên</h3>
						</li>
						<li className="flex-center column-text">
							<h3>Họ và tên</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Nhóm quyền</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Kích hoạt</h3>
						</li>

						<li className="flex-center column-text">
							<h3>Sửa</h3>
						</li>
					</ul>
				</header>
				<div className="grid table__content">
					<div className="table__content--list">
						{accountList.length == 0 ? (
							<h1
								className="flex-center"
								style={{
									height: '100%',
									fontSize: '15px',
									marginTop: '50px',
								}}
							>
								Không tồn tại tài khoản
							</h1>
						) : (
							accountList.map((account, index) => {
								return (
									<ul
										className="flex-center table__content--item"
										style={{
											display: 'grid',

											gridTemplateColumns: '5% 15% 40% 20% 10% 10%',
										}}
										key={index}
									>
										<li className="flex-center column-text">
											<h3>{10 * (page - 1) + index + 1}</h3>
										</li>

										<li className="flex-center column-text">
											<h3>{account.account_id}</h3>
										</li>

										<li className="flex-center column-text">
											<h3>{account.fullname}</h3>
										</li>

										<li className="flex-center column-text">
											<h3>{account.type == 'NULL' ? '' : account.type}</h3>
										</li>

										{/* Hiển thị thẻ checkbox */}
										<li className="flex-center column-text position-relative">
											<input
												type="checkbox"
												name="account.isActive"
												id=""
												checked={account.isActive}
												onClick={() =>
													updateIsActive(account.account_id, {
														isActive: !account.isActive,
													})
												}
												style={{
													height: '20px',
													width: '20px',
													zIndex: '2',
												}}
											/>
											<span
												class="checkmark"
												style={{ top: '-10px', left: '4px' }}
											></span>
										</li>

										{/* Click để gọi đến modal detail ifnormation của tài khoản */}
										<li
											className="flex-center column-text"
											onClick={() => {
												if (document.getElementById('detail-information'))
													document.getElementById(
														'detail-information'
													).style.display = 'flex';
											}}
										>
											<button
												class="list_btn list_btn_edit "
												onClick={() => {
													handleModal(account.account_id);
												}}
											>
												<i class="fa-solid fa-pen-to-square"></i>
											</button>
										</li>
									</ul>
								);
							})
						)}
					</div>
				</div>

				<div className="mobile-table-content">
					{accountList.length == 0 ? (
						<h1
							className="flex-center"
							style={{
								height: '100%',
								fontSize: '15px',
								marginTop: '50px',
							}}
						>
							Không tồn tại tài khoản
						</h1>
					) : (
						accountList.map((account, index) => {
							return (
								<div
									className="flex-center mobile-table-item"
									key={account.account_id}
								>
									<h3>{account.account_id}</h3>
									<span>{account.fullname}</span>
									<h3>{account.type == 'NULL' ? '' : account.type}</h3>
									<div className="flex-center">
										<input
											type="checkbox"
											name="account.isActive"
											id=""
											checked={account.isActive}
											onClick={() =>
												updateIsActive(account.account_id, {
													isActive: !account.isActive,
												})
											}
											style={{
												height: '25px',
												width: '25px',
												zIndex: '2',
												marginRight: '5px',
												borderRadius: '3px',
												backgroundColor: '#1f2ec9',
											}}
										/>
										<button
											class="list_btn list_btn_edit "
											style={{
												width: '25px',
												height: '25px',
												border: 'none',
												borderRadius: '3px',
												padding: '0',
											}}
											onClick={() => {
												handleModal(account.account_id);
											}}
										>
											<i class="fa-solid fa-pen-to-square"></i>
										</button>
									</div>
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
			{isOpenModal ? (
				<DetailInformation
					accountId={accountId}
					handleModal={handleModal}
					updateAccounts={updateAccounts}
					deleteAccount={deleteAccount}
				/>
			) : (
				''
			)}
		</>
	);
}

export default ManageAccount;
