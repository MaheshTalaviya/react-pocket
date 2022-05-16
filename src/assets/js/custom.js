$('.mobClick').click(function() {
  $(this).toggleClass('open');
  $('.site-nav').toggleClass('open');
});


$(document).ready(function() {
    $('.custom-select').select2({
      minimumResultsForSearch: -1
    });
});

$('.custom-check').click(function(e) {
    e.stopPropagation();
});


$(".clearable").each(function() {

  const $inp = $(this).find("input:text"),
      $cle = $(this).find(".clearable__clear");

  $inp.on("input", function(){
    $cle.toggle(!!this.value);
  });

  $cle.on("touchstart click", function(e) {
    e.preventDefault();
    $inp.val("").trigger("input");
  });

});


$('.yes').click(function() {
  $(this).parent().parent().parent().find('.cons').addClass('act');
});
$('.no').click(function() {
  $(this).parent().parent().parent().find('.cons').removeClass('act');
});
