(function (){
	$('.guide').click(function (){
		var $closeButton = $('[data-close=".guide"]');

		$(this).toggleClass('hide');
		$closeButton.toggleClass('clicked');
	});
})($);