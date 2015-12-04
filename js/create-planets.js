
/** Create planets **/
(function (){

	// Draw planets
	$.each(planets, function (key, p){
		// Planet
		var planet = $('<div/>');

		// Set default
		p.timeToRotateDefault = p.timeToRotate;
		p.sizeDefault = p.size;
		p.distanceDefault = p.distance;
		
		// Set planet CSS
		planet.addClass('planet ' + key);
		planet.css({
			width: p.size,
			height: p.size
		});

		// Inner sprite
		var sprite = $('<div/>');
		sprite.addClass('sprite');
		sprite.css({
			backgroundImage: "url(img/" + p.image + ")",
		});

		planet.append(sprite);

		// Label
		var label = $('<span/>');
		label.addClass('label');
		label.attr('data-label', true);
		label.html(p.name);

		// Click event
		planet.click(function (){
		
			if ($(this).hasClass('active')){
				// Was active
				$(this).removeClass('active');
				$('.planet').not(this).removeClass('inactive');

				$('.info-box').removeClass('active');

				// Reset to default sprite size
				var $sprite = $(this).find('.sprite');
				$sprite.css({
					width: '100%',
					height: '100%'
				});

			} else {
				// Was not active
				$(this)
					.removeClass('inactive')
					.addClass('active');

				// Set new sprite size
				sprite.css({
					height: $(window).height()*0.8,
					width: $(window).height()*0.8
				});

				// Other planets
				$('.planet').not(this).each(function (){
					var $this = $(this),
							$sprite = $this.find('.sprite');

					$this
						.removeClass('active')
						.addClass('inactive');

					// Set sprite size to default
					$sprite.css({
						width: '100%',
						height: '100%'
					});
				});

				// Set info
				$('.info-box')
					.addClass('active')
					.load('info/' + p.info, function (){

					$('.info-box h2').css({
						color: p.clr
					});

					$('.info-box h2 .back').css({
						backgroundImage: "url(img/" + p.image + ")",
						//backgroundColor: p.backClr
					});

				});

			}

		});
		
		// Set planets element
		planets[key].el = planet;

		// Append the planet to body
		$('body').append(planet);
	});

	// Event to close the planet via info box
	$('body').on('click', '.close-planet', function (){
		// Was active
		$('.planet').removeClass('active inactive');

		$('.info-box').removeClass('active');

		// Reset to default sprite size
		$('.planet').find('.sprite').css({
			width: '100%',
			height: '100%'
		});
	});

})($);