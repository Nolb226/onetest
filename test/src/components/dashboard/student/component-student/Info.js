import { Link } from "react-router-dom";

function Info({ personalCode, nameStudent, classId, subject, test, backHref }) {
   return (
      <div className="information">
         <div className="back inf-children">
            <Link
               to={backHref}
               style={{ textDecoration: "none", color: "#333" }}
            >
               &lt;&lt; Quay lại
            </Link>
         </div>

         {personalCode && (
            <div className="code inf-children">Mã cá nhân: {personalCode}</div>
         )}

         {nameStudent && (
            <div className="name inf-children">Họ và tên: {nameStudent}</div>
         )}

         {classId && <div className="name inf-children">Mã lớp: {classId}</div>}

         {subject && (
            <div className="subject inf-children">Môn học: {subject}</div>
         )}

         {test && (
            <div className="number-of-question name inf-children">
               Bài thi: {test}
            </div>
         )}
      </div>
   );
}

export default Info;
