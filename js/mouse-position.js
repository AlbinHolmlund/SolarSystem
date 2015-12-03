
/** Get a position variable based on mouse position to add to planets x and y values **/
(function (){
	// Using movey to get mouse position and make the planets movement more dynamic
	var dummyObject = new Movey($('<div/>'));
	dummyObject.callback = function (ex, ey){
	  // Degrees based on mouse position
	  var xx = -(ex - $(window).width()/2) * Planets.settings.posMultip,
	      yy = -(ey - $(window).height()/2) * Planets.settings.posMultip;
	  
	  if ($('.planet.active').length < 1){
		  Planets.mouseX = xx;
		  Planets.mouseY = yy;
		} else {
			Planets.mouseX = 0;
			Planets.mouseY = 0;
		}
	}
})($);