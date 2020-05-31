/*Ajax send */
$(".callback-form").submit(function () {
  $.ajax({
    type: "POST",
    url: "send.php",
    data: $(this).serialize()
  }).done(function () {
    $(this).find("input").val("");
    $(".callback-form").trigger("reset");
  });
  return false;
});