function Paginator({ handlePageChange, page, totalPage }) {
   const numbers = Array.from(Array(totalPage).keys());

   return (
      <div className="paginator">
         {page > 1 && (
            <button
               className="page-btn"
               disabled={page <= 1}
               onClick={() => {
                  handlePageChange(page - 1);
               }}
            >
               <i class="fa-solid fa-caret-left"></i>
            </button>
         )}

         {totalPage != 1
            ? numbers.map((num) => (
                 <button
                    key={num + 1}
                    className={`page-num ${page === num + 1 ? "current" : ""}`}
                    onClick={() => handlePageChange(num + 1)}
                 >
                    {num + 1}
                 </button>
              ))
            : ""}
         {page < totalPage && (
            <button
               className="page-btn"
               disabled={page >= totalPage}
               onClick={() => {
                  handlePageChange(page + 1);
               }}
            >
               <i class="fa-solid fa-caret-right"></i>
            </button>
         )}
      </div>
   );
}

export default Paginator;
