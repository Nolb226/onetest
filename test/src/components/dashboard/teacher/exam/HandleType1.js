function handleType1(totalQuestion, easyQuestion, hardQuestion) {
   totalQuestion.disabled = true;
   easyQuestion.disabled = true;
   hardQuestion.disabled = true;

   totalQuestion.value = 0;
   easyQuestion.value = 0;
   hardQuestion.value = 0;

   document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.disabled = false;
   });
}

export default handleType1;
