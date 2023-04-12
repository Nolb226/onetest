import { useState,useEffect } from "react"

function Repass(prop) {
    const [info, setInfo] = useState({})

    useEffect(()=>{
        fetch(`https://bestoftest.herokuapp.com/classes/${prop.isClass.id}`,{method : "GET",
            headers:{
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgxMDQ3ODg3LCJleHAiOjE2ODEzMDcwODd9.Y9dXoVfvWEFEPoVQHn9wKJAjH1Hfz6AiOCpSjGqtuxU'
        }})
        .then(res => res.json())
        .then(info => {
            console.log(info.data);
            setInfo(info.data);
        })
    },[])

    return (
        <form class="flex-center content">
            <div>
                <div class="row class-editpass-model class-editpass-header">
                    <div class="l-6 m-6">Mã Lớp: {info.id}</div>
                        <div class="l-6 m-6">Tên Lớp: {info.name}</div>
                    </div>
                            
                    <div class="wide class-editpass-body class-editpass-model">
                        <div class="row p-6-15 flex-center">
                            <label for="" class="l-6 m-6">Mật khẩu hiện tại:</label>
                            <input class="l-6 m-6 class-editpass-input" type="text" readOnly value={info.password}/>
                        </div>
                                
                        <div class="row p-6-15 flex-center">
                            <label for="newPass" class="l-6 m-6">Mật khẩu mới:</label>
                            <input class="l-6 m-6 class-editpass-input" type="text" id="newPass"/>
                            </div>
                            <div class="row flex-center">
                                <button class="list_btn class-editpass-btn" >LƯU</button>
                            </div>
                         </div>
                </div>
        </form>
        
    )
}

export default Repass