function handleType2_3(easyQuestion, hardQuestion) {
   easyQuestion.disabled = false;
   hardQuestion.disabled = false;

   easyQuestion.value = 0;
   hardQuestion.value = 0;

   document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.disabled = true;
   });
}

export default handleType2_3;
