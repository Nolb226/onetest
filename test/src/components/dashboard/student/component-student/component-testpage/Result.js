
import Info from "../Info";
import { Link } from "react-router-dom";

function Result() {
  return (
    <>
      <div className="content flex-center">
        <div className="result-container">
          <header className="result-header">
            <div className="title flex-center">NỘP BÀI THÀNH CÔNG</div>
            <div className="score flex-center">
              <p className="score1">Điểm đạt được:</p>
              <p className="score2">9.5/10</p>
            </div>
          </header>
          <div className="result-subject flex-center">
            Kỹ thuật lập trình: Test 2
          </div>
          <div className="result-content">
            <div className="contestant result-content-child">
              <div className="result-content-child-title flex-center">
                <i className="fa-regular fa-user"></i> Thí sinh:
              </div>
              <div className="result-content-child-value">Nguyễn Văn A</div>
            </div>

            <div className="time-test result-content-child">
              <div className="result-content-child-title flex-center">
                <i className="fa-regular fa-clock"></i> Thời gian làm bài:
              </div>
              <div className="result-content-child-value">15 phút 11 giây</div>
            </div>

            <div className="right-answer result-content-child">
              <div className="result-content-child-title flex-center">
                <i className="fa-regular fa-circle-check"></i> Số câu đúng:
              </div>
              <div className="result-content-child-value right">30</div>
            </div>

            <div className="wrong-answer result-content-child">
              <div className="result-content-child-title flex-center">
                <i className="fa-regular fa-circle-xmark"></i> Số câu sai:
              </div>
              <div className="result-content-child-value wrong">10</div>
            </div>

            <div className="total-answer result-content-child">
              <div className="result-content-child-title flex-center">
                <i className="fa-solid fa-circle-exclamation"></i> Tổng số câu:
              </div>
              <div className="result-content-child-value">40</div>
            </div>
          </div>
          <footer className="result-footer flex-center">
            <Link to="/test"><button className="see-detail-test">Chi tiết bài làm</button></Link>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Result;
