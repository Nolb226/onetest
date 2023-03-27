import "./modal.css";

function Options() {
  return <option>Công nghệ thông tin</option>;
}

function SignUpModal({ toggle1, toggle2 }) {
  return (
    <div
      className="modal-layer flex-center"
      onClick={() => {
        toggle2.handleSignUp();
      }}
    >
      <div
        className="sign-up--modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form action="" method="POST" id="form-2">
          <div className="modal__header position-relative">
            <div className="modal__content flex-center flex-direction-col">
              <h3 className="modal--heading">Đăng ký</h3>
              <span className="modal--subheading">
                Nhập đầy đủ thông tin và tạo tài khoản miễn phí!
              </span>
            </div>
            <div
              className="modal__close--btn position-absolute"
              onClick={(e) => {
                toggle2.handleSignUp();
                e.stopPropagation();
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div className="modal__body flex-center flex-direction-col">
            <div className="form-group">
              {/* <label htmlFor="fullname" className="form-label">
                Họ và tên:
              </label> */}
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Nhập họ và tên"
                className="form-control"
              />
              <span className="form-message"></span>
            </div>

            <div
              className="row flex-center flex-direction-row"
              style={{ width: "100%", height: "auto" }}
            >
              <div className="l-5 form-group position-relative">
                {/* <label htmlFor="date-of-birth" className="form-label">
                Ngày tháng năm sinh:
              </label> */}
                <input
                  id="date-of-birth"
                  name="date-of-birth"
                  type="date"
                  className="form-control"
                />
                <span className="form-message"></span>
              </div>

              <div className="l-7 form-group position-relative">
                {/* <label htmlFor="majors" className="form-label">
                Ngành:
                </label> */}
                <select
                  id="majors"
                  name="majors"
                  type="select"
                  className="form-control"
                >
                  <Options />
                </select>
                <span className="form-message"></span>
              </div>
            </div>

            <div className="form-group">
              {/* <label htmlFor="personalID" className="form-label">
                Mã cá nhân:
              </label> */}
              <input
                id="personalID"
                name="personalID"
                type="text"
                placeholder="Nhập mã cá nhân"
                className="form-control"
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group position-relative">
              {/* <label htmlFor="password" className="form-label">
                Mật khẩu:
              </label> */}
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
                className="form-control"
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group position-relative">
              {/* <label htmlFor="confirm" className="form-label">
                Nhập lại mật khẩu:
              </label> */}
              <input
                id="password-confirm"
                name="password-confirm"
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="form-control"
              />
              <span className="form-message"></span>
            </div>

            <div className="flex-center form-group position-relative accept">
              <input id="accept-input" name="accept" type="radio" />
              <span>
                Tôi đồng ý với<a href="#">&nbsp;điều khoản sử dụng</a>
                &nbsp;và<a href="#">&nbsp;chính sách bảo mật</a>
                &nbsp;của Best Of Test
              </span>
              {document
                .querySelectorAll(".accept > span  a")
                .forEach((item) => {
                  item.onClick = (event) => {
                    console.log(item);
                    alert(
                      "Chính sách bảo mật và điều khoản sử dụng đang được cập nhật!"
                    );
                    event.preventDefault();
                  };
                })}
            </div>

            <button
              className="form-submit"
              onClick={() => {
                toggle2.handleSignUp();
              }}
            >
              Đăng ký
            </button>

            <div className="have-account">
              <span>Bạn đã có tài khoản? </span>
              <span
                className="click-to-sign-in"
                onClick={() => {
                  toggle2.handleSignUp();
                  toggle1.handleSignIn();
                }}
              >
                Đăng nhập ngay
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
