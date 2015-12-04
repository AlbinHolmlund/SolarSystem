/*
	TODO:
	Add next - prev buttons
	Add info text.
*/

/*
	Sources:
	Planet vectors: http://www.mygraphichunt.com/free-vector-flat-planet-vectors-10713/
*/

// Planets array
Planets = {
	// Mouse positions
	mouseX: 0,
	mouseY: 0
};

// Default planet settings
Planets.settings = {
	speed: 2, // The more it is the slower the planets will orbit
	posMultip: 1 // 
};

/** Maths helpers **/
// @codekit-append "maths.js"

/** Planets array **/
// @codekit-append "planets.js";

/** Create planets **/
// @codekit-append "create-planets.js";

/** Move planets each frame (60fps) **/
// @codekit-append "move-planets.js";

/** Zoom in on the planets, ( changes size and distance of planets to simulate zooming :) ) **/
// @codekit-append "zoom-planets.js";

/** Get a position variable based on mouse position to add to planets x and y values **/
// @codekit-append "mouse-position.js";

/** Clicking will cause the mouse to trigger the planet with the shortest distance to mouse click x/y **/
// @codekit-append "mouse-trigger-closest-planet.js";

/** Button event to line up planets and button to return them to original orbits **/
// @codekit-append "line-up-planets.js";



/** EXTRAS **/

/** Events for close button **/
// @codekit-append "close-events.js";

/** Events for guide (close guide when clicked on) **/
// @codekit-append "guide-events.js";



/** Mobile fixes, events and such to make it work (kind of) on mobile **/
// @codekit-append "mobile-fixes.js";



/*** Helpers ***/
var sqrt = Math.sqrt,
    square = function (val){
    return Math.pow(val, 2);
},
    hyp = function (xx, yy){
    return sqrt( square(xx) + square(yy) ); 
};
// Limit a number to a max value
Number.prototype.max = function(maximum) {
    if (this.valueOf() > maximum){
      return maximum;
    } else {
      return this.valueOf();
    }
};
// Limit a number to a minimum value
Number.prototype.min = function(minimum) {
    if (this.valueOf() < minimum){
      return minimum;
    } else {
      return this.valueOf();
    }
};


/** Planets array **/
var planets = {
	sun: {
		name: 'The Sun',
		image: 'sun.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 0, // Distance to sun
		size: 200,
		timeToRotate: 1, // 1 year
		rotatePoint: 1,
		info: 'sun.html', // The info file
		clr: '#000'
	},
	mercury: {
		name: 'Mercury',
		image: 'mercury.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 150, // Distance to sun
		size: 50,
		timeToRotate: 88 / 365, // 88 earth days 88 / 365
		rotatePoint: 1.5,
		info: 'mercury.html', // The info file
		clr: '#000'
	},
	venus: {
		name: 'Venus',
		image: 'venus.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 250, // Distance to sun
		size: 100,
		timeToRotate: 224.7 / 365,
		rotatePoint: 2,
		info: 'venus.html', // The info file
		clr: '#000'
	},
	earth: {
		name: 'Earth',
		image: 'earth.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 380, // Distance to sun
		size: 80,
		timeToRotate: 1, // 1 year
		rotatePoint: 2.5,
		info: 'earth.html', // The info file
		clr: '#000'
	},
	mars: {
		name: 'Mars',
		image: 'mars.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 480, // Distance to sun
		size: 40,
		timeToRotate: 1.8809, // 1 year
		rotatePoint: 3,
		info: 'mars.html', // The info file
		clr: '#000'
	},
	jupiter: {
		name: 'Jupiter',
		image: 'jupiter.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 670,
		size: 250,
		timeToRotate: 11.86 * 0.1, // 2 years
		rotatePoint: 3.5,
		info: 'jupiter.html', // The info file
		clr: '#000'
	},
	saturn: {
		name: 'Saturn',
		image: 'saturn.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 960,
		size: 290,
		timeToRotate: 29.5 * 0.1, // 2 years
		rotatePoint: 4,
		info: 'saturn.html', // The info file
		clr: '#000',
		info: 'saturn.html', // The info file
		clr: '#000'
	},
	uranus: {
		name: 'Uranus',
		image: 'uranus.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 1150,
		size: 80,
		timeToRotate: 84 * 0.05, //29.5, // 2 years
		rotatePoint: 4.5,
		info: 'uranus.html', // The info file
		clr: '#000'
	},
	neptune: {
		name: 'Neptune',
		image: 'neptune.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 1300,
		size: 70,
		timeToRotate: 164.79 * 0.05, //29.5, // 2 years
		rotatePoint: 5,
		info: 'neptune.html', // The info file
		clr: '#000'
	},
	pluto: {
		name: 'Pluto',
		image: 'pluto.svg',
		x: 0,
		y: 0,
		towX: 0, // Moving towards
		towY: 0, // Moving towards
		distance: 1450,
		size: 30,
		timeToRotate: 248 * 0.5, //29.5, // 2 years
		rotatePoint: 5,
		info: 'pluto.html', // The info file
		clr: '#000'
	}
};


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


/** Move planets each frame (60fps) **/
(function (){
	// Move planets each frame
	function movePlanets() {
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

		// Re run
		requestAnimFrame(movePlanets);
	}
	movePlanets();
})($);


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


/** Button event to line up planets and button to return them to original orbits **/
(function (){

	// Options
	$('.line-up').click(function (){
		$.each(planets, function (key, val){
			var p = planets[key];
			p.timeToRotate = 1;
			p.rotatePoint = 0;
		});
	});
	$('.reset-planets').click(function (){
		$.each(planets, function (key, val){
			var p = planets[key];
			p.timeToRotate = p.timeToRotateDefault;
		});
	});

})($);

(function (){

	var $closeButtons = [];

	$(document).ready(function (){
		// Close button
		$('[data-close]').each(function (){
			var $this = $(this),
				$target = $( $this.data('close') ),

				// Add position variable that will animate
				position = {
					values: {
						x: {
							current: $target.offset().left - $this.width(), // Start pos
							to: $target.offset().left - $this.width(), // Start pos
							speed: 10
						},
						y: {
							current: $target.offset().top - $this.width(), // Start pos
							to: $target.offset().top - $this.width(), // Start pos
							speed: 10
						}
					}
				};

			// Position callback to give element new position
			position.callback = function (){
				if (!$this.hasClass('hovering')){
					position.values.x.to = $target.offset().left;
					position.values.y.to = $target.offset().top;
				}

				var x = position.values.x.current,
					y = position.values.y.current;

				$this.css({
					top: y,
					left: x
				});
			}

			// Add this object variable to animate
			MoveTo.anims.push(position);

			// Hovering target will move this element
			$target.mouseenter(function (){
				$this.addClass('hovering');
			});
			$this.mouseenter(function (){
				$this.addClass('hovering');
			});
			$target.mouseleave(function (){
				$this.removeClass('hovering');
			});
			$this.mouseleave(function (){
				$this.removeClass('hovering');
			});

			// Moving mouse will cause this element to reposition
			$('body').mousemove(function (e){
				if ($this.hasClass('hovering')){
					position.values.x.to = e.pageX - ($this.width() / 2);
					position.values.y.to = e.pageY - ($this.height() / 2);
				}
			});

			// Pusb the buttons
			$closeButtons.push({
				el: $(this),
				positions: position
			});
		});
	});

})($);

(function (){
	$('.guide').click(function (){
		var $closeButton = $('[data-close=".guide"]');

		$(this).toggleClass('hide');
		$closeButton.toggleClass('clicked');
	});
})($);


/** Mobile fixes, events and such to make it work (kind of) on mobile **/
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

