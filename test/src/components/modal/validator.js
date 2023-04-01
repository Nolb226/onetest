function validator(formSelector) {
   let formElement = document.querySelector(formSelector);
   let formRules = {};

   const getParentElement = (childElement, parentSelector) => {
      while (childElement.parentElement) {
         if (childElement.parentElement.matches(parentSelector)) {
            return childElement.parentElement;
         }
         childElement = childElement.parentElement;
      }
   };

   var validatorRules = {
      require: (value) => {
         return value ? undefined : "Vui lòng nhập thông tin";
      },

      dateOfBirth: (value) => {
         return value ? undefined : "Vui lòng chọn ngày tháng năm sinh";
      },

      major: (value) => {
         return value !== "Ngành" ? undefined : "Vui lòng chọn ngành học";
      },

      min: (min) => {
         return (value) =>
            value.length >= min ? undefined : `Tối thiểu ${min} kí tự`;
      },

      max: (max) => {
         return (value) =>
            value.length <= max ? undefined : `Tối đa ${max} kí tự`;
      },
   };

   if (formElement) {
      var inputs = formElement.querySelectorAll("[name][rules]");

      const clearErrorMessage = (event) => {
         let parentElement = getParentElement(event.target, ".form-group");
         parentElement.classList.remove("invalid");
         parentElement.querySelector(".form-message").innerText = "";
      };

      // Lắng nghe sự kiện trên từng thẻ input
      const handelValidate = (event) => {
         console.log(event);
         var rules = formRules[event.target.name];
         var errorMessage;

         rules.find(function (rule) {
            errorMessage = rule(event.target.value);
            return errorMessage;
         });

         let parentElement = getParentElement(event.target, ".form-group");

         if (errorMessage) {
            parentElement.classList.add("invalid");
            parentElement.querySelector(
               ".form-message"
            ).innerText = `* ${errorMessage}`;
         }

         return !errorMessage;
      };

      // Lặp và gán function validator cho từng thẻ input
      inputs.forEach((input) => {
         var rules = input.getAttribute("rules").split("|");

         rules.forEach((rule) => {
            var ruleFunction;
            ruleFunction = validatorRules[rule];

            if (rule.includes(":")) {
               // rule = "min:8"
               var temp = rule.split(":"); // temp[0] = "min", temp[1] = "8"
               rule = temp[0]; // rule = "min"
               ruleFunction = validatorRules[rule]; // ruleFunction = min()
               ruleFunction = ruleFunction(temp[1]); // ruleFunction =  min(8) return (value) =>  value.length > min ? undefined : `Tối thiểu ${8} kí tự`;
            }

            if (Array.isArray(formRules[input.name]))
               formRules[input.name].push(ruleFunction);
            else formRules[input.name] = [ruleFunction];
         });

         input.onblur = handelValidate;
         input.oninput = clearErrorMessage;
      });

      formElement.onsubmit = (event) => {
         event.preventDefault();
         var isValid = true;
         let formData = new FormData();

         inputs.forEach((input) => {
            if (!handelValidate({ target: input })) {
               isValid = false;
            }
         });

         if (isValid) {
            let typeName = formElement.querySelector(".type");
            formData.append("type", typeName.getAttribute("name"));

            inputs.forEach((input) => {
               formData.append(input.name, input.value);
            });
         }
         fetch("http://localhost:8080/auth/signup", {
            body: formData,
            method: "post",
         });
      };
   }
}

export default validator;

class Validate {}
