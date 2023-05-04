import { useEffect, useState } from "react";
import api from "../../.././config/config.js";

function DetailInformation(prop) {
   const [account, setAccount] = useState({})

   useEffect(() => {
		const currentUser = localStorage.getItem(`currentUser`);
		fetch(`${api}/admin//accounts/${prop.accountId}`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + currentUser,
			},
		})
			.then((res) => res.json())
			.then((info) => {
				console.log(info.data);
				setAccount(info.data);
			});
	}, []);

   prop.handleModal
   function handleOpen() {
      document
         .querySelector(".detail-content")
         .addEventListener("click", (e) => {
            e.stopPropagation();
         });
      prop.handleModal("")
   }

   // if (document.getElementById("detail-information")) handleOpen();
   return (
      <>
         <div id="detail-information" className="flex-center" onClick={()=>handleOpen()}>
            <div className="detail-content">
               <ul className="input-list">
                  <li className="input-item">
                     <label htmlFor="">Mã cá nhân</label>
                     <input type="text" name="" id="" value={account?.account_id} />
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Họ và tên</label>
                     <input type="text" name="" id="" value={account?.fullname} />
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Ngày sinh</label>
                     <input type="text" name="" id="" value={account?.dob}/>
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Khoa</label>
                     <input type="text" name="" id="" value={account?.department_name}/>
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Ngành</label>
                     <input type="text" name="" id="" value={account?.major_name}/>
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Loại tài khoản</label>
                     <input type="text" name="" id="" value={account?.type}/>
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Kích hoạt</label>
                     <input type="checkbox" name="" id="" checked={account?.isActive}/>
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Ngày khởi tạo</label>
                     <input type="text" name="" id="" value={account?.createdAt?.split("T")[0]}/>
                  </li>
               </ul>
               <div className="button-list flex-center">
                  {/* Thao tác thay đổi sẽ được POST lên API */}
                  <button className="save-btn__info">lưu</button>
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
