/*Show more reviews */
$('.reviews__item').slice(0, 5).css('display', 'flex');
function showMoreReviews() {
  $('.reviews__item:hidden').slice(0, 3).fadeIn().css('display', 'flex');
}