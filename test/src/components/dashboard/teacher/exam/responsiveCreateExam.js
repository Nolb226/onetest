function responsiveCreateExam() {
   const responsiveFunction = function () {
      const questionList = document.querySelector(".question-list");
      const viewHeight = window.innerHeight;

      if (viewHeight <= 690 && viewHeight >= 635)
         questionList.style.height = "84%";
      else if (viewHeight < 635 && viewHeight >= 600)
         questionList.style.height = "75%";
      else questionList.style.height = "90%";

      console.log("responsive");
   };

   window.onresize = responsiveFunction;
   window.onload = responsiveFunction;
}

export default responsiveCreateExam;
