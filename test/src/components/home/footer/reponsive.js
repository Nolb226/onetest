function responsive() {
  const responsiveFunction = function () {
    const footerElement = document.getElementById("footer");
    const containerHeight = document.getElementById("container").offsetHeight;
    const viewHeight = window.innerHeight;

    if (viewHeight < 1150)
      footerElement.style.top = `${containerHeight + 100} px`;
    else footerElement.style.bottom = "0";
  };

  window.onresize = responsiveFunction;
  window.onload = responsiveFunction;
}

export default responsive;
