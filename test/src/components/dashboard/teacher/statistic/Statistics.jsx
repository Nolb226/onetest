// import "./style.css";
// import "./responsive.css";

function Statistics() {
   return (
      <div>
         <header className="table__header">
            <h1 className="table__heading">Thống kê</h1>
         </header>
         <div className="table-zone grid"></div>
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
            {/* <div className="table__content--list">
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
            </div> */}
         </div>
      </div>
   );
}

export default Statistics;
