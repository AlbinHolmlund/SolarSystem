
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