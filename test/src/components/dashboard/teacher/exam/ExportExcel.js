// import React, { useState, useEffect } from "react";
// import {
//    read,
//    writeFileXLSX,
// } from "https://cdn.sheetjs.com/xlsx-0.19.2/package/xlsx.mjs";

// async function ExportExcel() {
//    const [data, setData] = useState([]);
//    const XLSX = await import(
//       "https://cdn.sheetjs.com/xlsx-0.19.2/package/xlsx.mjs"
//    );

//    const wb = XLSX.utils.book_new();
//    const ws = XLSX.utils.aoa_to_sheet([
//       ["a", "b", "c"],
//       [1, 2, 3],
//    ]);

//    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//    XLSX.writeFile(wb, "SheetJSESMTest.xlsx");

//    useEffect(() => {
//       const getUserData = async () => {
//          const request = await fetch(
//             "https://jsonplaceholder.typicode.com/posts"
//          );
//          const response = await request.json();
//          setData(response);
//       };
//       getUserData();
//    });

//    document
//       .getElementById("sheetjsexport")
//       .addEventListener("click", function () {
//          /* Create worksheet from HTML DOM TABLE */
//          var wb = XLSX.utils.table_to_book(
//             document.getElementById("TableToExport")
//          );
//          /* Export to file (start a download) */
//          XLSX.writeFile(wb, "SheetJSTable.xlsx");
//       });

//    return (
//       <>
//          <table id="TableToExport"></table>
//          {data.map((exam, index) => {
//             <tr key={index}>
//                <td>{index + 1}</td>
//                <td>{index + 1}</td>
//                <td>{index + 1}</td>
//                <td>{index + 1}</td>
//                <td>{index + 1}</td>
//             </tr>;
//             return <div key={index}>{exam}</div>;
//          })}
//       </>
//    );

//    // return data;
// }
