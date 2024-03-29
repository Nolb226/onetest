

function ConfirmModel({setIsOpen, isOpen, result, handleSubmit}) {
    const URL = "https://bestoftest.herokuapp.com"

    const sendResult = () => {
        const answer = JSON.stringify(result)
        console.log(answer);
        fetch(`${URL}/classes/a111/exams`,{
            body:answer,
            method:"POST",
        })

    }

    return (
        <div className="modal flex-center" onClick={()=> setIsOpen(!isOpen)}>
            <div className="main-form">
                <div className="header-form">
                    <div id="close" className="flex-center" onClick={()=> setIsOpen(!isOpen)}><i className="fa-solid fa-xmark" style={{color: "#888888"}}></i></div>
                </div>
                <div className="content-form flex-center">
                    Bạn chắc chắn muốn nộp bài?<br/>
                    Chúng tôi khuyến khích bạn kiểm tra lại bài làm 1 lần nữa.
                </div>
                <div className="footer-form">
                    <button className="confirm-btn form-btn" form="answer" 
                        onClick={() => {
                            sendResult()
                            handleSubmit()
                        }}
                    >Xác nhận nộp</button>
                    <button className="cancel-btn form-btn" onClick={()=> setIsOpen(!isOpen)} >Quay lại</button>
                </div>
            </div>
        </div>
    );
}


export default ConfirmModel