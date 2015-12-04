
/** Zoom in on the planets, ( changes size and distance of planets to simulate zooming :) ) **/
(function (){
	function zoomIn (){
		Planets.settings.posMultip *= 1 + (1 - 0.95);

		$.each(planets, function (key, val){
			var p = planets[key]; // The planet
			p.size *= 1 + (1 - 0.95);
			p.distance *= 1 + (1 - 0.95);

			p.el.css({
				width: p.size,
				height: p.size,
			});

			p.el.find('.sprite').attr('data-size', p.size);
		});
	}
	function zoomOut (){
		Planets.settings.posMultip *= 0.95;

		$.each(planets, function (key, val){
			var p = planets[key]; // The planet

			p.size *= 0.95;
			p.distance *= 0.95;

			p.el.css({
				width: p.size,
				height: p.size,
			});

			p.el.find('.sprite').attr('data-size', p.size);
		});
	}

	$(window).bind('mousewheel', function(event) {
		// Only scroll to zoom if not hovering the info text
		if (!$('.info-box').is(':hover')){
			if (event.originalEvent.wheelDelta >= 0) { 
				zoomIn();
			} else {
				zoomOut();
			}
		}
	});
})($);