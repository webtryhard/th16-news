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


/*Table*/
$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	var actions = $("table td:last-child").html();
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="1" id="1"></td>' +
            '<td><input type="text" class="form-control" name="2" id="2"></td>' +
            '<td><input type="text" class="form-control" name="3" id="3"></td>' +
            '<td><input type="text" class="form-control" name="4" id="4"></td>' +
            '<td><input type="text" class="form-control" name="5" id="5"></td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			input.each(function(){
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
		}		
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
});