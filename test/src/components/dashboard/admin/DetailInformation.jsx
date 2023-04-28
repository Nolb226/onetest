function DetailInformation() {
   function handleOpen() {
      const detailModal = document.getElementById("detail-information");
      detailModal.addEventListener("click", () => {
         this.style.display = "none";
      });

      document
         .querySelector(".detail-content")
         .addEventListener("click", (e) => {
            e.stopPropagation();
         });
   }

   if (document.getElementById("detail-information")) handleOpen();
   return (
      <>
         <div id="detail-information" className="flex-center">
            <div className="detail-content">
               <ul className="input-list">
                  <li className="input-item">
                     <label htmlFor="">Mã cá nhân</label>
                     <input type="text" name="" id="" />
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Họ và tên</label>
                     <input type="text" name="" id="" />
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Ngày sinh</label>
                     <input type="text" name="" id="" />
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Khoa</label>
                     <input type="text" name="" id="" />
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Ngành</label>
                     <input type="text" name="" id="" />
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Loại tài khoản</label>
                     <input type="text" name="" id="" />
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Kích hoạt</label>
                     <input type="checkbox" name="" id="" />
                  </li>
                  <li className="input-item">
                     <label htmlFor="">Ngày khởi tạo</label>
                     <input type="text" name="" id="" />
                  </li>
               </ul>
               <div className="button-list flex-center">
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
