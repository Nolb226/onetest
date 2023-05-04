import { useState, useEffect } from "react";
import api from "../../.././config/config.js";
import DetailInformation from "./DetailInformation.jsx";

function ManageAccount() {
  const currentUser = localStorage.getItem("currentUser");
  const [accountList, setAccountList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [accountId, setAccountId] = useState("")

  useEffect(() => {
    const getAccountData = async () => {
      const userreq = await fetch(`${api}/admin/accounts`, {
        headers: {
          Authorization: "Bearer " + currentUser,
        },
      });
      const data = await userreq.json();
      console.log(data);
      setAccountList(data.data);
    };
    getAccountData();
  }, []);

//   const handleLock = (classID, exam) => {
//     fetch(`${api}/classes/${classID}/exams/${exam.id}`, {
//       method: "PATCH",
//       body: JSON.stringify({
//         isLock: !exam.isLock,
//       }),
//       headers: {
//         Authorization: "Bearer " + currentUser,
//         "Content-type": "application/json",
//       },
//     }).then((response) => response.json());

//     setExamData(updateLockExam(classID, exam.id));
//   };

//   const updateLockExam = (classID, examID) => {
//     return examData.map((exam) => {
//       if (exam.class_id === classID && exam.id === examID) {
//         exam.isLock = !exam.isLock;
//         console.log(exam.isLock);
//       }
//       return exam;
//     });
//   };

  const handleModal = (id) => {
   setAccountId(id)
   setIsOpenModal(!isOpenModal)
  }

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
      <div className="table-zone grid">
        <header className="table__header">
          <ul
            className="table__content--heading"
            style={{
              display: "grid",
              gridTemplateColumns: "5% 15% 35% 10% 20% 10% 5%",
            }}
          >
            <li className="flex-center column-text">
              <h3>STT</h3>
            </li>

            <li className="flex-center column-text">
              <h3>Mã cá nhân</h3>
            </li>

            <li className="flex-center column-text">
              <h3>Họ và tên</h3>
            </li>

            <li className="flex-center column-text">
              <h3>Ngày tạo</h3>
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
            {accountList.length == 0
              ? <h1 className="flex-center" style={{height:"100%",fontSize:"15px",marginTop:"50px"}}>Không tồn tại tài khoản</h1>
              : accountList.map((account, index) => {
                  return (
                    <ul
                      className="flex-center table__content--item"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "5% 15% 35% 10% 20% 10% 5%",
                      }}
                    >
                      <li className="flex-center column-text">
                        <h3>{index + 1}</h3>
                      </li>

                      <li className="flex-center column-text">
                        <h3>{account.account_id}</h3>
                      </li>

                      <li className="flex-center column-text">
                        <h3>{account.fullname}</h3>
                      </li>

                      <li className="flex-center column-text">
                        <h3>{account?.createdAt?.split("T")[0]}</h3>
                      </li>

                      <li className="flex-center column-text">
                        <h3>{account.type}</h3>
                      </li>

                      {/* Hiển thị thẻ checkbox */}
                      <li className="flex-center column-text position-relative">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={account.isActive}
                        />
                        <span
                          class="checkmark"
                          style={{ top: "-10px", left: "4px" }}
                        ></span>
                      </li>

                      {/* Click để gọi đến modal detail ifnormation của tài khoản */}
                      <li
                        className="flex-center column-text"
                        onClick={() => {
                          if (document.getElementById("detail-information"))
                            document.getElementById(
                              "detail-information"
                            ).style.display = "flex";
                        }}
                      >
                        <button class="list_btn list_btn_edit " onClick={()=>{handleModal(account.account_id)}}>
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                      </li>
                    </ul>
                  );
                })}
          </div>
        </div>
      </div>
      {isOpenModal ? <DetailInformation accountId={accountId} handleModal={handleModal} />:""}
    </>
  );
}

export default ManageAccount;
