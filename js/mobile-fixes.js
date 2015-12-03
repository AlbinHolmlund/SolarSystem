(function (){
	// Mobile fix
	$(document).ready(function (){
		$('html, body').css({
			width: $(window).width(),
			height: $(window).height()
		});
	});
	$('body').on('touchmove', function (e){
		e.preventDefault();
	});
	document.querySelector('body').addEventListener('gesturechange', function(e) {
		$.each(planets, function (key, val){
			var p = planets[key]; // The planet
			p.size = p.sizeDefault * e.scale;
			p.distance = p.distanceDefault * e.scale;

			p.el.css({
				width: p.size,
				height: p.size,
			});

			p.el.find('.sprite').attr('data-size', p.size);
		});
	}, false);
	document.querySelector('body').addEventListener('gestureend', function(e) {
		$.each(planets, function (key, val){
			var p = planets[key]; // The planet
			p.sizeDefault = p.size;;
			p.distanceDefault = p.distance;

			p.el.css({
				width: p.size,
				height: p.size,
			});

			p.el.find('.sprite').attr('data-size', p.size);
		});
	}, false);
})($);