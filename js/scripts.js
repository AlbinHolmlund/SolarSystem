/*
	TODO:
	Add next - prev buttons
	Add info text.
*/

// Draw planets
(function (){
	var speedMultip = 2; // The more it is the slower the planets will orbit

	// Ready
	$(document).ready(function (){
		// Draw planets
		$.each(planets, function (key, p){
			// Planet
			var planet = $('<div/>');
			
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

			// Append label to planet
			//planet.append(label);

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

		// Using movey to get mouse position and make the planets movement more dynamic
		var xPos = 0,
				yPos = 0,
				posMultip = 1;
		var dummyObject = new Movey($('<div/>'));
		dummyObject.callback = function (ex, ey){
		  // Degrees based on mouse position
		  var xx = -(ex - $(window).width()/2) * posMultip,
		      yy = -(ey - $(window).height()/2) * posMultip;
		  
		  if ($('.planet.active').length < 1){
			  xPos = xx;
			  yPos = yy;
			} else {
				xPos = 0;
				yPos = 0;
			}
		}

		// Trigger closest planet that is clicked instead of only exact clicks
		$('body').click(function (e){
			if (!$(e.target).hasClass('sprite') && // Did not click on planet
				!$('.info-box').has(e.target).length){ // Did not click on info box
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

		// Move planets each frame
		setInterval(function (){
			// Loop through and position all planets
			$.each(planets, function (key, planet){
				if (!planet.el.hasClass('active')){
					// State 1 (Orbiting around the sun)

					// Start the x/y from the center
					planet.towX = $(window).width()/2;
					planet.towY = $(window).height()/2;

					// Add the x/y coordinates of the point in the circle
					planet.towX += Math.cos(planet.rotatePoint) * planet.distance;
					planet.towY += Math.sin(planet.rotatePoint) * planet.distance;  

					// Add mouse position to make it less static
					planet.towX += xPos;
					planet.towY += yPos;
				} else {
					// State 2 (Static big with textbox)
					planet.towX = ($(window).width()*0.75),
					planet.towY = ($(window).height()/2);
				}

				// Increase the point on the circle for state 1
				var rotateAdd = 6.283185307175454 / (600 * speedMultip * planet.timeToRotate);
				planet.rotatePoint += rotateAdd;

				// Set new position based on towX/Y (towardsX/Y)
				planet.x += (planet.towX - planet.x)/20;
				planet.y += (planet.towY - planet.y)/20;

				// Position the planet
				planet.el.css({
					top: planet.y - (planet.el.height()/2),
					left: planet.x - (planet.el.width()/2)
				});
			});
		}, 1000/60);

		$(window).bind('mousewheel', function(event) {
				if (event.originalEvent.wheelDelta >= 0) { 
					posMultip *= 1 + (1 - 0.95);

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
				} else {
					posMultip *= 0.95;

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
		});

	});
})($);

//http://www.mygraphichunt.com/free-vector-flat-planet-vectors-10713/