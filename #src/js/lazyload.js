/*lazyload*/
$(window).on('scroll', function () {
  if ($(window).scrollTop() > 50) {
    [].forEach.call(document.querySelectorAll('iframe[data-iframe-src]'), function (iframe) {
      iframe.setAttribute('src', iframe.getAttribute('data-iframe-src'));
      iframe.onload = function () {
        iframe.removeAttribute('data-iframe-src');
      };
    });
  }
  if ($(window).scrollTop() > 400) {
    $('.bring-your-friends').css("background", "url('../img/02.jpg')");
  }
  if ($(window).scrollTop() > 500) {
    [].forEach.call(document.querySelectorAll('iframe[data-money-src]'), function (iframe) {
      iframe.setAttribute('src', iframe.getAttribute('data-money-src'));
      iframe.onload = function () {
        iframe.removeAttribute('data-money-src');
      };
    });
  }
  if ($(window).scrollTop() > 600) {
    $('.payform').css("display", "flex");
  }
  if ($(window).scrollTop() > 1200) {
    let cssValues = {
      "background": "url('../img/03.jpg')",
      "display": "flex",
      "align-items": "center",
      "background-size:": "cover !important",
      "background-repeat": "no-repeat !important",
      "background-position": "center center !important",
      "height": "500px",
      "min-height": "500px",
      "background-attachment": "fixed",
    }
    $('.cabinet-in-the-center-of-yekaterinburg').css(cssValues);
  }
  if ($(window).scrollTop() > 2400) {
    $('.do-you-have-a-birthday').css("background", "url('../img/04.jpg')");
  }
  if ($(window).scrollTop() > 4800) {
    $('.discount').css("background", "url('../img/05.jpg')");
  }
  if ($(window).scrollTop() > 5000) {
    [].forEach.call(document.querySelectorAll('iframe[data-map-src]'), function (iframe) {
      iframe.setAttribute('src', iframe.getAttribute('data-map-src'));
      iframe.onload = function () {
        iframe.removeAttribute('data-map-src');
      };
    });
  }
});