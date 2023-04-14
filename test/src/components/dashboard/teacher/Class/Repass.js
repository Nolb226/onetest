import { useState, useEffect } from "react";

function Repass(prop) {
  const [info, setInfo] = useState({});
  const [getPassword, setPassword] = useState("");

  useEffect(() => {
    fetch(`https://bestoftest.herokuapp.com/classes/${prop.isClass.id}/edit`, {
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

  const handleSubmit = (password) => {
    // console.log(Class.isLock);
    // console.log(Class.id);
    fetch(
      `https://bestoftest.herokuapp.com/classes/${prop.isClass.id}?field=password`,
      {
        method: "PATCH",
        body: JSON.stringify({
          password,
        }),
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMDQ3ODg3LCJleHAiOjE2ODEzMDcwODd9.Y9dXoVfvWEFEPoVQHn9wKJAjH1Hfz6AiOCpSjGqtuxU",
          "Content-type": "application/json",
        },
      }
    ).then((response) => response.json());
    //   .then((json) => console.log(json.data));
    prop.handleRePass("");
  };

  // quay lại
  const returnBtn = document.querySelector(".return");
  returnBtn.addEventListener("click", () => {
    prop.handleRePass("");
  });

  return (
    <form
      class="flex-center content"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(getPassword);
      }}
    >
      <div>
        <div class="row class-editpass-model class-editpass-header">
          <div class="l-6 m-6">Mã Lớp: {info.id}</div>
          <div class="l-6 m-6">Tên Lớp: {info.name}</div>
        </div>

        <div class="wide class-editpass-body class-editpass-model">
          <div class="row p-6-15 flex-center">
            <label for="" class="l-6 m-6">
              Mật khẩu hiện tại:
            </label>
            <input
              class="l-6 m-6 class-editpass-input"
              type="text"
              readOnly
              value={info.password}
            />
          </div>

          <div class="row p-6-15 flex-center">
            <label for="newPass" class="l-6 m-6">
              Mật khẩu mới:
            </label>
            <input
              class="l-6 m-6 class-editpass-input"
              type="text"
              id="newPass"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="row flex-center">
            <button class="list_btn class-editpass-btn">LƯU</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Repass;
