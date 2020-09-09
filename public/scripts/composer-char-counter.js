//Create listener for character count (decrease count as characters are entered)
$(document).ready(function() {
  $(".new-tweet form textarea").on("keydown", function() {
    const count = $(this).val().length;
    const counter = $(this).closest(".new-tweet").find(".counter");
    const maxCount = 140;
    const remChars = maxCount - count;
    counter.text(remChars);

    if (remChars < 0) {
      counter.addClass("negChar");
    } else {
      if (counter.hasClass("negChar")) {
        counter.removeClass("negChar");
      }
    }
  });
});