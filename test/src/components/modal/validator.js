function validator(formSelector) {
  let formElement = document.querySelector(formSelector);
  let formRules = {};

  var validatorRules = {
    require: (value) => {
      return value ? undefined : "Vui lòng nhập thông tin";
    },

    dateOfBirth: (value) => {
      return value ? undefined : "Vui lòng nhập thông tin";
    },

    min: (min) => {
      return (value) =>
        value.length < min ? undefined : `Tối thiểu ${min} kí tự`;
    },

    max: (max) => {
      return (value) =>
        value.length >= max ? undefined : `Tối đa ${max} kí tự`;
    },
  };

  if (formElement) {
    var inputs = formElement.querySelectorAll("[name][rules]");

    inputs.forEach((input) => {
      var rules = input.getAttribute("rules").split("|");

      rules.forEach((rule) => {
        if (rule.includes(":")) {
          var temp = rule.split(":");
          rule = temp[0];
        }

        console.log(rule);
      });

      formRules[input.name] = input.getAttribute("rules");
    });

    // formRules.forEach((formRule) => {
    //   console.log(typeof formRule);
    // });
    console.log(formRules);
  }
}

export default validator;
