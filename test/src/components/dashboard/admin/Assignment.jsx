import { useState } from "react";
import LoadingData from "../../loadingAnimation/LoadingData";

function Assignment() {
   const [isLoadingData, setIsLoadingData] = useState(false);
   const [errorLoadingData, setErrorLoadingData] = useState("");
   const [subjectName, setSubjectName] = useState();
   const [openModal, setOpenModal] = useState(false);

   function findSubject(subjectId) {}

   return (
      <>
         <div
            className="flex-center flex-direction-col create-handicraft position-relative "
            id="assignment"
         >
            <div className="position-relative find-box">
               <div className="subject">
                  <div className="info-item find-subject">
                     <label
                        className="form-label"
                        htmlFor="subjectId"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Mã môn học
                     </label>
                     <div
                        className="flex-center"
                        style={{ height: "100%", width: "100%" }}
                     >
                        <input
                           type="text"
                           name="subjectId"
                           id="subjectId"
                           placeholder="Nhập mã môn học"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                              width: "100%",
                           }}
                        />
                     </div>
                  </div>

                  <div className="info-item find-subject">
                     <label
                        className="form-label"
                        htmlFor="subjectName"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Tên môn học
                     </label>
                     <div
                        className="flex-center"
                        style={{ height: "100%", width: "100%" }}
                     >
                        <input
                           type="text"
                           name="subjectName"
                           id="subjectName"
                           disabled="true"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                              width: "100%",
                           }}
                        />
                     </div>
                  </div>
               </div>

               <div className="add-new-teacher">
                  <div className="info-item find-subject">
                     <label
                        className="form-label"
                        htmlFor="subjectId"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Mã cá nhân
                     </label>
                     <div
                        className="flex-center"
                        style={{ height: "100%", width: "100%" }}
                     >
                        <input
                           type="text"
                           name="subjectId"
                           id="subjectId"
                           placeholder="Nhập mã cá nhân"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                              width: "100%",
                           }}
                        />
                     </div>
                  </div>

                  <div className="info-item find-subject">
                     <label
                        className="form-label"
                        htmlFor="teacherName"
                        style={{
                           color: "#222",
                           fontSize: "1.3rem",
                           fontWeight: "600",
                           width: "160px",
                        }}
                     >
                        Họ và tên
                     </label>
                     <div
                        className="flex-center"
                        style={{ height: "100%", width: "100%" }}
                     >
                        <input
                           type="text"
                           name="teacherName"
                           id="teacherName"
                           disabled="true"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                              width: "100%",
                           }}
                        />
                     </div>
                  </div>
                  <button className="assign-btn">Thêm</button>
               </div>
            </div>

            <div className="assigned-account">
               <div className="table-zone">
                  <header className="table__header">
                     <ul
                        className="flex-center table__content--heading"
                        style={{
                           display: "grid",
                           gridTemplateColumns: "25% 65% 10%",
                        }}
                     >
                        <li className="flex-center column-text">
                           <h3>Mã cá nhân</h3>
                        </li>
                        <li className="flex-center column-text">
                           <h3>Họ và tên</h3>
                        </li>
                        <li className="flex-center column-text">
                           <h3>Sửa</h3>
                        </li>
                     </ul>
                  </header>
                  <div className="grid table__content">
                     <div className="table__content--list position-relative">
                        {errorLoadingData && (
                           <div
                              className="flex-center"
                              style={{
                                 width: "100%",
                                 height: "100%",
                                 marginTop: "20px",
                                 fontSize: "1.6rem",
                                 color: "#777",
                              }}
                           >
                              {errorLoadingData}
                           </div>
                        )}
                        {isLoadingData && <LoadingData />}
                        <ul
                           className="flex-center table__content--item"
                           style={{
                              display: "grid",
                              gridTemplateColumns: "25% 65% 10%",
                           }}
                           // key={index}
                        >
                           <li className="flex-center column-text">
                              <h3>10991</h3>
                           </li>
                           <li className="flex-center column-text">
                              <h3>Nguyễn Thanh Sang</h3>
                           </li>
                           <li className="flex-center column-text">
                              <button
                                 className="view-btn"
                                 style={{
                                    backgroundColor: "#cc2424",
                                    // color: "#cc2424",
                                    // border: "solid 2px #cc2424",
                                 }}
                              >
                                 Gỡ
                              </button>
                           </li>
                        </ul>
                        {/* {classes.map((item, index) => {
                              return (
                                 <ul
                                    className="flex-center table__content--item"
                                    style={{
                                       display: "grid",
                                       gridTemplateColumns: "18% 37% 35% 10%",
                                    }}
                                    key={index}
                                    
                                 >
                                    <li className="flex-center column-text">
                                       <h3>{item.id}</h3>
                                    </li>
                                    <li className="flex-center column-text">
                                       <h3>{item.name}</h3>
                                    </li>
                                    <li className="flex-center column-text">
                                       <h3>{item.lecture_name}</h3>
                                    </li>
                                    <li className="flex-center column-text">
                                       <h3>{item.totalStudent}</h3>
                                    </li>
                                 </ul>
                              );
                           })} */}
                     </div>
                  </div>

                  <div className="mobile-table-content">
                     {/* {classes.map((item, index) => {
                        return (
                           <div
                              className="flex-center mobile-table-item"
                              key={index}
                           >
                              <h3>{item.id}</h3>
                              <span style={{ color: "#555" }}>{item.name}</span>
                              <span style={{ color: "var(--highlight-color)" }}>
                                 Môn:&nbsp; {item.lecture_name}
                              </span>
                              <span style={{ color: "#555" }}>
                                 Số lượng:&nbsp;{item.totalStudent}
                              </span>
                              <button
                                 className="view-btn"
                                 style={{ backgroundColor: "#111967" }}
                                 
                              >
                                 Tạo
                              </button>
                           </div>
                        );
                     })} */}
                     <div
                        className="flex-center mobile-table-item"
                        // key={index}
                     >
                        <h3>10991</h3>
                        <span style={{ color: "#555" }}>Nguyễn Thanh Sang</span>

                        <button
                           className="view-btn"
                           style={{ backgroundColor: "#cc2424" }}
                        >
                           Gỡ
                        </button>
                     </div>

                     <div
                        className="flex-center mobile-table-item"
                        // key={index}
                     >
                        <h3>10991</h3>
                        <span style={{ color: "#555" }}>Nguyễn Thanh Sang</span>

                        <button
                           className="view-btn"
                           style={{ backgroundColor: "#cc2424" }}
                        >
                           Gỡ
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Assignment;
