import './header.css'
import './logo-no-background.png'
function Header() {
    return (
        <div id="header">
            <div className="grid wide flex-center header__wrap position-relative">
                <div className="header__logo">
                    <img src="../header/logo-no-background.png" alt=""></img>
                </div>

                <div className="header__btn flex-center flex-direction-row">
                    <button className="btn__sign-in">
                        <span>Đăng nhập</span>
                        <a href="student.html"></a>
                    </button>

                    <button className="btn__sign-up">
                        <span>Đăng kí</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header;