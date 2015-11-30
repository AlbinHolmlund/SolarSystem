

// Draw planets
(function (){
  var speedMultip = 2; // The more it is the slower the planets will orbit
  var planets = {
    sun: {
      name: 'The Sun',
      image: 'sun.svg',
      x: $(window).width()/2,
      y: $(window).height()/2,
      towX: 0, // Moving towards
      towY: 0, // Moving towards
      distance: 0, // Distance to sun
      size: 100,
      timeToRotate: 1, // 1 year
      rotatePoint: 0
    },
    earth: {
      name: 'Earth',
      image: 'earth.svg',
      x: $(window).width()/2 + 100,
      y: $(window).height()/2,
      towX: 0, // Moving towards
      towY: 0, // Moving towards
      distance: 200, // Distance to sun
      size: 50,
      timeToRotate: 1, // 1 year
      rotatePoint: 0
    },
    jupiter: {
      name: 'Jupiter',
      image: 'jupiter.svg',
      x: $(window).width()/2 + 400,
      y: $(window).height()/2,
      towX: 0, // Moving towards
      towY: 0, // Moving towards
      distance: 400,
      size: 200,
      timeToRotate: 2, // 2 years
      rotatePoint: 0
    }
  };
  
  $(document).ready(function (){
    // Draw planets
    $.each(planets, function (key, p){
      // Planet
      var planet = $('<div/>');
      
      // Set planet CSS
      planet.addClass('planet');
      planet.css({
        width: p.size,
        height: p.size,
        backgroundImage: "url(img/" + p.image + ")",
      });

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
        } else {
          // Was not active
          $(this)
            .removeClass('inactive')
            .addClass('active');
          $('.planet').not(this)
            .removeClass('active')
            .addClass('inactive');
        }

      });
      
      // Set planets element
      planets[key].el = planet;
      
      // Append the planet to body
      $('body').append(planet);
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
          
          // Increase the point on the circle
          var rotateAdd = 6.283185307175454 / (600 * speedMultip * planet.timeToRotate);
          planet.rotatePoint += rotateAdd;
        } else {
          // State 2 (Static big with textbox)
          planet.towX = ($(window).width()/1.5) ,
          planet.towY = ($(window).height()/2) ;
        }

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
  });
})($);

//http://www.mygraphichunt.com/free-vector-flat-planet-vectors-10713/