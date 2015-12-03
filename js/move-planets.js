
/** Move planets each frame (60fps) **/
(function (){
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
				planet.towX += Planets.mouseX;
				planet.towY += Planets.mouseY;
			} else {
				// State 2 (Static big with textbox)
				planet.towX = ($(window).width()*0.75),
				planet.towY = ($(window).height()/2);
			}

			// Increase the point on the circle for state 1
			var rotateAdd = 6.283185307175454 / (600 * Planets.settings.speed * planet.timeToRotate);
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
})($);