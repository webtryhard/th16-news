 function goBack() {
  window.history.back();
}
$(window).scroll(function() {
    if ($(this).scrollTop() != 0) {
        $('#backtotop').fadeIn();
    } else {
        $('#backtotop').fadeOut();
    }
});
$('#backtotop').click(function() {
    $('body,html').animate({
        scrollTop: 0
    }, 800);
});