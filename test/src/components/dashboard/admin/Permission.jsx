import { useState } from "react";

function Permission() {
   console.log("re-render");

   const [permission, setPermission] = useState();
   const [permissionName, setPermissionName] = useState([
      "Sinh viên",
      "Giảng viên",
      "Admin",
      "Trưởng khoa",
   ]);

   function handleActive(childElement) {
      const permissionNames = document.querySelectorAll(".permission-name");
      permissionNames.forEach((item) => {
         item.classList.remove("selected");
      });
      childElement.closest(".permission-name").classList.add("selected");
   }

   function createNewPermission() {
      setPermissionName((prev) => [...prev, permission]);
      setPermission("");
   }

   return (
      <>
         <div className="gridContainer">
            <div className="left-item position-relative">
               <div className="createNew">
                  <input
                     type="text"
                     value={permission}
                     name="permissionName"
                     id="permissionName"
                     placeholder="Nhập tên nhóm quyền"
                     onChange={(e) => {
                        setPermission(e.target.value);
                     }}
                  />
                  <button
                     style={{
                        width: "80px",
                        height: "100%",
                        color: "#fff",
                        backgroundColor: "var(--primary-color)",
                        borderRadius: "0 5px 5px 0",
                     }}
                     onClick={createNewPermission}
                  >
                     Tạo mới
                  </button>
               </div>

               <div className="permissionList">
                  <h2 style={{ fontWeight: "600", fontSize: "1.6rem" }}>
                     Danh sách nhóm quyền đã tạo
                  </h2>
                  <ul>
                     {permissionName.map((name) => (
                        <li
                           className="permission-name"
                           onClick={(e) => {
                              handleActive(e.target);
                           }}
                        >
                           <span>{name}</span>
                           <i class="fa-solid fa-chevron-right"></i>
                        </li>
                     ))}
                  </ul>
               </div>
               <button className="save-btn">Lưu</button>
            </div>

            <ul className="right-item">
               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý bài thi</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý bài thi</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý bài thi</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý bài thi</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý bài thi</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý bài thi</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý bài thi</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý bài thi</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>

                     <li className="permission-item">
                        <input type="checkbox" name="" id="" />
                        <span>Tạo bài thi</span>
                     </li>
                  </ul>
               </li>
            </ul>
         </div>
      </>
   );
}

export default Permission;
