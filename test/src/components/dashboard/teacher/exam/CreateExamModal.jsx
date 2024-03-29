import { useState, useEffect } from "react";
import api from "../../../../config/config.js";
import "./styleExam.css";

export default function CreateExamModal({ type, setType }) {
   console.log(type);
   // console.log(setType);
   function Handicraft() {
      const layout = {
         width: "900px",
         height: "98%",
         margin: "17px auto",
         overflowY: "scroll",
         justifyContent: "flex-start",
      };

      const infoBox = {
         height: "216px",
         borderRadius: "10px",
         backgroundColor: "#fff",
         width: "88.5%",
         marginRight: "11.1%",
      };

      const questionList = {
         marginTop: "20px",
         maxHeight: "290px",
         width: "100%",
         paddingRight: "100px",
      };

      const questionBox = {
         height: "260px",
         backgroundColor: "#fff",
         width: "100%",
         borderRadius: "10px",
         borderLeft: "solid 10px #1F2EC9",
         marginBottom: "15px",
      };

      const questionInput = {
         width: "690px",
         height: "40px",
         border: "none",
         borderBottom: "2px solid #BFBFBF",
         background: "#F0F0F0",
         padding: "5px 10px",
         fontSize: "1.7rem",
         outline: "none",
         color: "#333",
      };

      const answer = {
         flex: "1",
         height: "35px",
         border: "none",
         borderBottom: "1px solid #BFBFBF",
         background: "#fff",
         padding: "0 10px",
         fontSize: "1.6rem",
         outline: "none",
         color: "#333",
         marginLeft: "15px",
      };

      const questionSideMenu = {
         width: "100%",
         height: "30px",
         margin: "2px",
         background: "#FFFFFF",
         boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
         borderRadius: "2px",
         fontSize: "1.3rem",
      };
      return (
         <>
            <div
               className="flex-center flex-direction-col create-handicraft"
               style={layout}
            >
               <div
                  className="flex-center flex-direction-col position-relative"
                  style={infoBox}
               >
                  <div
                     className="flex-center from-group"
                     style={{ width: "89%", margin: "10px 0" }}
                  >
                     <label
                        className="form-label"
                        htmlFor="name"
                        style={{
                           color: "#222",
                           fontSize: "1.4rem",
                           fontWeight: "600",
                           width: "120px",
                        }}
                     >
                        Tên bài thi
                     </label>
                     <input
                        rules="require"
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nhập tên bài thi"
                        style={{
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           flex: "1",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </div>
                  <div
                     className="flex-center"
                     style={{ width: "89%", margin: "10px 0" }}
                  >
                     <label
                        htmlFor="name"
                        style={{
                           color: "#222",
                           fontSize: "1.4rem",
                           fontWeight: "600",
                           width: "120px",
                        }}
                     >
                        Mã đề
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nhập mã đề"
                        style={{
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           flex: "1",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </div>
                  <div
                     className="flex-center"
                     style={{
                        width: "89%",
                        margin: "10px 0",
                        justifyContent: "flex-start",
                     }}
                  >
                     <label
                        htmlFor="name"
                        style={{
                           color: "#222",
                           fontSize: "1.4rem",
                           fontWeight: "600",
                           width: "120px",
                        }}
                     >
                        Thang điểm
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        style={{
                           width: "40px",
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </div>
               </div>
               <div className="" style={questionList}>
                  <div
                     className="flex-center flex-direction-col position-relative"
                     style={questionBox}
                  >
                     <ul
                        className="flex-center flex-direction-col position-absolute"
                        style={{
                           right: "-98px",
                           top: "0",
                           width: "95px",
                           borderRadius: "5px",
                           backgroundColor: "#f0f0f0",
                           height: "100px",
                           padding: "4px",
                        }}
                     >
                        <li className="flex-center" style={questionSideMenu}>
                           <select
                              name="level"
                              id=""
                              style={{
                                 width: "100%",
                                 height: "25px",
                                 border: "none",
                                 outline: "none",
                                 // paddingLeft: "15px",
                                 textAlign: "center",
                              }}
                           >
                              <option value="null">Mức độ</option>
                              <option value="easy">Dễ</option>
                              <option value="medium">Vừa</option>
                              <option value="hard">Khó</option>
                           </select>
                        </li>
                        <li className="flex-center" style={questionSideMenu}>
                           Thêm
                        </li>
                        <li className="flex-center" style={questionSideMenu}>
                           Xóa
                        </li>
                     </ul>
                     <input
                        name="question"
                        style={questionInput}
                        placeholder="Câu hỏi"
                     ></input>

                     <div
                        className="flex-center flex-direction-col"
                        style={{ marginTop: "15px" }}
                     >
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 1"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 2"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 3"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 4"
                           ></input>
                        </div>
                     </div>
                  </div>

                  <div
                     className="flex-center flex-direction-col position-relative"
                     style={questionBox}
                  >
                     <ul
                        className="flex-center flex-direction-col position-absolute"
                        style={{
                           right: "-98px",
                           top: "0",
                           width: "95px",
                           borderRadius: "5px",
                           backgroundColor: "#f0f0f0",
                           height: "100px",
                           padding: "3px",
                        }}
                     >
                        <li className="flex-center" style={questionSideMenu}>
                           <select
                              name="level"
                              id=""
                              style={{
                                 width: "100%",
                                 height: "25px",
                                 border: "none",
                                 outline: "none",
                                 // paddingLeft: "15px",
                                 textAlign: "center",
                              }}
                           >
                              <option value="null">Mức độ</option>
                              <option value="easy">Dễ</option>
                              <option value="medium">Vừa</option>
                              <option value="hard">Khó</option>
                           </select>
                        </li>
                        <li className="flex-center" style={questionSideMenu}>
                           Thêm
                        </li>
                        <li className="flex-center" style={questionSideMenu}>
                           Xóa
                        </li>
                     </ul>
                     <input
                        name="question"
                        style={questionInput}
                        placeholder="Câu hỏi"
                     ></input>

                     <div
                        className="flex-center flex-direction-col"
                        style={{ marginTop: "15px" }}
                     >
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 1"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 2"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 3"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 4"
                           ></input>
                        </div>
                     </div>
                  </div>

                  <div
                     className="flex-center flex-direction-col position-relative"
                     style={questionBox}
                  >
                     <ul
                        className="flex-center flex-direction-col position-absolute"
                        style={{
                           right: "-98px",
                           top: "0",
                           width: "95px",
                           borderRadius: "5px",
                           backgroundColor: "#f0f0f0",
                           height: "100px",
                           padding: "3px",
                        }}
                     >
                        <li className="flex-center" style={questionSideMenu}>
                           <select
                              name="level"
                              id=""
                              style={{
                                 width: "100%",
                                 height: "25px",
                                 border: "none",
                                 outline: "none",
                                 // paddingLeft: "15px",
                                 textAlign: "center",
                              }}
                           >
                              <option value="null">Mức độ</option>
                              <option value="easy">Dễ</option>
                              <option value="medium">Vừa</option>
                              <option value="hard">Khó</option>
                           </select>
                        </li>
                        <li className="flex-center" style={questionSideMenu}>
                           Thêm
                        </li>
                        <li className="flex-center" style={questionSideMenu}>
                           Xóa
                        </li>
                     </ul>
                     <input
                        name="question"
                        style={questionInput}
                        placeholder="Câu hỏi"
                     ></input>

                     <div
                        className="flex-center flex-direction-col"
                        style={{ marginTop: "15px" }}
                     >
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 1"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 2"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 3"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 4"
                           ></input>
                        </div>
                     </div>
                  </div>

                  <div
                     className="flex-center flex-direction-col position-relative"
                     style={questionBox}
                  >
                     <ul
                        className="flex-center flex-direction-col position-absolute"
                        style={{
                           right: "-98px",
                           top: "0",
                           width: "95px",
                           borderRadius: "5px",
                           backgroundColor: "#f0f0f0",
                           height: "100px",
                           padding: "3px",
                        }}
                     >
                        <li className="flex-center" style={questionSideMenu}>
                           <select
                              name="level"
                              id=""
                              style={{
                                 width: "100%",
                                 height: "25px",
                                 border: "none",
                                 outline: "none",
                                 // paddingLeft: "15px",
                                 textAlign: "center",
                              }}
                           >
                              <option value="null">Mức độ</option>
                              <option value="easy">Dễ</option>
                              <option value="medium">Vừa</option>
                              <option value="hard">Khó</option>
                           </select>
                        </li>
                        <li className="flex-center" style={questionSideMenu}>
                           Thêm
                        </li>
                        <li className="flex-center" style={questionSideMenu}>
                           Xóa
                        </li>
                     </ul>
                     <input
                        name="question"
                        style={questionInput}
                        placeholder="Câu hỏi"
                     ></input>

                     <div
                        className="flex-center flex-direction-col"
                        style={{ marginTop: "15px" }}
                     >
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 1"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 2"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 3"
                           ></input>
                        </div>
                        <div
                           className="flex-center"
                           style={{ width: "690px", height: "40px" }}
                        >
                           <input type="radio" name="correct" id="correct" />
                           <input
                              name="question"
                              style={answer}
                              placeholder="Đáp án 4"
                           ></input>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <button
               className="flex-center flex-direction-col position-absolute"
               style={{
                  right: "15px",
                  top: "0",
                  width: "99px",
                  borderRadius: "5px",
                  backgroundColor: "var(--primary-color)",
                  color: "fff",
                  textTransform: "uppercase",
                  height: "30px",
                  padding: "4px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px",
               }}
            >
               tạo đề
            </button>
         </>
      );
   }

   function SelectFromBank() {
      const selectFromBankLayout = {
         width: "100%",
         height: "100%",
         marginTop: "1px",
         padding: "2%",
         backgroundColor: "#fff",
         position: "absolute",
         right: "0",
         left: "0",
         alignItems: "flex-start",
         boxSizing: "border-box",
      };

      const inputList = {
         padding: "10% 0px 0px 12px",
         width: "100%",
         height: "100%",
         minHeight: "450px",
         justifyContent: "flex-start",
      };

      const label = {
         color: "##444444",
         fontSize: "1.4rem",
         fontWeight: "600",
         width: "120px",
      };

      const question = {
         width: "690px",
         height: "35px",
         border: "none",
         flex: "1",
         background: "#F0F0F0",
         padding: "0 10px",
         fontSize: "1.7rem",
         fontWeight: "600",
         lineHeight: "3.5rem",
         outline: "none",
         color: "#444",
      };

      const answer = {
         flex: "1",
         height: "20px",
         lineHeight: "2rem",
         border: "none",
         background: "#fff",
         padding: "0 10px",
         fontSize: "1.6rem",
         outline: "none",
         color: "#555",
         marginLeft: "15px",
      };

      const [examData, setExamData] = useState([]);

      useEffect(() => {
         const getExamData = async () => {
            const userreq = await fetch(`${api}/classes/exams`, {
               headers: {
                  Authorization:
                     "Bearer " +
                     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxNDQ0MjI1LCJleHAiOjE2ODE3MDM0MjV9.nd02aUsdaCVSvrIOHXG7rmJaxAW4K5ugCLy8vnhsJ4U",
               },
            });
            const data = await userreq.json();
            setExamData(data.data);
         };
         getExamData();
      }, []);

      return (
         <div className="flex-center" style={selectFromBankLayout}>
            <div
               className="flex-center position-relative"
               style={{
                  width: "450px",
                  maxHeight: "100%",
                  borderRight: "1px solid #d5d5d5",
                  paddingRight: "25px",
               }}
            >
               <h2
                  className="position-absolute"
                  style={{
                     top: "0px",
                     left: "0px",
                     fontWeight: "600",
                     fontSize: "1.6rem",
                     lineHeight: "2.1rem",
                     color: "#424242",
                  }}
               >
                  Chọn từ ngân hàng đề
               </h2>

               <ul className="flex-center flex-direction-col" style={inputList}>
                  <li
                     className="flex-center"
                     style={{ width: "100%", margin: "5px 0" }}
                  >
                     <label htmlFor="name" style={label} className="form-label">
                        Tên bài thi
                     </label>
                     <input
                        rules="require"
                        className="form-control"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nhập tên bài thi"
                        style={{
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           flex: "1",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </li>

                  <li
                     className="flex-center"
                     style={{ width: "100%", margin: "5px 0" }}
                  >
                     <label htmlFor="name" style={label}>
                        Mã đề
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nhập mã đề"
                        style={{
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           flex: "1",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </li>
                  <li
                     className="flex-center"
                     style={{ width: "100%", margin: "5px 0" }}
                  >
                     <label htmlFor="name" style={label}>
                        Ngày thi
                     </label>
                     <input
                        type="date"
                        name="name"
                        id="name"
                        placeholder="Nhập tên bài thi"
                        style={{
                           fontSize: "1.4rem",
                           padding: "0 15px 0 15px",
                           flex: "1",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </li>

                  <li
                     className="flex-center"
                     style={{ width: "100%", margin: "5px 0" }}
                  >
                     <label htmlFor="name" style={label}>
                        Giờ thi
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nhập tên bài thi"
                        style={{
                           fontSize: "1.4rem",
                           paddingLeft: "10px",
                           flex: "1",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </li>

                  <li
                     className="flex-center"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        justifyContent: "space-between",
                     }}
                  >
                     <div className="flex-center">
                        <label htmlFor="name" style={label}>
                           Thời gian
                        </label>
                        <input
                           type="text"
                           name="name"
                           id="name"
                           placeholder="...phút"
                           style={{
                              fontSize: "1.4rem",
                              width: "60px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                              textAlign: "center",
                           }}
                        />
                     </div>
                     <div className="flex-center">
                        <label htmlFor="name" style={label}>
                           Thang điểm
                        </label>
                        <input
                           type="text"
                           name="name"
                           id="name"
                           style={{
                              fontSize: "1.4rem",
                              paddingLeft: "10px",
                              width: "50px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                           }}
                        />
                     </div>
                  </li>

                  <li
                     className="flex-center"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        justifyContent: "space-between",
                     }}
                  >
                     <div className="flex-center">
                        <label htmlFor="name" style={label}>
                           Tổng số câu
                        </label>
                        <input
                           type="text"
                           name="name"
                           id="name"
                           style={{
                              fontSize: "1.4rem",
                              width: "60px",
                              height: "30px",
                              outline: "none",
                              borderRadius: "4px",
                              border: "solid 2px #BFBFBF",
                              textAlign: "center",
                           }}
                        />
                     </div>
                     <select
                        name="create"
                        id="create"
                        style={{
                           fontSize: "1.4rem",
                           width: "150px",
                           height: "30px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                           textAlign: "center",
                        }}
                     >
                        <option value="random">Ngẫu nhiên</option>
                        <option value="randomAll">Ngẫu nhiên tất cả</option>
                     </select>
                  </li>

                  <li
                     className="flex-center"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        justifyContent: "flex-start",
                     }}
                  >
                     <label htmlFor="name" style={label}>
                        Số câu dễ
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        style={{
                           textAlign: "center",
                           fontSize: "1.4rem",
                           height: "30px",
                           width: "60px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </li>

                  <li
                     className="flex-center"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        justifyContent: "flex-start",
                     }}
                  >
                     <label htmlFor="name" style={label}>
                        Số câu vừa
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        style={{
                           fontSize: "1.4rem",
                           textAlign: "center",
                           height: "30px",
                           width: "60px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </li>

                  <li
                     className="flex-center"
                     style={{
                        width: "100%",
                        margin: "5px 0",
                        justifyContent: "flex-start",
                     }}
                  >
                     <label htmlFor="name" style={label}>
                        Số câu khó
                     </label>
                     <input
                        type="text"
                        name="name"
                        id="name"
                        style={{
                           fontSize: "1.4rem",
                           textAlign: "center",
                           height: "30px",
                           width: "60px",
                           outline: "none",
                           borderRadius: "4px",
                           border: "solid 2px #BFBFBF",
                        }}
                     />
                  </li>
               </ul>
               <button
                  style={{
                     width: "125px",
                     height: "35px",
                     backgroundColor: "#1F2EC9",
                     borderRadius: "5px",
                     position: "absolute",
                     bottom: "-10px",
                     left: "auto",
                     right: "auto",
                     textTransform: "uppercase",
                     fontWeight: "600",
                     fontSize: "1.5rem",
                     letterSpacing: "1px",
                  }}
               >
                  Tạo
               </button>
            </div>

            <div
               style={{
                  flex: "1",
                  height: "530px",
                  marginTop: "20px",
                  overflow: "hidden",
               }}
            >
               <div
                  className="position-absolute"
                  style={{ top: "10px", right: "45px" }}
               >
                  <label htmlFor="chapter" style={label}>
                     Chương
                  </label>
                  <select
                     name="chapter"
                     id="chapter"
                     style={{
                        marginLeft: "10px",
                        height: "20px",
                        width: "35px",
                     }}
                  >
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                  </select>
               </div>
               <ul
                  className="flex-center flex-direction-col"
                  style={{
                     flex: "1",
                     height: "450px",
                     paddingLeft: "10px",
                     overflowY: "scroll",
                     paddingTop: "547px",
                  }}
               >
                  <li
                     style={{
                        width: "100%",
                        padding: "5px 0",
                        borderBottom: "solid 1px #d5d5d5",
                     }}
                  >
                     <div style={{ width: "100%" }}>
                        <div className="flex-center" style={{ width: "100%" }}>
                           <input
                              type="checkbox"
                              name=""
                              id=""
                              style={{
                                 width: "18px",
                                 height: "18px",
                                 marginRight: "5px",
                              }}
                           />
                           <h1
                              name="question"
                              style={question}
                              placeholder="Câu hỏi"
                           >
                              Câu 1: Nêu quy tắc hoạt động của 1 website
                           </h1>
                        </div>

                        <div
                           className="flex-center flex-direction-col"
                           style={{ marginTop: "15px", paddingLeft: "20px" }}
                        >
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                        </div>
                     </div>
                  </li>

                  <li
                     style={{
                        width: "100%",
                        padding: "5px 0",
                        borderBottom: "solid 1px #d5d5d5",
                     }}
                  >
                     <div style={{ width: "100%" }}>
                        <div className="flex-center" style={{ width: "100%" }}>
                           <input
                              type="checkbox"
                              name=""
                              id=""
                              style={{
                                 width: "18px",
                                 height: "18px",
                                 marginRight: "5px",
                              }}
                           />
                           <h1
                              name="question"
                              style={question}
                              placeholder="Câu hỏi"
                           >
                              Câu 1: Nêu quy tắc hoạt động của 1 website
                           </h1>
                        </div>

                        <div
                           className="flex-center flex-direction-col"
                           style={{ marginTop: "15px", paddingLeft: "20px" }}
                        >
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                        </div>
                     </div>
                  </li>

                  <li
                     style={{
                        width: "100%",
                        padding: "5px 0",
                        borderBottom: "solid 1px #d5d5d5",
                     }}
                  >
                     <div style={{ width: "100%" }}>
                        <div className="flex-center" style={{ width: "100%" }}>
                           <input
                              type="checkbox"
                              name=""
                              id=""
                              style={{
                                 width: "18px",
                                 height: "18px",
                                 marginRight: "5px",
                              }}
                           />
                           <h1
                              name="question"
                              style={question}
                              placeholder="Câu hỏi"
                           >
                              Câu 1: Nêu quy tắc hoạt động của 1 website
                           </h1>
                        </div>

                        <div
                           className="flex-center flex-direction-col"
                           style={{ marginTop: "15px", paddingLeft: "20px" }}
                        >
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                        </div>
                     </div>
                  </li>

                  <li
                     style={{
                        width: "100%",
                        padding: "5px 0",
                        borderBottom: "solid 1px #d5d5d5",
                     }}
                  >
                     <div style={{ width: "100%" }}>
                        <div className="flex-center" style={{ width: "100%" }}>
                           <input
                              type="checkbox"
                              name=""
                              id=""
                              style={{
                                 width: "18px",
                                 height: "18px",
                                 marginRight: "5px",
                              }}
                           />
                           <h1
                              name="question"
                              style={question}
                              placeholder="Câu hỏi"
                           >
                              Câu 1: Nêu quy tắc hoạt động của 1 website
                           </h1>
                        </div>

                        <div
                           className="flex-center flex-direction-col"
                           style={{ marginTop: "15px", paddingLeft: "20px" }}
                        >
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                        </div>
                     </div>
                  </li>

                  <li
                     style={{
                        width: "100%",
                        padding: "5px 0",
                        borderBottom: "solid 1px #d5d5d5",
                     }}
                  >
                     <div style={{ width: "100%" }}>
                        <div className="flex-center" style={{ width: "100%" }}>
                           <input
                              type="checkbox"
                              name=""
                              id=""
                              style={{
                                 width: "18px",
                                 height: "18px",
                                 marginRight: "5px",
                              }}
                           />
                           <h1
                              name="question"
                              style={question}
                              placeholder="Câu hỏi"
                           >
                              Câu 1: Nêu quy tắc hoạt động của 1 website
                           </h1>
                        </div>

                        <div
                           className="flex-center flex-direction-col"
                           style={{ marginTop: "15px", paddingLeft: "20px" }}
                        >
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                           <div
                              className="flex-center"
                              style={{ width: "100%", height: "40px" }}
                           >
                              <input
                                 type="radio"
                                 name="correct"
                                 id="correct"
                                 style={{
                                    margin: "0",
                                    width: "15px",
                                    height: "15px",
                                 }}
                              />
                              <p style={answer}>Câu trả lời 1</p>
                           </div>
                        </div>
                     </div>
                  </li>
               </ul>
            </div>
         </div>
      );
   }

   document.querySelector(".return").addEventListener("click", () => {
      setType("");
   });

   return (
      <>
         {type === "seclectFromBank" && <SelectFromBank />}
         {type === "handicraft" && <Handicraft />}
      </>
   );
}
