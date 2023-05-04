import { useEffect, useState } from "react";
import api from "../../.././config/config.js";
import Majors from "./Majors.jsx";
import Department from "./department.jsx";
import PermissionGroup from "./permissionGroup.jsx";

function DetailInformation(prop) {
  const [account, setAccount] = useState({});
  const [oldAccountId, setOldAccountId] = useState("");

  useEffect(() => {
    const currentUser = localStorage.getItem(`currentUser`);
    fetch(`${api}/admin/accounts/${prop.accountId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + currentUser,
      },
    })
      .then((res) => res.json())
      .then((info) => {
        console.log(info.data);
        setAccount(info.data);
        setOldAccountId(info.data.account_id);
      });
  }, []);

  function handleOpen() {
    prop.handleModal("");
  }

  const handleAccount = (e) => {
    // console.log(e.target.value);
    setAccount({ ...account, [e.target.name]: e.target.value });
    console.log(account);
  };

  const handleUpdate = (e) => {
    // e.preventDefault();
    const formData = new FormData();
    let lastname =''
    for (let index = 0; index < account.fullname.split(" ").length-1; index++) {
      if (index == account.fullname.split(" ").length-2) {
        lastname+=account.fullname.split(" ")[index]
      }
      else{
        lastname+=account.fullname.split(" ")[index] + " "
      }
    }
    formData.append("account_id", account.account_id);
    formData.append("firstName", account.fullname.split(" ").at(-1));
    formData.append("lastName", lastname );
    formData.append("dob", account.dob);
    formData.append("departmentId", account.department_id);
    formData.append("majorId", account.major_id);
    formData.append("isActive", account.isActive);
    formData.append("type", account.type);

    const currentUser = localStorage.getItem(`currentUser`);
    fetch(`${api}/admin/accounts/${oldAccountId}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: "Bearer " + currentUser,
      },
    });
    let newAccout = {account_id:account.account_id,fullname: account.fullname,type: account.type, isActive: account.isActive}
    prop.updateAccounts(oldAccountId,newAccout)
    handleOpen()
  };

  // if (document.getElementById("detail-information")) handleOpen();
  return (
    <>
      <div
        id="detail-information"
        className="flex-center"
        onClick={(e) => {
          handleOpen();
        }}
      >
        <div
          className="detail-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <ul className="input-list">
            <li className="input-item">
              <label htmlFor="">Mã cá nhân</label>
              <input
                type="text"
                name="account_id"
                id=""
                value={account?.account_id}
                onChange={(e) => handleAccount(e)}
              />
            </li>
            <li className="input-item">
              <label htmlFor="">Họ và tên</label>
              <input type="text" name="fullname" id="" value={account?.fullname} onChange={(e) => handleAccount(e)} />
            </li>
            <li className="input-item">
              <label htmlFor="">Ngày sinh</label>
              <input type="date" name="dob" id="" value={account.dob} onChange={(e) => handleAccount(e)} />
            </li>
            <li className="input-item">
              <label htmlFor="">Khoa</label>
              <Department departmentId={account?.department_id} handleAccount={handleAccount} />
            </li>
            <li className="input-item">
              <label htmlFor="">Ngành</label>
              <Majors departmentId={account?.department_id} majorId={account.major_id} handleAccount={handleAccount} />
            </li>
            <li className="input-item">
              <label htmlFor="">Loại tài khoản</label>
              <PermissionGroup permissionId={account?.type} handleAccount={handleAccount} />
            </li>
            <li className="input-item">
              <label htmlFor="">Kích hoạt</label>
              <input
                type="checkbox"
                name=""
                id=""
                checked={account?.isActive}
                onClick={(e) =>  {setAccount({...account, isActive:!account.isActive})}}
              />
            </li>
            <li className="input-item">
              <label htmlFor="">Ngày khởi tạo</label>
              <input
                type="DATE"
                name=""
                id=""
                value={account?.createdAt?.split("T")[0]}
              />
            </li>
          </ul>
          <div className="button-list flex-center">
            {/* Thao tác thay đổi sẽ được POST lên API */}
            <button className="save-btn__info" onClick={() =>handleUpdate()}>lưu</button>
            <button className="delete-btn__info">
              <span>xóa</span>
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailInformation;
