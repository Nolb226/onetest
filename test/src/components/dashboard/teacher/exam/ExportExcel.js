// import React, { useState, useEffect } from "react";

// function ExportExcel() {
//    const [data, setData] = useState([]);

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

//    return (
//       <>
//          {data.map((exam, index) => {
//             // <tr key={index}>
//             //    <td>{index + 1}</td>
//             //    <td>{index + 1}</td>
//             //    <td>{index + 1}</td>
//             //    <td>{index + 1}</td>
//             //    <td>{index + 1}</td>
//             // </tr>;
//             return <div key={index}>{exam}</div>;
//          })}
//       </>
//    );

//    // return data;
// }
