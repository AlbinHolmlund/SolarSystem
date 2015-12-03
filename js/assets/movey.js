
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