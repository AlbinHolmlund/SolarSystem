
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
		rotatePoint: 0,
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
		timeToRotate: 1, //88 / 365, // 88 earth days 88 / 365
		rotatePoint: 0,
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
		timeToRotate: 1, //224.7 / 365,
		rotatePoint: 0 
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
		timeToRotate: 1, //1, // 1 year
		rotatePoint: 0,
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
		timeToRotate: 1, //1.8809, // 1 year
		rotatePoint: 0
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
		timeToRotate: 1, //11.86, // 2 years
		rotatePoint: 0
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
		timeToRotate: 1, //29.5, // 2 years
		rotatePoint: 0
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
		timeToRotate: 1, //29.5, // 2 years
		rotatePoint: 0
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
		timeToRotate: 1, //29.5, // 2 years
		rotatePoint: 0
	}
};