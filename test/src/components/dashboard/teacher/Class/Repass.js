import { useState, useEffect } from "react";
import api from "../../../../config/config.js";

function Repass(prop) {
   const [info, setInfo] = useState({});

   useEffect(() => {
      fetch(`${api}/${prop.isClass.id}`, {
         method: "GET",
         headers: {
            Authorization:
               "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMDQ3ODg3LCJleHAiOjE2ODEzMDcwODd9.Y9dXoVfvWEFEPoVQHn9wKJAjH1Hfz6AiOCpSjGqtuxU",
         },
      })
         .then((res) => res.json())
         .then((info) => {
            console.log(info.data);
            setInfo(info.data);
         });
   }, []);

   return (
      <form className="flex-center content">
         <div className="row class-editpass-model class-editpass-header">
            <div className="l-6 m-6">Mã Lớp: {info.id}</div>
            <div className="l-6 m-6">Tên Lớp: {info.name}</div>
         </div>

         <div className="wide class-editpass-body class-editpass-model">
            <div className="row p-6-15 flex-center">
               <label for="" className="l-6 m-6">
                  Mật khẩu hiện tại:
               </label>
               <input
                  className="l-6 m-6 class-editpass-input"
                  type="text"
                  readOnly
                  value={info.password}
               />
            </div>

            <div className="row p-6-15 flex-center">
               <label for="newPass" className="l-6 m-6">
                  Mật khẩu mới:
               </label>
               <input
                  className="l-6 m-6 class-editpass-input"
                  type="text"
                  id="newPass"
               />
            </div>
            <div className="row flex-center">
               <button className="list_btn class-editpass-btn">LƯU</button>
            </div>
         </div>
      </form>
   );
}

export default Repass;
