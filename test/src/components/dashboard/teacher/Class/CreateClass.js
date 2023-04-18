import { useEffect,useState } from "react";
import excel from "../../../../image/excel.svg"
function CreateClass({ handleCreateClass }) {
    const [file, setFile] = useState ({img:'../../image/upload.png',name:"Danh sách sinh viên"})
    
    const handleFile = (value) => {
        console.log(value.split('/\\/'));
        setFile({img:excel,name:value.split('\\')[2]})
    } 

  const handleCreate = (e) => {
    e.preventDefault()
    const formData = new FormData();
    const password = document.getElementById('password');
    const lecutreId = document.getElementById('lecture')
    const classExcel = document.getElementById('inputfile');
    const semester = document.getElementById('semester');
    const year = document.getElementById('year');
    const accountpassword = document.getElementById('accountpassword');

    console.log(classExcel);

    formData.append('password',password.value)
    formData.append('lectureId',lecutreId.value)
    formData.append('classExcel',classExcel.files[0])
    formData.append('semester',semester.value)
    formData.append('year',year.value)
    formData.append('accountpassword',accountpassword.value)

    fetch(`http://192.168.100.37:8080/classes`, {
      method: "POST",
      body:
        formData
      ,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxNDQwMjYzLCJleHAiOjE2ODE2OTk0NjN9.hr6m-BXChJbTkSjPv5xEW6kDChuc5O1r927gV3YybWU",
      },
    });
  };

  // quay lại
  const returnBtn = document.querySelector(".return");
  //   console.log(returnBtn);
  returnBtn.addEventListener("click", () => {
    handleCreateClass();
  });

  return (
    <div class="flex-center content">
      <div>
        <form class="class-editpass-model class-editpass-header" id="create-class" onSubmit={handleCreate}>
          <div class="row class-create-inp ">
            <label for="" class="l-5 p-6-15 class-create-label">
              Ngành:
            </label>
            <input type="text" name="" id="major" class="l-7 class-editpass-input" />
          </div>

          <div class="row class-create-inp">
            <label for="" class="l-5 p-6-15 class-create-label">
              Mã môn học:
            </label>
            <input type="text" name="" id="lecture" class="l-7 class-editpass-input" />
          </div>

          <div class="row class-create-inp">
            <label for="" class="l-5 p-6-15 class-create-label">
              Kỳ:
            </label>
            <select type="text" name="" id="semester" class="l-7 class-editpass-input"> 
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
          </div>

          <div class="row class-create-inp">
            <label for="" class="l-5 p-6-15 class-create-label">
              Năm học:
            </label>
            <input type="number" min="2020" max="2099" name="" id="year" class="l-7 class-editpass-input" />
          </div>

          <div class="row class-create-inp">
            <label for="" class="l-5 p-6-15 class-create-label">
              Mật khẩu:
            </label>
            <input type="text" name="" id="password" class="l-7 class-editpass-input" />
          </div>

          <div class="row class-create-inp">
            <label for="" class="l-5 p-6-15 class-create-label">
              Mật khẩu chung:
            </label>
            <input type="text" name="" id="accountpassword" class="l-7 class-editpass-input" />
          </div>

          <label for="inputfile" class="class-label-file ">
            <div class="class-create-uploadfile">
              <input
                type="file"
                id="inputfile"
                hidden
                class="class-input-file"
                onChange={(e) => {handleFile(e.target.value)}}
              />
              <img style={{width: "25px"}} src={file.img} alt="" />
              {/* <i class="fa-solid fa-arrow-up-from-bracket" style="font-size: 25px;"></i> */}
              <p>{file.name}</p>
            </div>
          </label>

          <div class="row flex-center">
            <button class="list_btn class-editpass-btn" id="submit-createclass" >TẠO LỚP</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateClass;
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
