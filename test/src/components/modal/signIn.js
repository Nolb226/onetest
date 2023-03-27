import "./modal.css";

function SignInModal({ toggle1, toggle2 }) {
  return (
    <div
      className="modal-layer flex-center"
      onClick={() => {
        toggle1.handleSignIn();
      }}
    >
      <div
        className="sign-in--modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form action="" method="POST" id="form-1">
          <div className="modal__header position-relative">
            <div className="modal__content flex-center flex-direction-col">
              <h3 className="modal--heading">Đăng nhập</h3>
              <span className="modal--subheading">
                Xin chào, chúc bạn một ngày tốt lành !
              </span>
            </div>
            <div
              className="modal__close--btn position-absolute"
              onClick={(e) => {
                toggle1.handleSignIn();
                e.stopPropagation();
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div className="modal__body flex-center flex-direction-col">
            <div className="form-group">
              <label htmlFor="fullname" className="form-label">
                Mã cá nhân:
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Nhập mã cá nhân"
                className="form-control"
              />
              <span className="form-message"></span>
            </div>

            <div className="form-group position-relative">
              <label htmlFor="password" className="form-label">
                Mật khẩu:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
                className="form-control"
              />
              <span className="form-message"></span>
              <span className="forget-password position-absolute">
                Quên mật khẩu ?
              </span>
            </div>

            <button
              className="form-submit"
              onClick={() => {
                toggle1.handleSignIn();
              }}
            >
              Đăng nhập
            </button>

            <div className="dont-have-account">
              <span>Bạn chưa có tài khoản? </span>
              <span
                className="click-to-sign-up"
                onClick={() => {
                  toggle2.handleSignUp();
                  toggle1.handleSignIn();
                }}
              >
                Đăng ký ngay
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInModal;
