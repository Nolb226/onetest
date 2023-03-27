import './footer.css'


function Footer() {
    return (
        <div id="footer" className="position-absolute">
            <div className="grid wide">
                <div className="footer__heading flex-center flex-direction-col">
                    <h2 className="footer__logo">best of test</h2>
                    <span className="footer__slogan">keep move on</span>
                </div>
                <div className="row footer__content">
                    <div className="col l-3 m-3">
                        <h5 className="footer__content--heading">Giới thiệu</h5>
                        <ul className="footer__content--list">
                            <li className="footer__content--item">Trung tâm trợ giúp</li>
                            <li className="footer__content--item">Chăm sóc khách hàng</li>
                        </ul>
                    </div>

                    <div className="col l-3 m-3">
                        <h5 className="footer__content--heading">Chính sách bảo mật</h5>
                        <ul className="footer__content--list">
                            <li className="footer__content--item">Điều khoản</li>
                            <li className="footer__content--item">Liên hệ truyền thông</li>
                        </ul>
                    </div>

                    <div className="col l-3 m-3">
                        <h5 className="footer__content--heading">Liên hệ</h5>
                        <ul className="footer__content--list">
                            <li className="footer__content--item">Facebook</li>
                            <li className="footer__content--item">Instagram</li>
                        </ul>
                    </div>
                </div>
                <span className="copywriter">© 2023 - Bản quyền thuộc về Nhóm 5</span>
            </div>
        </div>
    )
}

export default Footer;