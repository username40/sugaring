/*Price list accordeon*/
var accordeon = function () {
  var data = $('.accordeon').attr('data-accordeon');

  $('.accordeon-header').on('click', function () {
    if (data === "close") {
      $('.accordeon-body').slideUp();
      if ($(this).hasClass('.active')) {
        $(this).toggleClass('active');
      } else {
        $('.accordeon-header').removeClass('active');
      }
    } else {
      $(this).toggleClass('active')
    }
    $(this).next('.accordeon-body').not(':animated').slideToggle();
  })
}

accordeon();