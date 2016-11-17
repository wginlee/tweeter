$(function() {
  $('.new-tweet').on('input', 'textarea', function() {
      var charsLeft = 140 - this.value.length;
      var counter = $(this).siblings('.counter');
      counter.text(charsLeft);
      if (charsLeft < 0){
        counter.addClass('char-exceeded');
      } else {
        counter.removeClass('char-exceeded');
      }
  });
});