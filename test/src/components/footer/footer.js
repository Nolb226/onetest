import './footer.css'


function Footer() {
    return (
        <div id="footer" class="position-absolute">
            <div class="grid wide">
                <div class="footer__heading flex-center flex-direction-col">
                    <h2 class="footer__logo">best of test</h2>
                    <span class="footer__slogan">keep move on</span>
                    <i class="fa-solid fa-xmark"></i>

                </div>
                <div class="row footer__content">
                    <div class="col l-3 m-3">
                        <h5 class="footer__content--heading">Giới thiệu</h5>
                        <ul class="footer__content--list">
                            <li class="footer__content--item">Trung tâm trợ giúp</li>
                            <li class="footer__content--item">Chăm sóc khách hàng</li>
                        </ul>
                    </div>

                    <div class="col l-3 m-3">
                        <h5 class="footer__content--heading">Chính sách bảo mật</h5>
                        <ul class="footer__content--list">
                            <li class="footer__content--item">Điều khoản</li>
                            <li class="footer__content--item">Liên hệ truyền thông</li>
                        </ul>
                    </div>

                    <div class="col l-3 m-3">
                        <h5 class="footer__content--heading">Liên hệ</h5>
                        <ul class="footer__content--list">
                            <li class="footer__content--item">Facebook</li>
                            <li class="footer__content--item">Instagram</li>
                        </ul>
                    </div>
                </div>
                <span class="copywriter">© 2023 - Bản quyền thuộc về Nhóm 5</span>
            </div>
        </div>
    )
}

export default Footer;