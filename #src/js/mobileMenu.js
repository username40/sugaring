/*Mobile menu*/
$('#mobile-menu-btn').click(function () {
  $('.header__menu').toggleClass('display-block');
  $('#prices, #sugaring-masters, #reviews, #contacts').toggleClass('mobile-menu-anchor-height');
});