import { useEffect, useState } from "react";
import api from "../../../config/config";
import socket from "../../../util/socket";
import { useOutletContext } from "react-router";

function Permission() {
   //   console.log("re-render");

   const { permissions } = useOutletContext();

   const isAllowedToPost = permissions.find((x) => x.id === 20);
   const isAllowedToPut = permissions.find((x) => x.id === 21);
   const isAllowedToDelete = permissions.find((x) => x.id === 22);

   const isDisabled = !isAllowedToPut;

   const [permission, setPermission] = useState({});
   const [permissionName, setPermissionName] = useState([]);
   const [functions, setFunction] = useState([]);
   const [isPermission, setIsPermission] = useState("");

   useEffect(() => {
      const currentUser = localStorage.getItem(`currentUser`);
      fetch(`${api}/admin/permissions`, {
         method: "GET",
         headers: {
            Authorization: "Bearer " + currentUser,
         },
      })
         .then((res) => res.json())
         .then((permission) => {
            // console.log(permission.data);
            setPermissionName(permission.data);
            setIsPermission(permission.data[0].id);
         });
   }, []);

   useEffect(() => {
      const currentUser = localStorage.getItem(`currentUser`);
      fetch(`${api}/admin/permissions/${isPermission}/functions`, {
         method: "GET",
         headers: {
            Authorization: "Bearer " + currentUser,
         },
      })
         .then((res) => res.json())
         .then((funcs) => {
            const list = funcs.data.map((func) => {
               return { id: func.id };
            });
            console.log(list);
            setFunction(list);
         });
   }, [isPermission]);

   function createNewPermission() {
      // console.log(permission);
      const currentUser = localStorage.getItem(`currentUser`);
      fetch(`${api}/admin/permissions`, {
         method: "POST",
         body: JSON.stringify(permission),
         headers: {
            Authorization: "Bearer " + currentUser,
            "Content-type": "application/json",
         },
      }).then((response) => {
         if (response.ok) {
            alert("Tạo nhóm quyền thành công");
            setPermissionName((prev) => [...prev, permission]);
            setPermission({});
         } else {
            alert("Tạo nhóm quyền thất bại");
         }
      });
   }

   const deleteGroup = (permissionId) => {
      const currentUser = localStorage.getItem(`currentUser`);
      fetch(`${api}/admin/permissions/${permissionId}`, {
         method: "DELETE",
         // body: JSON.stringify(permission),
         headers: {
            Authorization: "Bearer " + currentUser,
            // 'Content-type': 'application/json',
         },
      }).then((response) => {
         if (response.ok) {
            alert("Xóa nhóm quyền thành công");
            setPermissionName((prev) =>
               prev.filter((x) => x.id !== permissionId)
            );
            // setPermission({});
         } else {
            alert("Xóa nhóm quyền thất bại");
         }
      });
   };

   const handleFuntions = (value) => {
      // console.log(value);
      // console.log(functions.filter((func)=>func.id==value).length==0);
      if (functions.filter((func) => func.id == value).length == 0) {
         setFunction([...functions, { id: +value }]);
      } else {
         const list = functions.filter((func) => func.id != value);
         setFunction(list);
      }
   };

   const updatePermission = () => {
      const currentUser = localStorage.getItem(`currentUser`);
      fetch(`${api}/admin/permissions/${isPermission}`, {
         method: "PUT",
         body: JSON.stringify({ functions }),
         headers: {
            Authorization: "Bearer " + currentUser,
            "Content-type": "application/json",
         },
      }).then(() => {});
   };

   return (
      <>
         <div className="flex-center createNew mobile-mode">
            {isAllowedToPost && (
               <>
                  <input
                     type="text"
                     value={permission.name || ""}
                     name="permissionName"
                     id="permissionName"
                     placeholder="Nhập tên nhóm quyền"
                     onChange={(e) => {
                        setPermission({
                           id: e.target.value,
                           name: e.target.value,
                        });
                     }}
                  />
                  <button onClick={() => createNewPermission()}>
                     <i className="fa-solid fa-plus"></i>
                  </button>
               </>
            )}
         </div>
         <div className="gridContainer">
            <div className="left-item position-relative">
               <div className="createNew">
                  {isAllowedToPost && (
                     <>
                        <input
                           type="text"
                           value={permission.name || ""}
                           name="permissionName"
                           id="permissionName"
                           placeholder="Nhập tên nhóm quyền"
                           onChange={(e) => {
                              setPermission({
                                 id: e.target.value,
                                 name: e.target.value,
                              });
                           }}
                        />
                        <button onClick={() => createNewPermission()}>
                           <i className="fa-solid fa-plus"></i>
                        </button>
                     </>
                  )}
               </div>

               <div className="permissionList">
                  <h2>Nhóm quyền đã tạo</h2>
                  <ul>
                     {permissionName.map((permission) => {
                        return (
                           <li
                              className={`${
                                 permission.id == isPermission
                                    ? "permission-name selected"
                                    : "permission-name"
                              }`}
                              key={permission.id}
                              data-id={permission.id}
                              onClick={(e) => {
                                 // console.log(e.currentTarget.getAttribute("data-id"));
                                 setIsPermission(
                                    e.currentTarget.getAttribute("data-id")
                                 );
                              }}
                           >
                              {isAllowedToDelete && (
                                 <i
                                    className="fa-solid fa-trash-can"
                                    style={{
                                       color: "#cc2424",
                                       fontSize: "1.4rem",
                                    }}
                                    onClick={() => deleteGroup(permission.id)}
                                 ></i>
                              )}
                              <span>{permission.name}</span>

                              <i class="fa-solid fa-chevron-right"></i>
                           </li>
                        );
                     })}
                  </ul>
               </div>
               {isAllowedToPut && (
                  <button
                     className="save-btn"
                     onClick={() => updatePermission()}
                  >
                     Lưu
                  </button>
               )}
            </div>

            <ul className="right-item">
               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý bài thi</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={1}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 1).length ==
                              0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xem</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={2}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 2).length ==
                              0
                                 ? false
                                 : true
                           }
                        />
                        <span>Thêm</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={3}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 3).length ==
                              0
                                 ? false
                                 : true
                           }
                        />
                        <span>Sửa</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={4}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 4).length ==
                              0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xóa</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Join Lớp</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={5}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 5).length ==
                              0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xem</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={6}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 6).length ==
                              0
                                 ? false
                                 : true
                           }
                        />
                        <span>Tham gia lớp</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Thống kê</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={7}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 7).length ==
                              0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xem thống kê</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Quản lý Lớp</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={8}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 8).length ==
                              0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xem</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={9}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 9).length ==
                              0
                                 ? false
                                 : true
                           }
                        />
                        <span>Thêm</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={10}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 10)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Sửa</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={11}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 11)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xóa</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">
                     Ngân hàng câu hỏi
                  </h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={12}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 12)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xem</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={13}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 13)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Thêm</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={14}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 14)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Sửa</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={15}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 15)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xóa</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">
                     Quản lý tài khoản
                  </h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={16}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 16)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xem</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={17}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 17)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Sửa</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={18}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 18)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xóa</span>
                     </li>
                  </ul>
               </li>

               <li className="permission-table">
                  <h2 className="permission-table__heading">Phân quyền</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={19}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 19)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xem</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={20}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 20)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Thêm</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={21}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 21)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Sửa</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={22}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 22)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Xóa</span>
                     </li>
                  </ul>
               </li>
               <li className="permission-table">
                  <h2 className="permission-table__heading">Khóa</h2>

                  <ul className="permission-list">
                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={23}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 23)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Khóa lớp</span>
                     </li>

                     <li className="permission-item">
                        <input
                           type="checkbox"
                           name=""
                           id=""
                           value={24}
                           onClick={(e) => {
                              isAllowedToPut && handleFuntions(e.target.value);
                           }}
                           disabled={isDisabled}
                           checked={
                              functions.filter((func) => func.id == 24)
                                 .length == 0
                                 ? false
                                 : true
                           }
                        />
                        <span>Khóa chi tiết bài thi</span>
                     </li>
                  </ul>
               </li>
            </ul>
         </div>
      </>
   );
}

export default Permission;
