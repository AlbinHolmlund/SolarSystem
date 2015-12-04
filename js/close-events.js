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