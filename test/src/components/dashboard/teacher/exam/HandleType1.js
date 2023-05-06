function handleType1(easyQuestion, hardQuestion) {
   easyQuestion.disabled = true;
   hardQuestion.disabled = true;

   easyQuestion.value = 0;
   hardQuestion.value = 0;

   document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.disabled = false;
   });
}

export default handleType1;
