import "../container/container.css";
function Container() {
   return (
      <div id="container" className="position-relative">
         <div id="slider" className="position-absolute">
            <img
               className="slider__background"
               src="/image/background-slider.png"
               alt=""
            />
         </div>

         <div className="wide container__wrap">
            <div className="container__content">
               <span className="container__content--subheading">
                  Chào mừng bạn đến với website thi trắc nghiệm tốt nhất hiện
                  nay. Hi vọng chúng tôi sẽ mang lại trải nghiệm tuyệt với trong
                  học tập.
               </span>

               <h1 className="container__content--heading">Best Of Test</h1>

               <button className="container__btn--start">Bắt đầu</button>
            </div>

            <div className="container__knowledge-img position-absolute">
               <img src="/image/knowledge-image.png" alt=""></img>
            </div>
            <div className="grid flex-center">
               <div className="row feature__wrap flex-center">
                  <div className="col m-4">
                     <div className="feature flex-direction-col">
                        <div className="feature__img flex-center">
                           <img
                              src="/image/feature1.png"
                              alt="feature image"
                           ></img>
                        </div>
                        <div className="feature__content">
                           <h2 className="feature__content--heading">
                              giao diện thân thiện
                           </h2>
                           <span className="feature__content--description">
                              Thiết kế tối giản, gam màu tươi mới, phù hợp với
                              mọi đối tượng sử dụng, tối ưu hóa sự tập trung,
                              hạn chế xao nhãng.
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="col m-4">
                     <div className="feature flex-direction-col">
                        <div className="feature__img flex-center">
                           <img
                              src="/image/feature2.jpg"
                              alt="feature image"
                           ></img>
                        </div>
                        <div className="feature__content">
                           <h2 className="feature__content--heading">
                              quản lí dễ dàng
                           </h2>
                           <span className="feature__content--description">
                              Nhóm học, bài thi cấu trúc phân loại. Thống kê và
                              chấm điểm tự động qua Excel. Dễ dàng quản lí, theo
                              dõi tình hình lớp.
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className="col m-4">
                     <div className="feature flex-direction-col">
                        <div className="feature__img flex-center">
                           <img
                              src="/image/feature3.jpg"
                              alt="feature image"
                           ></img>
                        </div>
                        <div className="feature__content">
                           <h2 className="feature__content--heading">
                              học tập hiệu quả
                           </h2>
                           <span className="feature__content--description">
                              Sau khi làm xong bài kiểm tra, hệ thống sẽ thông
                              báo số điểm đạt được, kèm đáp án. Dễ dàng cải
                              thiện cho lần sau.
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Container;
