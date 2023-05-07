export default function DetailStatistic() {
   return (
      <>
         <div className="detail-statistic">
            <div className="detail-basic">
               <div className="detail-item">
                  Lớp:
                  <span> 40</span>
               </div>
               <div className="detail-item">
                  Số bài làm:
                  <span> 40</span>
               </div>

               <div className="detail-item">
                  Điểm trung bình:
                  <span> 7.8</span>
               </div>
            </div>

            <div className="detail-grade">
               <h1>Phổ điểm</h1>
               <div className="grade-table">
                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 1</h3>
                     <span>1</span>
                  </div>

                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 2</h3>
                     <span>5</span>
                  </div>

                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 3</h3>
                     <span>8</span>
                  </div>

                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 4</h3>
                     <span>10</span>
                  </div>

                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 5</h3>
                     <span>10</span>
                  </div>

                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 6</h3>
                     <span>10</span>
                  </div>

                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 7</h3>
                     <span>10</span>
                  </div>

                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 8</h3>
                     <span>10</span>
                  </div>

                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 9</h3>
                     <span>10</span>
                  </div>

                  <div className="grade flex-center">
                     <h3 className="heading">&lt;= 10</h3>
                     <span>10</span>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
