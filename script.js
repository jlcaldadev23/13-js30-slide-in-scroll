function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImgs = document.querySelectorAll(".slide-in");

function checkSlide(e) {
  sliderImgs.forEach((sliderImg) => {
    //pixel count at half image at bottom screen
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImg.height / 4;
    //pixel count at bottom image to top of page
    const imageBottom = sliderImg.offsetTop + sliderImg.height / 1.1;
    const isHalfShown = slideInAt > sliderImg.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImg.classList.add("active");
    } else {
      sliderImg.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
