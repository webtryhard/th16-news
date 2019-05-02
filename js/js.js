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


(function($){$('#toggle-search').click(function(){$('body').toggleClass('blur');$('.div_search').toggleClass('open');$('.search_').toggleClass('after');$("#ip_search").focus();$(".div_search").animate({height:'60px'});return false;});$(document).click(function(event){var target=$(event.target);if(!target.is('#toggle-search')&&!target.closest('#search-form').size()){$('body').removeClass('blur');$('.div_search').removeClass('open');$('.search_').removeClass('after');$("#ip_search").blur();}});})(jQuery);$('.menu li.active').parents('li').addClass('active');