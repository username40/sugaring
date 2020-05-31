/*Snack bar for form */
function showSnackBar() {
  var snackBar = $('.snackBar');
  snackBar.addClass('show');

  setTimeout(function () {
    snackBar.removeClass('show');
  }, 6000);
}