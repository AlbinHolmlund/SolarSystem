
/** Clicking will cause the mouse to trigger the planet with the shortest distance to mouse click x/y **/
(function (){
	// Trigger closest planet that is clicked instead of only exact clicks
	$('body').click(function (e){
		// Only if clicking on the canvas
		if ($(e.target).hasClass('canvas')){
			var x = e.pageX,
				y = e.pageY,
				lastDist = 1000000,
				closest;

			$('.planet').each(function (){
				var centerX = $(this).position().left - ($(this).width()/2);
				var centerY = $(this).position().top - ($(this).height()/2);
				var xx = x - centerX,
						yy = y - centerY,
						dist = hyp(xx, yy);
				if (dist < lastDist){
					closest = $(this);
					lastDist = dist;
				}
			});

			closest.trigger('click');
		}
	});

})($);