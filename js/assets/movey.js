/*
  MoveyJS
  TODO:
    Make Movey.variable into settings.variable instead, to make user be able to edit them when initing.
*/


/*** Helpers (Not obligatory for movey) ***/
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

/*** TEST (Not obligatory for Movey) 
          (Movey is under this function) ***/

/* 
  Visualizes mouse position and how the animation works.
  
  - Red is mouse position, that moves even if the mouse is completely still.
  
  - Green is the current position that the objects will use to position themselves.
*/

function testMovey(){
  // Append mouse-position and current-values as an element
  $('body').append('<div class="mouse"><span>Mouse x and y</span></div>');
  $('body').append('<div class="current"><span>Current x and y</span></div>');
  
  // Set elements styles
  $('.mouse, .current').css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: 20,
    height: 20,
    border: '2px solid #fff',
    borderRadius: '50%',
    background: 'red',
    zIndex: 10000,
    pointerEvents: 'none'
  });
  $('.mouse span, .current span').css({
    position: 'absolute',
    top: '50%',
    left: '100%',
    marginLeft: 10,
    padding: '5px 10px',
    border: '1px solid #fff',
    borderRadius: '5px',
    whiteSpace: 'nowrap',
    color: '#fff',
    background: 'red',
    transform: 'translateY(-50%)'
  });
  $('.current').css({
    background: 'green'
  });
  $('.current span').css({
    background: 'green'
  });
  
  // Update position of elements every 16ms (60fps)
  setInterval(function (){
    // Set mouse element position
    $('.mouse').each(function (){
      $(this).css({
        top: Movey.mouseY - ($(this).height()/2),
        left: Movey.mouseX - ($(this).width()/2)
      });
    });
    // Set current-values element position
    $('.current').each(function (){
      $(this).css({
        top: Movey.currentY - ($(this).height()/2),
        left: Movey.currentX - ($(this).width()/2)
      });
    });
  }, 16); 
}


/*** Movey (Actual Movey) ***/

// Movey class
function Movey(el){
    this.el = el;
    // Function to be run when positioning movey element
    this.callback = null;
    // Add element to instances array
    Movey.instances.push(this);

    // Get centers of element relative to scroll
    this.centerX = function (){
        return this.el.offset().left + (this.el.width()/2) - $(document).scrollLeft();
    }
    this.centerY = function (){
        return this.el.offset().top + (this.el.height()/2) - $(document).scrollTop();
    }

    // Loop through a transform array and apply it
    this.transform = function (arr){
        var trans = "";
        // Loop through values
        for (var i = 0; i < arr.length; i++){
          trans += arr[i] + " ";
        }
        // Apply transform
        this.el.css({
            transform: trans
        });
    }
}

// All our movey instances to loop through when positioning
Movey.instances = [];

// Start movey
Movey.init = function (customSettings){
  // Settings
  var settings = {
    tilt: false
  };
  settings = jQuery.extend(settings, customSettings);

  // Variables

  // Default mouse position
  Movey.mouseX = $(window).width()/2;
  Movey.mouseY = $(window).height()/2;

  // x and y that callbacks are using, moving towards mouse x and y to make a smoother animation
  Movey.currentX = Movey.mouseX + 1;
  Movey.currentY = Movey.mouseY + 1;

  // Last mouse x and y
  Movey.lastMouseX = 0;
  Movey.lastMouseY = 0;

  // Rotate variables
  Movey.rotatePoint = 0;
  Movey.rotateCounter = 0;
  Movey.rotateSpeed = 0.01;
  Movey.rotateRadius = 100;
  
  // The speed that currentX and currentY moves towards to mouse x and y, lower is faster.
  Movey.speed = 40;

  // Set mouse positioner when mouse moves
  $(document).mousemove(function( event ) {
      var xx = event.pageX,
          yy = event.pageY;

      // Mouse position relative to scroll
      Movey.mouseX = xx - $(document).scrollLeft();
      Movey.mouseY = yy - $(document).scrollTop();

      Movey.rotateCounter = 0;
  });

  // Mobile tilt option
  if (settings.tilt){
    Movey.startDegree = null;
    $(document).ready(function (){
    	function tilt(degrees){
    	    // Start degrees
    	    if (Movey.startDegree === null || 
    	    	Movey.startDegree[0] === 0 || 
    	    	Movey.startDegree[1] === 0){
    	        Movey.startDegree = [];
    	        Movey.startDegree[0] = degrees[0];
    	        Movey.startDegree[1] = degrees[1];
    	    }

    	    // Set x and y position depending on tilt difference from starting degrees
    	    var yy, xx;
    	    if (Movey.orientation == 0){
    	        // Portrait
    	        yy = degrees[0] - Movey.startDegree[0];
    	        xx = degrees[1] - Movey.startDegree[1];
    	    } else {
    	        // Landscape
    	        yy = degrees[1] - Movey.startDegree[1];
    	        xx = degrees[0] - Movey.startDegree[0];
    	    }

    	    // Set mouse position based on tilt instead of actual mouse position
    	    Movey.mouseX = ($(window).width()/2) + (xx * 10);
    	    Movey.mouseY = ($(window).height()/2) + (yy * 20);
    	}

    	// Swap tilt degrees in landscape mode
    	Movey.orientation = window.orientation;
    	$(window).on("orientationchange", function(event){
    	    var orientation = window.orientation;
    	    Movey.orientation = orientation;
    	    if (orientation == 0){
    	        // Portrait
    	        Movey.startDegree[0] = degrees[0];
    	        Movey.startDegree[1] = degrees[1];
    	    } else {
    	        // Landscape
    	        Movey.startDegree[0] = degrees[1];
    	        Movey.startDegree[1] = degrees[0];
    	    }
    	});

    	// Apply tilt function to the correct deviceorientation event
    	$(function (){
    	    if (window.DeviceOrientationEvent) {
    	        window.addEventListener("deviceorientation", function () {
    	            tilt([event.beta, event.gamma]);
    	        }, true);
    	    } else if (window.DeviceMotionEvent) {
    	        window.addEventListener('devicemotion', function () {
    	            tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
    	        }, true);
    	    } else {
    	        window.addEventListener("MozOrientation", function () {
    	            tilt([orientation.x * 50, orientation.y * 50]);
    	        }, true);
    	    }
    	});
    });
  }

  // Run all Movey objects callbacks every 16ms (60fps)
  setInterval(function (){
      // Current x and y position
      var xx = Movey.currentX,
          yy = Movey.currentY;
          
      // Last mouse x and y
      Movey.lastMouseX = Movey.mouseX;
      Movey.lastMouseY = Movey.mouseY;
    
      // Reset point after it has gone one revolution
      Movey.rotatePoint += Movey.rotateSpeed;
      if (Movey.rotatePoint >= 6.283185307175454){
        Movey.rotatePoint = 0;
      }

      // Rotate if mouse has not moved in the last 40 last frames
      if (Movey.mouseX == Movey.lastMouseX && 
          Movey.mouseY == Movey.lastMouseY){
          Movey.rotateCounter += 1;
          if (Movey.rotateCounter >= 40){
              var curX = Movey.mouseX;
              var curY = Movey.mouseY;
            
              var x = Math.cos(Movey.rotatePoint) * Movey.rotateRadius;
              var y = Math.sin(Movey.rotatePoint) * Movey.rotateRadius;  
              
              x = ($(window).width()/2) + x;
              y = ($(window).height()/2) + y;
              
              /*Movey.mouseX += (x - curX) / Movey.speed;
              Movey.mouseY += (y - curY) / Movey.speed;*/
              Movey.mouseX = x;
              Movey.mouseY = y;
          }
      }
    
      // Do not run all these calculations if currentX/Y is already mouseX/Y
      if (Math.round(Movey.currentX) == Movey.mouseX &&
          Math.round(Movey.currentY) == Movey.mouseY){
        return false;
      }
    
      // Current mouse position
      var newX = Movey.mouseX,
          newY = Movey.mouseY;

      // Move current x and y towards mouse x and y
      Movey.currentX += (newX - xx) / Movey.speed;
      Movey.currentY += (newY - yy) / Movey.speed;

      // Run all Movey objects callbacks with the new current x and y to use
      for (var i = 0; i < Movey.instances.length; i++){
          Movey.instances[i].callback(xx, yy);
      }
  }, 16);
}

// Init
Movey.init();
//testMovey();