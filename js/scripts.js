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
Planets = {};

// Default planet settings
Planets.settings = {
	speed: 2, // The more it is the slower the planets will orbit
	posMultip: 1 // 
};

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



/** Mobile fixes, events and such to make it work (kind of) on mobile **/
// @codekit-append "mobile-fixes.js";

