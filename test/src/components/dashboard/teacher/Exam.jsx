// import "./style.css";
// import "./responsive.css";

function Exam() {
   return (
      <>
         <header className="table__header">
            <h1 className="table__heading">DANH SÁCH BÀI THI</h1>
            <div className="filter-box">
               <div className="custom-select">
                  <span className="selected-option">
                     Tất cả
                     <i className="fa-solid fa-chevron-down" />
                  </span>
                  <ul className="custom-select__option-list">
                     <li className="option checked flex-center">Tất cả</li>
                     <li className="option flex-center">Đã làm</li>
                     <li className="option flex-center">Chưa làm</li>
                  </ul>
               </div>
            </div>
         </header>
         <div className="grid table__content">
            <ul className="row no-gutters flex-center table__content--heading">
               <li className="col l-2">
                  <h3>Mã đề</h3>
               </li>
               <li className="col l-2">
                  <h3>Tên đề</h3>
               </li>
               <li className="col l-2">
                  <h3>Môn</h3>
               </li>
               <li className="col l-2">
                  <h3>Thời gian làm bài</h3>
               </li>
               <li className="col l-2">
                  <h3>Số câu hỏi</h3>
               </li>
               <li className="col l-5-1" />
            </ul>
            <div className="table__content--list">
               <ul className="row no-gutters flex-center table__content--item">
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-5-1">
                     <button className="inf-btn take-test">Làm bài</button>
                  </li>
               </ul>
               <ul className="row no-gutters flex-center table__content--item">
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-2">
                     <h3>information</h3>
                  </li>
                  <li className="col l-5-1">
                     <button className="inf-btn see-score">Xem điểm</button>
                  </li>
               </ul>
            </div>
         </div>
      </>
   );
}

export default Exam;
