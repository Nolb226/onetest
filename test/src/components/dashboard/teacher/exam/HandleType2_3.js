function handleType2_3(totalQuestion, easyQuestion, hardQuestion) {
   totalQuestion.disabled = false;
   easyQuestion.disabled = false;
   hardQuestion.disabled = false;

   totalQuestion.value = 0;
   easyQuestion.value = 0;
   hardQuestion.value = 0;

   document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.disabled = true;
   });
}

export default handleType2_3;
