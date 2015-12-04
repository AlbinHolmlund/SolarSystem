
/** Get a position variable based on mouse position to add to planets x and y values **/
(function (){
	// This should only work if not on mobile
	if (!$('html').hasClass('mod_touchevents')){
		// The mouse x and y values
		var mouse = {
			values: {
				x: {
					current: 0,
					to: 0,
					speed: 40
				},
				y: {
					current: 0,
					to: 0,
					speed: 40
				}
			}
		};

		// Set planets mouse x/y variable to the current x/y mouse values
		mouse.callback = function (){
		  	if ($('.planet.active').length < 1){
				Planets.mouseX = mouse.values.x.current;
				Planets.mouseY = mouse.values.y.current;
			} else {
				Planets.mouseX = 0;
				Planets.mouseY = 0;
			}
		}

		// Start incrementing variables "current" values towards there "to"-values.
		MoveTo.anims.push(mouse);

		// When mouse moves, set the new "to"-values as the mouse x/y from page center
		$('body').mousemove(function (e){
			// Get mouse x/y from page center
			var xx = -(e.pageX - $(window).width()/2) * Planets.settings.posMultip,
				yy = -(e.pageY - $(window).height()/2) * Planets.settings.posMultip;	

			// Set new "to"-values
			mouse.values.x.to = xx;
			mouse.values.y.to = yy;
		});
	}
})($);