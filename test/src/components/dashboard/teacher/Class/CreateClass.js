
function CreateClass() {
    return (
        <div class="flex-center content">
                        <div>
                            <form class="class-editpass-model class-editpass-header">
                                <div class="row class-create-inp ">
                                    <label for="" class="l-5 p-6-15 class-create-label">Ngành:</label>
                                    <input type="text" name="" id="" class="l-7 class-editpass-input" />
                                </div>
                                
                                <div class="row class-create-inp">
                                    <label for="" class="l-5 p-6-15 class-create-label">Mã môn học:</label>
                                    <input type="text" name="" id="" class="l-7 class-editpass-input" />
                                </div>

                                <div class="row class-create-inp">
                                    <label for="" class="l-5 p-6-15 class-create-label">Mật khẩu:</label>
                                    <input type="text" name="" id="" class="l-7 class-editpass-input" />
                                </div>

                                <label for="inputfile" class="class-label-file ">
                                        <div class="class-create-uploadfile">
                                        <input type="file" id="inputfile" hidden class="class-input-file" />
                                        <img src="../assets/image/upload.png" alt="" />
                                        {/* <i class="fa-solid fa-arrow-up-from-bracket" style="font-size: 25px;"></i> */}
                                        <p>Danh sách sinh viên</p>
                                        </div>
                                    </label>

                                <div class="row flex-center">
                                    <button class="list_btn class-editpass-btn" >TẠO LỚP</button>
                                </div>

                            </form>
                        </div>
                    </div>
    )
}

export default CreateClass