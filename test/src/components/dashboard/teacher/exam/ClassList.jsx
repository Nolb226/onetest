import React, { useEffect, useState } from "react";
import Classlist from "../Class/ClassList";
import api from "../../../../config/config";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import CreateExamModal from "./CreateExamModal";
import LoadingData from "../../../loadingAnimation/LoadingData";
import Classes from "../Class/Classes";

function CreateMethod() {
   const [typeMethod, setTypeMethod] = useState("");
   return (
      <>
         {typeMethod === "" ? (
            <div className="create-exam flex-center flex-direction-row">
               <div
                  className="create-exam__option flex-center flex-direction-col"
                  onClick={() => {
                     // setCreateMethod(false);
                     setTypeMethod("handicraft");
                  }}
               >
                  <i className="option-handicraft fa-solid fa-file-pen"></i>
                  <h2 className="create-exam__option--title">
                     Tạo đề thủ công
                  </h2>
               </div>

               <div
                  className="create-exam__option flex-center flex-direction-col"
                  onClick={() => {
                     // setCreateMethod(false);
                     setTypeMethod("seclectFromBank");
                  }}
               >
                  <i className="option-bank fa-solid fa-building-columns"></i>
                  <h2 className="create-exam__option--title">
                     Chọn từ ngân hàng đề
                  </h2>
               </div>
            </div>
         ) : (
            <CreateExamModal type={typeMethod} />
         )}
      </>
   );
}

function ClassList() {
   const currentUser = localStorage.getItem("currentUser");
   const [searchParams, setSearchParams] = useSearchParams({});
   const [classes, setClasses] = useState([]);

   const [isLoadingData, setIsLoadingData] = useState(false);
   const [errorLoadingData, setErrorLoadingData] = useState("");
   // const [selectedClass, setSelectedClass] = useState({});
   // console.log(selectedClass);

   const getClassData = async () => {
      setIsLoadingData(true);
      await fetch(`${api}/classes/manage`, {
         headers: {
            Authorization: "Bearer " + currentUser,
         },
      })
         .then((data) => data.json())
         .then((data) => {
            setClasses(data.data.data);
            setIsLoadingData(false);
         })
         .catch(() => {
            setErrorLoadingData("Không thể lấy dữ liệu. Vui lòng thử lại !");
            setIsLoadingData(false);
         });
   };

   useEffect(() => {
      getClassData();
   }, []);

   return (
      <>
         {!searchParams.get("id") ? (
            <>
               <div className="flex-center search-bar">
                  <h2
                     style={{
                        fontWeight: "600",
                        fontSize: "1.7rem",
                        lineHeight: "2.1rem",
                        color: "#161f80",
                     }}
                  >
                     Chọn lớp cần tạo
                  </h2>
               </div>
               <div className="table-zone">
                  <header className="table__header">
                     <ul
                        className="flex-center table__content--heading"
                        style={{
                           display: "grid",
                           gridTemplateColumns: "18% 37% 35% 10%",
                        }}
                     >
                        <li className="flex-center column-text">
                           <h3>Mã lớp</h3>
                        </li>
                        <li className="flex-center column-text">
                           <h3>Tên lớp</h3>
                        </li>
                        <li className="flex-center column-text">
                           <h3>Tên môn học</h3>
                        </li>
                        <li className="flex-center column-text">
                           <h3>Số lượng</h3>
                        </li>
                     </ul>
                     <div className="filter-box"></div>
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
                        {classes.map((item, index) => {
                           return (
                              <ul
                                 className="flex-center table__content--item"
                                 style={{
                                    display: "grid",
                                    gridTemplateColumns: "18% 37% 35% 10%",
                                 }}
                                 key={index}
                                 onClick={() =>
                                    setSearchParams({ id: item.id })
                                 }
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
                        })}
                     </div>
                  </div>

                  <div className="mobile-table-content">
                     {classes.map((item, index) => {
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
                                 onClick={() =>
                                    setSearchParams({ id: item.id })
                                 }
                              >
                                 Tạo
                              </button>
                           </div>
                        );
                     })}
                  </div>
               </div>
            </>
         ) : (
            <CreateMethod
               type={"handicraft"}
               setSearchParams={setSearchParams}
               classList={classes}
            />
         )}
      </>
   );
}

export default ClassList;
