function CreateClass() {
   return (
      <div className="flex-center content">
         <div>
            <form className="class-editpass-model class-editpass-header">
               <div className="row class-create-inp ">
                  <label for="" className="l-5 p-6-15 class-create-label">
                     Ngành:
                  </label>
                  <input
                     type="text"
                     name=""
                     id=""
                     className="l-7 class-editpass-input"
                  />
               </div>

               <div className="row class-create-inp">
                  <label for="" className="l-5 p-6-15 class-create-label">
                     Mã môn học:
                  </label>
                  <input
                     type="text"
                     name=""
                     id=""
                     className="l-7 class-editpass-input"
                  />
               </div>

               <div className="row class-create-inp">
                  <label for="" className="l-5 p-6-15 class-create-label">
                     Mật khẩu:
                  </label>
                  <input
                     type="text"
                     name=""
                     id=""
                     className="l-7 class-editpass-input"
                  />
               </div>

               <label for="inputfile" className="class-label-file ">
                  <div className="class-create-uploadfile">
                     <input
                        type="file"
                        id="inputfile"
                        hidden
                        className="class-input-file"
                     />
                     <img src="../assets/image/upload.png" alt="" />
                     {/* <i className="fa-solid fa-arrow-up-from-bracket" style="font-size: 25px;"></i> */}
                     <p>Danh sách sinh viên</p>
                  </div>
               </label>

               <div className="row flex-center">
                  <button className="list_btn class-editpass-btn">
                     TẠO LỚP
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default CreateClass;
