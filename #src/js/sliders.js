/*Slider */
var slideIndex = 1;
//slider romantsova
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName('mySlides');

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

showSlides(slideIndex);
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlidesKalinina(n) {
  var i;
  var slides = document.getElementsByClassName('mySlides-kalinina');

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}

showSlidesKalinina(slideIndex);
function addSlides(n) {
  showSlidesKalinina(slideIndex += n);
}